import { NextRequest, NextResponse } from 'next/server';
import { getTournaments, createTournament } from '@/lib/db';
import { getSession } from '@/lib/simple-session';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    
    const tournaments = await getTournaments(status, search);
    return NextResponse.json(tournaments);
  } catch (error) {
    console.error('Tournaments error:', error);
    return NextResponse.json({ error: 'Failed to fetch tournaments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const { title, access_type, format, description, prize } = body;

    // Basic input validation
    if (!title || title.trim().length < 3) {
      return NextResponse.json({ error: 'Title must be at least 3 characters' }, { status: 400 });
    }
    
    if (!description || description.trim().length < 10) {
      return NextResponse.json({ error: 'Description must be at least 10 characters' }, { status: 400 });
    }
    
    if (!format || format.trim().length < 3) {
      return NextResponse.json({ error: 'Format must be at least 3 characters' }, { status: 400 });
    }
    
    if (!prize || prize.trim().length < 1) {
      return NextResponse.json({ error: 'Prize is required' }, { status: 400 });
    }

    // Sanitize inputs to prevent XSS
    const sanitizeInput = (input: string) => input.trim().replace(/[<>]/g, '');

    const tournament = await createTournament({
      title: sanitizeInput(title),
      access_type: sanitizeInput(access_type),
      format: sanitizeInput(format),
      description: sanitizeInput(description),
      prize: sanitizeInput(prize),
      status: 'PENDING',
      organizer_id: session.user.id,
    });
    
    return NextResponse.json(tournament, { status: 201 });
  } catch (error) {
    console.error('Create tournament error:', error);
    return NextResponse.json({ error: 'Failed to create tournament' }, { status: 500 });
  }
}
