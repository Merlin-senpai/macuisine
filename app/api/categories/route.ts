import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET all categories
export async function GET() {
  try {
    const sql = `
      SELECT 
        id, 
        name, 
        position, 
        is_active, 
        created_at 
      FROM categories 
      ORDER BY position ASC, name ASC
    `;
    const categories = await query(sql);
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST create new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, position = 0, is_active = true } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const sql = `
      INSERT INTO categories (name, position, is_active)
      VALUES (?, ?, ?)
    `;
    const result = await query(sql, [name, position, is_active]);
    
    return NextResponse.json({ 
      id: (result as any).insertId,
      name,
      position,
      is_active
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

// PUT update category
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, position, is_active } = body;

    if (!id || !name) {
      return NextResponse.json(
        { error: 'Category ID and name are required' },
        { status: 400 }
      );
    }

    const sql = `
      UPDATE categories 
      SET name = ?, position = ?, is_active = ?
      WHERE id = ?
    `;
    await query(sql, [name, position, is_active, id]);
    
    return NextResponse.json({ 
      id, 
      name, 
      position, 
      is_active 
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE category
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    const sql = 'DELETE FROM categories WHERE id = ?';
    await query(sql, [id]);
    
    return NextResponse.json({ 
      message: 'Category deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
