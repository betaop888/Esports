import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/simple-session';
import { getUserRole, getUsersWithRoles, grantRole } from '@/lib/db';

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

    const users = await getUsersWithRoles();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Admin error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userRole = await getUserRole(session.user.id);
    if (!userRole || (userRole.role !== 'admin' && userRole.role !== 'creator')) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const body = await request.json();
    const { userId, role } = body;

    if (!['organizer', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const newRole = await grantRole(userId, role);
    return NextResponse.json({ success: true, role: newRole.role });
  } catch (error) {
    console.error('Admin error:', error);
    return NextResponse.json({ error: 'Failed to grant role' }, { status: 500 });
  }
}
