import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, message } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert contact message into database
    const sql = `
      INSERT INTO messages (
        name, email, message, status
      ) VALUES (?, ?, ?, 'unread')
    `;
    
    const params = [
      name,
      email,
      message
    ];

    const result = await query(sql, params);
    
    return NextResponse.json({
      success: true,
      message: 'Contact message sent successfully',
      messageId: (result as any).insertId
    });

  } catch (error) {
    console.error('Contact message API error:', error);
    return NextResponse.json(
      { error: 'Failed to send contact message' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sql = 'SELECT * FROM messages ORDER BY created_at DESC';
    const messages = await query(sql);
    
    return NextResponse.json({
      success: true,
      messages
    });

  } catch (error) {
    console.error('Get contact messages error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact messages' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;
    
    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const sql = `
      UPDATE messages 
      SET status = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `;
    
    await query(sql, [status, id]);
    
    return NextResponse.json({
      success: true,
      message: 'Message status updated successfully'
    });

  } catch (error) {
    console.error('Update message status error:', error);
    return NextResponse.json(
      { error: 'Failed to update message status' },
      { status: 500 }
    );
  }
}
