import { NextResponse } from 'next/server';
import { testConnection, query } from '@/lib/db';

export async function GET() {
  try {
    // Test database connection
    const isConnected = await testConnection();
    
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Test query to check if reservations table exists
    const result = await query('SHOW TABLES LIKE "reservations"');
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      tableExists: (result as any[]).length > 0,
      database: process.env.DB_DATABASE || 'ma'
    });

  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { error: 'Database test failed', details: error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query: sqlQuery, params } = body;
    
    if (!sqlQuery) {
      return NextResponse.json(
        { error: 'SQL query is required' },
        { status: 400 }
      );
    }

    // Test database connection first
    const isConnected = await testConnection();
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Execute the query
    const result = await query(sqlQuery, params);
    
    return NextResponse.json(result);

  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json(
      { error: 'Database query failed', details: error },
      { status: 500 }
    );
  }
}
