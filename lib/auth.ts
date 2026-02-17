import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { query } from './db';

// Session management
export async function createSession(userId: number, ipAddress?: string, userAgent?: string) {
  // First, invalidate all existing sessions for this user
  await query('DELETE FROM sessions WHERE user_id = ?', [userId]);
  
  const sessionId = generateSessionId();
  const tokenHash = await bcrypt.hash(sessionId, 10);
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 60); // 1 hour inactivity timeout

  await query(
    'INSERT INTO sessions (id, user_id, token_hash, ip_address, user_agent, expires_at) VALUES (?, ?, ?, ?, ?, ?)',
    [sessionId, userId, tokenHash, ipAddress, userAgent, expiresAt]
  );

  // Set HTTP-only cookie
  const cookieStore = await cookies();
  cookieStore.set('session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });

  return sessionId;
}

export async function deleteSession(sessionId: string) {
  await query('DELETE FROM sessions WHERE id = ?', [sessionId]);
  
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function invalidateAllUserSessions(userId: number) {
  await query('DELETE FROM sessions WHERE user_id = ?', [userId]);
  
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;

  if (!sessionId) {
    return null;
  }

  const sessions = await query(
    `SELECT s.*, u.* FROM sessions s 
     JOIN users u ON s.user_id = u.id 
     WHERE s.id = ? AND s.expires_at > NOW()`,
    [sessionId]
  ) as any[];

  if (sessions.length === 0) {
    return null;
  }

  const session = sessions[0];
  
  // Extend session timeout on activity (1 more hour)
  const newExpiresAt = new Date();
  newExpiresAt.setMinutes(newExpiresAt.getMinutes() + 60);
  
  await query(
    'UPDATE sessions SET last_accessed = NOW(), expires_at = ? WHERE id = ?',
    [newExpiresAt, sessionId]
  );
  
  // Remove sensitive data
  delete session.password_hash;
  delete session.token_hash;
  
  return {
    id: session.id,
    userId: session.user_id,
    user: {
      id: session.id,
      username: session.username,
      name: session.name,
      email: session.email,
      role: session.role,
      is_active: session.is_active,
      email_verified: session.email_verified,
      created_at: session.created_at,
      last_login: session.last_login,
    },
    expires_at: session.expires_at,
    ip_address: session.ip_address,
    user_agent: session.user_agent,
  };
}

export async function updateLastLogin(userId: number) {
  await query(
    'UPDATE users SET last_login = NOW() WHERE id = ?',
    [userId]
  );
}

// Authentication helpers
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export async function getUserByEmailOrUsername(identifier: string) {
  const users = await query(
    'SELECT * FROM users WHERE (email = ? OR BINARY username = ?) AND role IN ("admin", "super_admin")',
    [identifier, identifier]
  ) as any[];

  return users.length > 0 ? users[0] : null;
}

export async function isUsernameAvailable(username: string, excludeUserId?: number) {
  const sql = excludeUserId 
    ? 'SELECT id FROM users WHERE BINARY username = ? AND id != ?'
    : 'SELECT id FROM users WHERE BINARY username = ?';
  
  const params = excludeUserId ? [username, excludeUserId] : [username];
  
  const users = await query(sql, params) as any[];
  
  return users.length === 0;
}

// Helper for API routes
export async function getAdminFromSession(req: Request) {
  const session = await getSession();
  
  if (!session) {
    return null;
  }

  // Check if user is admin and active
  if (!['admin', 'super_admin'].includes(session.user.role) || !session.user.is_active) {
    return null;
  }

  return session.user;
}

// Activity logging
export async function logUserActivity(
  userId: number,
  action: string,
  resourceType?: string,
  resourceId?: number,
  ipAddress?: string,
  userAgent?: string
) {
  await query(
    'INSERT INTO user_activity_log (user_id, action, resource_type, resource_id, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, action, resourceType, resourceId, ipAddress, userAgent]
  );
}

// Login attempt tracking
export async function logLoginAttempt(
  username: string,
  success: boolean,
  ipAddress?: string,
  userAgent?: string
) {
  await query(
    'INSERT INTO login_attempts (username, success, ip_address, user_agent) VALUES (?, ?, ?, ?)',
    [username, success, ipAddress, userAgent]
  );
}

// Check for too many failed login attempts
export async function checkLoginAttempts(ipAddress: string, username: string): Promise<boolean> {
  const attempts = await query(
    `SELECT COUNT(*) as count FROM login_attempts 
     WHERE (ip_address = ? OR username = ?) 
     AND success = FALSE 
     AND attempted_at > DATE_SUB(NOW(), INTERVAL 15 MINUTE)`,
    [ipAddress, username]
  ) as any[];

  return attempts[0].count < 5; // Allow max 5 failed attempts per 15 minutes
}

// Utility functions
function generateSessionId(): string {
  return Array.from({ length: 32 }, () => 
    Math.random().toString(36).charAt(2)
  ).join('');
}
