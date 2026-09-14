import { cookies } from 'next/headers';

export interface SessionData {
  user?: {
    id: number;
    steam_id: string;
    steam_username: string;
    avatar_url: string | null;
    role?: string;
  };
}

const SESSION_COOKIE = 'dota2_session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret-change-in-production';

// Simple session encoding/decoding
function encodeSession(data: SessionData): string {
  const str = JSON.stringify(data);
  const encoded = Buffer.from(str).toString('base64');
  // Simple XOR encoding for basic obfuscation
  const secretBuffer = Buffer.from(SESSION_SECRET);
  let result = '';
  for (let i = 0; i < encoded.length; i++) {
    result += String.fromCharCode(encoded.charCodeAt(i) ^ secretBuffer[i % secretBuffer.length]);
  }
  return Buffer.from(result).toString('base64');
}

function decodeSession(cookie: string): SessionData | null {
  try {
    const secretBuffer = Buffer.from(SESSION_SECRET);
    const decoded = Buffer.from(cookie, 'base64').toString();
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(decoded.charCodeAt(i) ^ secretBuffer[i % secretBuffer.length]);
    }
    const decodedStr = Buffer.from(result, 'base64').toString();
    return JSON.parse(decodedStr);
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionData> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);
  
  if (!sessionCookie) {
    return {};
  }
  
  const session = decodeSession(sessionCookie.value);
  return session || {};
}

export async function setSession(data: SessionData) {
  const cookieStore = await cookies();
  const encoded = encodeSession(data);

  cookieStore.set(SESSION_COOKIE, encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 90 * 24 * 60 * 60, // 90 days
    path: '/',
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
