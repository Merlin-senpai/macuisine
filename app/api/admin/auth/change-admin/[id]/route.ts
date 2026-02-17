import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword, isUsernameAvailable, invalidateAllUserSessions } from '@/lib/auth';
import { requireSuperAdmin } from '@/lib/middleware';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const targetUserId = parseInt(resolvedParams.id);
    const { username, name, email, password, role, is_active } = await request.json();

    if (isNaN(targetUserId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    // Require super admin access
    const superAdmin = await requireSuperAdmin(request);

    if (superAdmin instanceof NextResponse) {
      return superAdmin; // Error response
    }

    // Get target user
    const targetUsers = await query(
      'SELECT * FROM users WHERE id = ?',
      [targetUserId]
    ) as any[];

    if (targetUsers.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const targetUser = targetUsers[0];

    // Prevent super admin from deactivating themselves if they're the only one
    if (targetUser.id === superAdmin.id && is_active === false) {
      // Check if there are other super admins
      const otherSuperAdmins = await query(
        'SELECT COUNT(*) as count FROM users WHERE role = "super_admin" AND is_active = TRUE AND id != ?',
        [targetUser.id]
      ) as any[];

      if (otherSuperAdmins[0].count === 0) {
        return NextResponse.json(
          { error: 'Cannot deactivate the only super admin' },
          { status: 400 }
        );
      }
    }

    // Validate role if provided
    if (role && !['admin', 'super_admin'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Prevent changing role to super_admin (only for new assignments, not existing super admins)
    if (role === 'super_admin' && targetUser.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Cannot assign super admin role. Only one super admin is allowed.' },
        { status: 403 }
      );
    }

    // Prevent changing current super admin's role (only if trying to change it)
    if (targetUser.role === 'super_admin' && role !== targetUser.role) {
      return NextResponse.json(
        { error: 'Cannot change super admin role.' },
        { status: 403 }
      );
    }

    // Check username uniqueness if provided
    if (username && username !== targetUser.username) {
      const usernameAvailable = await isUsernameAvailable(username, targetUserId);

      if (!usernameAvailable) {
        return NextResponse.json(
          { error: 'Username is already taken' },
          { status: 409 }
        );
      }
    }

    // Check email uniqueness if provided
    if (email && email !== targetUser.email) {
      const existingUsers = await query(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [email, targetUserId]
      ) as any[];

      if (existingUsers.length > 0) {
        return NextResponse.json(
          { error: 'Email is already registered' },
          { status: 409 }
        );
      }
    }

    // Build update data
    const updateData: any = {};
    
    if (username !== undefined) updateData.username = username;
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;
    if (is_active !== undefined) updateData.is_active = is_active;
    
    if (password) {
      updateData.password_hash = await hashPassword(password);
      // Invalidate all sessions for this user when password changes
      await invalidateAllUserSessions(targetUserId);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // Build dynamic update query
    const setClause = Object.keys(updateData)
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = Object.values(updateData);
    values.push(targetUserId);

    await query(
      `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = ?`,
      values
    );

    // Get updated user data
    const updatedUsers = await query(
      'SELECT id, username, name, email, role, is_active, created_at, updated_at FROM users WHERE id = ?',
      [targetUserId]
    ) as any[];

    const updatedUser = updatedUsers[0];

    return NextResponse.json({
      message: 'Admin updated successfully',
      user: updatedUser,
    });

  } catch (error) {
    console.error('Update admin error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
