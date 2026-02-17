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

    // Fetch recent activity logs
    const logs = await query(
      `SELECT al.*, u.username, u.name 
       FROM user_activity_log al 
       LEFT JOIN users u ON al.user_id = u.id 
       ORDER BY al.created_at DESC 
       LIMIT 100`,
      []
    ) as any[];

    return NextResponse.json({
      logs,
      total: logs.length,
    });

  } catch (error) {
    console.error('Get activity logs error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
