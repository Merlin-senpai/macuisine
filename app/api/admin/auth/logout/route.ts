import { NextRequest, NextResponse } from 'next/server';
import { getSession, deleteSession, logUserActivity } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      // Clear cookie even if no session found
      const response = NextResponse.json({
        message: 'No active session',
      });
      response.cookies.set('session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0, // Delete cookie
      });
      return response;
    }

    // Get client info for logging
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Log logout activity
    await logUserActivity(session.user.id, 'LOGOUT', 'auth', session.user.id, ipAddress, userAgent);

    // Delete session from database
    await deleteSession(session.id);

    // Clear session cookie
    const response = NextResponse.json({
      message: 'Logout successful',
    });
    
    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0, // Delete cookie
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
