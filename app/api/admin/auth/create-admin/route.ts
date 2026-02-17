import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword, isUsernameAvailable } from '@/lib/auth';
import { requireSuperAdmin } from '@/lib/middleware';

export async function POST(request: NextRequest) {
  try {
    const { username, name, email, password, role = 'admin' } = await request.json();

    // Validate required fields
    if (!username || !name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Prevent creating additional super admins
    if (role === 'super_admin') {
      return NextResponse.json(
        { error: 'Cannot create additional super admins. Only one super admin is allowed.' },
        { status: 403 }
      );
    }

    // Validate role
    if (!['admin', 'super_admin'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Check if username is available
    const usernameAvailable = await isUsernameAvailable(username);

    if (!usernameAvailable) {
      return NextResponse.json(
        { error: 'Username is already taken' },
        { status: 409 }
      );
    }

    // Check if email is available
    const existingUsers = await query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    ) as any[];

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Email is already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create new admin
    const result = await query(
      `INSERT INTO users (username, name, email, password_hash, role, is_active, created_at) 
       VALUES (?, ?, ?, ?, ?, TRUE, NOW())`,
      [username, name, email, passwordHash, role]
    ) as any;

    // Get created user data
    const newUsers = await query(
      'SELECT id, username, name, email, role, is_active, created_at FROM users WHERE id = ?',
      [result.insertId]
    ) as any[];

    const newUser = newUsers[0];

    return NextResponse.json({
      message: 'Admin created successfully',
      user: newUser,
    });

  } catch (error) {
    console.error('Create admin error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
