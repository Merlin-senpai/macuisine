import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, date, time, guests, seating, specialRequests } = body;
    
    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert booking into database
    const sql = `
      INSERT INTO reservations (
        name, email, phone, date, time, guests, seating, special_requests, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `;
    
    const params = [
      name,
      email,
      phone,
      date,
      time,
      guests,
      seating || 'no-preference',
      specialRequests || ''
    ];

    const result = await query(sql, params);
    
    return NextResponse.json({
      success: true,
      message: 'Reservation created successfully',
      bookingId: (result as any).insertId
    });

  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Failed to create reservation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sql = 'SELECT * FROM reservations ORDER BY created_at DESC';
    const bookings = await query(sql);
    
    return NextResponse.json({
      success: true,
      bookings
    });

  } catch (error) {
    console.error('Get bookings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
