import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireSuperAdmin } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  try {
    // Require super admin access
    const superAdmin = await requireSuperAdmin(request);

    if (superAdmin instanceof NextResponse) {
      return superAdmin; // Error response
    }

    // Fetch all admin users
    const users = await query(
      `SELECT id, username, name, email, role, is_active, email_verified, created_at, last_login 
       FROM users 
       WHERE role IN ('admin', 'super_admin') 
       ORDER BY created_at DESC`,
      []
    ) as any[];

    return NextResponse.json({
      users,
      total: users.length,
    });

  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
