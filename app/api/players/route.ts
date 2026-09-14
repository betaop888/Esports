import { NextRequest, NextResponse } from 'next/server';
import { getPlayers } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get('role') || undefined;
    const search = searchParams.get('search') || undefined;
    
    const players = await getPlayers(role, search);
    return NextResponse.json(players);
  } catch (error) {
    console.error('Players error:', error);
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}
