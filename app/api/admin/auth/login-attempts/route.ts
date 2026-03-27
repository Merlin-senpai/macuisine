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

    // Fetch recent login attempts
    const attempts = await query(
      `SELECT * FROM login_attempts 
       ORDER BY attempted_at DESC 
       LIMIT 100`,
      []
    ) as any[];

    return NextResponse.json({
      attempts,
      total: attempts.length,
    });

  } catch (error) {
    console.error('Get login attempts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
