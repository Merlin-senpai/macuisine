import { NextRequest, NextResponse } from 'next/server';
import { query, transaction } from '@/lib/db';

// GET menu items (optionally grouped by category)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    let sql;
    let params: any[] = [];

    if (categoryId) {
      // Get menu items for a specific category
      sql = `
        SELECT 
          mi.id,
          mi.category_id,
          mi.name,
          mi.description,
          mi.price,
          mi.image_url,
          mi.is_popular,
          mi.is_featured,
          mi.is_active,
          mi.created_at,
          mi.updated_at,
          c.name as category_name,
          STRING_AGG(dt.name, ',') as dietary_tags
        FROM menu_items mi
        LEFT JOIN categories c ON mi.category_id = c.id
        LEFT JOIN menu_item_dietary mid ON mi.id = mid.menu_item_id
        LEFT JOIN dietary_tags dt ON mid.dietary_id = dt.id
        WHERE mi.category_id = $1
        GROUP BY mi.id, c.name
        ORDER BY mi.name ASC
      `;
      params = [categoryId];
    } else {
      // Get all menu items grouped by category
      sql = `
        SELECT 
          mi.id,
          mi.category_id,
          mi.name,
          mi.description,
          mi.price,
          mi.image_url,
          mi.is_popular,
          mi.is_featured,
          mi.is_active,
          mi.created_at,
          mi.updated_at,
          c.name as category_name,
          STRING_AGG(dt.name, ',') as dietary_tags
        FROM menu_items mi
        LEFT JOIN categories c ON mi.category_id = c.id
        LEFT JOIN menu_item_dietary mid ON mi.id = mid.menu_item_id
        LEFT JOIN dietary_tags dt ON mid.dietary_id = dt.id
        GROUP BY mi.id, c.name
        ORDER BY c.position ASC, mi.name ASC
      `;
    }

    const results = await query(sql, params);
    
    // Process dietary_tags from comma-separated string to array and fix boolean types
    const menuItems = (results as any[]).map(item => ({
      ...item,
      price: parseFloat(item.price), // Convert DECIMAL to number
      is_popular: Boolean(item.is_popular), // Convert to proper boolean
      is_featured: Boolean(item.is_featured), // Convert to proper boolean
      is_active: Boolean(item.is_active), // Convert to proper boolean
      dietary_tags: item.dietary_tags ? item.dietary_tags.split(',').filter((tag: string) => tag && tag.trim() !== '') : []
    }));

    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

// POST create new menu item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      category_id, 
      name, 
      description, 
      price, 
      image_url, 
      is_popular = false, 
      is_featured = false, 
      is_active = true,
      dietary_tags = []
    } = body;

    if (!category_id || !name || !price) {
      return NextResponse.json(
        { error: 'Category ID, name, and price are required' },
        { status: 400 }
      );
    }

    const result = await transaction(async (client: any) => {
      // Insert menu item
      const insertSql = `
        INSERT INTO menu_items (
          category_id, name, description, price, image_url, 
          is_popular, is_featured, is_active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
      `;
      const insertResult = await client.query(insertSql, [
        category_id, name, description, price, image_url, 
        is_popular, is_featured, is_active
      ]);

      const menuItemId = insertResult.rows[0].id;

      // Handle dietary tags
      if (dietary_tags.length > 0) {
        for (const tagName of dietary_tags) {
          // Check if dietary tag exists, if not create it
          let tagResult = await client.query(
            'SELECT id FROM dietary_tags WHERE name = $1',
            [tagName]
          );

          let dietaryId: number;
          if (tagResult.rows.length === 0) {
            // Create new dietary tag
            const newTagResult = await client.query(
              'INSERT INTO dietary_tags (name) VALUES ($1) RETURNING id',
              [tagName]
            );
            dietaryId = newTagResult.rows[0].id;
          } else {
            dietaryId = tagResult.rows[0].id;
          }

          // Link menu item to dietary tag
          await client.query(
            'INSERT INTO menu_item_dietary (menu_item_id, dietary_id) VALUES ($1, $2)',
            [menuItemId, dietaryId]
          );
        }
      }

      return menuItemId;
    });

    return NextResponse.json({ 
      id: result,
      category_id,
      name,
      description,
      price,
      image_url,
      is_popular,
      is_featured,
      is_active,
      dietary_tags
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json(
      { error: 'Failed to create menu item' },
      { status: 500 }
    );
  }
}

// PUT update menu item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id, 
      category_id, 
      name, 
      description, 
      price, 
      image_url, 
      is_popular, 
      is_featured, 
      is_active,
      dietary_tags
    } = body;

    if (!id || !category_id || !name || !price) {
      return NextResponse.json(
        { error: 'ID, category ID, name, and price are required' },
        { status: 400 }
      );
    }

    await transaction(async (client: any) => {
      // Update menu item
      const updateSql = `
        UPDATE menu_items 
        SET category_id = $1, name = $2, description = $3, price = $4, 
            image_url = $5, is_popular = $6, is_featured = $7, is_active = $8
        WHERE id = $9
      `;
      await client.query(updateSql, [
        category_id, name, description, price, 
        image_url, is_popular, is_featured, is_active, id
      ]);

      // Update dietary tags if provided
      if (dietary_tags !== undefined) {
        // Remove existing dietary tag associations
        await client.query(
          'DELETE FROM menu_item_dietary WHERE menu_item_id = $1',
          [id]
        );

        // Add new dietary tag associations
        if (dietary_tags.length > 0) {
          for (const tagName of dietary_tags) {
            // Check if dietary tag exists, if not create it
            let tagResult = await client.query(
              'SELECT id FROM dietary_tags WHERE name = $1',
              [tagName]
            );

            let dietaryId: number;
            if (tagResult.rows.length === 0) {
              // Create new dietary tag
              const newTagResult = await client.query(
                'INSERT INTO dietary_tags (name) VALUES ($1) RETURNING id',
                [tagName]
              );
              dietaryId = newTagResult.rows[0].id;
            } else {
              dietaryId = tagResult.rows[0].id;
            }

            // Link menu item to dietary tag
            await client.query(
              'INSERT INTO menu_item_dietary (menu_item_id, dietary_id) VALUES ($1, $2)',
              [id, dietaryId]
            );
          }
        }
      }
    });

    return NextResponse.json({ 
      id, 
      category_id, 
      name, 
      description, 
      price, 
      image_url, 
      is_popular, 
      is_featured, 
      is_active,
      dietary_tags
    });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json(
      { error: 'Failed to update menu item' },
      { status: 500 }
    );
  }
}

// DELETE menu item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Menu item ID is required' },
        { status: 400 }
      );
    }

    const sql = 'DELETE FROM menu_items WHERE id = $1';
    await query(sql, [id]);
    
    return NextResponse.json({ 
      message: 'Menu item deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json(
      { error: 'Failed to delete menu item' },
      { status: 500 }
    );
  }
}
