import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmailOrUsername, verifyPassword, createSession, updateLastLogin, logLoginAttempt, checkLoginAttempts, logUserActivity } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Email/username and password are required' },
        { status: 400 }
      );
    }

    // Get client IP and user agent for security logging
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Check for too many failed login attempts
    const canAttempt = await checkLoginAttempts(ipAddress, identifier);
    if (!canAttempt) {
      await logLoginAttempt(identifier, false, ipAddress, userAgent);
      return NextResponse.json(
        { error: 'Too many failed login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    // Get user by email or username
    const user = await getUserByEmailOrUsername(identifier);

    if (!user) {
      await logLoginAttempt(identifier, false, ipAddress, userAgent);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if account is active
    if (!user.is_active) {
      await logLoginAttempt(identifier, false, ipAddress, userAgent);
      return NextResponse.json(
        { error: 'Account is inactive' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash);

    if (!isValidPassword) {
      await logLoginAttempt(identifier, false, ipAddress, userAgent);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Log successful login attempt
    await logLoginAttempt(identifier, true, ipAddress, userAgent);

    // Create session with security info
    await createSession(user.id, ipAddress, userAgent);
    
    // Update last login
    await updateLastLogin(user.id);

    // Log user activity
    await logUserActivity(user.id, 'LOGIN', 'auth', user.id, ipAddress, userAgent);

    // Return user data (without sensitive info)
    const userData = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      email_verified: user.email_verified,
      created_at: user.created_at,
      last_login: new Date().toISOString(),
    };

    return NextResponse.json({
      message: 'Login successful',
      user: userData,
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
