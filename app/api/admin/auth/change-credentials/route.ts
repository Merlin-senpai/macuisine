import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword, isUsernameAvailable, logUserActivity } from '@/lib/auth';
import { canAccessResource } from '@/lib/middleware';

export async function PUT(request: NextRequest) {
  try {
    const { username, currentPassword, newPassword } = await request.json();

    if (!username || !currentPassword) {
      return NextResponse.json(
        { error: 'Username and current password are required' },
        { status: 400 }
      );
    }

    // Get client info for logging
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Get current admin from session
    const admin = await canAccessResource(request);

    if (admin instanceof NextResponse) {
      return admin; // Error response
    }

    // Verify current password
    const users = await query(
      'SELECT password_hash FROM users WHERE id = ?',
      [admin.id]
    ) as any[];

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { verifyPassword } = await import('@/lib/auth');
    const isValidPassword = await verifyPassword(currentPassword, users[0].password_hash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // Check if username is available (excluding current user)
    const isAvailable = await isUsernameAvailable(username, admin.id);

    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Username is already taken' },
        { status: 409 }
      );
    }

    // Update user data
    const updateData: any = { username };
    
    if (newPassword) {
      updateData.password_hash = await hashPassword(newPassword);
    }

    // Build dynamic update query
    const setClause = Object.keys(updateData)
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = Object.values(updateData);
    values.push(admin.id);

    await query(
      `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = ?`,
      values
    );

    // Log activity
    await logUserActivity(
      admin.id, 
      newPassword ? 'CHANGE_CREDENTIALS_WITH_PASSWORD' : 'CHANGE_USERNAME', 
      'user', 
      admin.id, 
      ipAddress, 
      userAgent
    );

    return NextResponse.json({
      message: 'Credentials updated successfully',
      user: {
        id: admin.id,
        username,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {
    console.error('Change credentials error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
