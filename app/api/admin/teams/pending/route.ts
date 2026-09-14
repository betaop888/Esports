import { NextResponse } from 'next/server';
import { getSession } from '@/lib/simple-session';
import { getUserRole, getTeams } from '@/lib/db';

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

    const teams = await getTeams('PENDING');
    return NextResponse.json(teams);
  } catch (error) {
    console.error('Admin error:', error);
    return NextResponse.json({ error: 'Failed to fetch pending teams' }, { status: 500 });
  }
}
