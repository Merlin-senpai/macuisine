import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

// This middleware protects all admin panel routes
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply to admin-panel routes (except login page)
  if (pathname.startsWith('/admin-panel') && !pathname.startsWith('/admin-panel/api')) {
    // Check if user is authenticated
    const session = await getSession();

    if (!session) {
      // Redirect to login page
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user is admin and active
    if (!['admin', 'super_admin'].includes(session.user.role) || !session.user.is_active) {
      // Redirect to login with error
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('error', 'access_denied');
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin-panel/:path*',
};
