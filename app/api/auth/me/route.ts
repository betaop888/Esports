import { NextResponse } from 'next/server';
import { getSession } from '@/lib/simple-session';

export async function GET() {
  const session = await getSession();
  
  if (session.user) {
    return NextResponse.json(session.user);
  }
  
  return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
}
