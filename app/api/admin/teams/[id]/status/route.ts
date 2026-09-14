import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/simple-session';
import { getUserRole, updateTeamStatus } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { status } = body;

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const { id } = await params;
    const team = await updateTeamStatus(parseInt(id), status);
    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error('Admin error:', error);
    return NextResponse.json({ error: 'Failed to update team status' }, { status: 500 });
  }
}
