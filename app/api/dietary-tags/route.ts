import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET all dietary tags
export async function GET() {
  try {
    const sql = `
      SELECT id, name 
      FROM dietary_tags 
      ORDER BY name ASC
    `;
    const tags = await query(sql);
    
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching dietary tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dietary tags' },
      { status: 500 }
    );
  }
}

// POST create new dietary tag
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Tag name is required' },
        { status: 400 }
      );
    }

    const sql = 'INSERT INTO dietary_tags (name) VALUES (?)';
    const result = await query(sql, [name]);
    
    return NextResponse.json({ 
      id: (result as any).insertId,
      name
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating dietary tag:', error);
    return NextResponse.json(
      { error: 'Failed to create dietary tag' },
      { status: 500 }
    );
  }
}
