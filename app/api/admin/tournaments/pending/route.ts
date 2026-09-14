import { NextResponse } from 'next/server';
import { getSession } from '@/lib/simple-session';
import { getUserRole, getTournaments } from '@/lib/db';

export async function GET() {
  try {
    const session = await getSession();
    if (!session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userRole = await getUserRole(session.user.id);
    if (!userRole || (userRole.role !== 'admin' && userRole.role !== 'creator')) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const tournaments = await getTournaments('PENDING');
    return NextResponse.json(tournaments);
  } catch (error) {
    console.error('Admin error:', error);
    return NextResponse.json({ error: 'Failed to fetch pending tournaments' }, { status: 500 });
  }
}
