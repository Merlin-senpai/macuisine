import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromSession } from './auth';

// Middleware to protect admin routes
export async function requireAuth(request: NextRequest) {
  const admin = await getAdminFromSession(request);

  if (!admin) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  return admin;
}

// Middleware to require super admin role
export async function requireSuperAdmin(request: NextRequest) {
  const admin = await requireAuth(request);

  if (admin instanceof NextResponse) {
    return admin; // Error response from requireAuth
  }

  if (admin.role !== 'super_admin') {
    return NextResponse.json(
      { error: 'Super admin access required' },
      { status: 403 }
    );
  }

  return admin;
}

// Check if user can access a specific resource
export async function canAccessResource(
  request: NextRequest,
  resourceUserId?: number
) {
  const admin = await requireAuth(request);

  if (admin instanceof NextResponse) {
    return admin; // Error response from requireAuth
  }

  // Super admins can access everything
  if (admin.role === 'super_admin') {
    return admin;
  }

  // Regular admins can only access their own resources
  if (resourceUserId && admin.id !== resourceUserId) {
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    );
  }

  return admin;
}
