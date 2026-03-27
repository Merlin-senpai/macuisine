import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/auth';

// This proxy protects all admin panel routes
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply to admin-panel routes (except API routes)
  if (pathname.startsWith('/admin-panel') && !pathname.startsWith('/admin-panel/api')) {
    try {
      // Check if user is authenticated
      const session = await getSession();

      if (!session) {
        // If trying to access root admin-panel, show login form
        if (pathname === '/admin-panel' || pathname === '/admin-panel/') {
          const loginUrl = new URL('/login', request.url);
          return NextResponse.redirect(loginUrl);
        }
        
        // If trying to access specific admin pages, show access denied page
        const accessDeniedUrl = new URL('/access-denied', request.url);
        accessDeniedUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(accessDeniedUrl);
      }

      // Check if user is admin and active
      if (!['admin', 'super_admin'].includes(session.user.role) || !session.user.is_active) {
        // Redirect to login with error
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('error', 'access_denied');
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      console.error('Proxy error:', error);
      // If there's an error, redirect to login for safety
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin-panel/:path*',
};
