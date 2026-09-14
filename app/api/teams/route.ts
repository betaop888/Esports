import { NextRequest, NextResponse } from 'next/server';
import { getTeams, createTeam, getUserBySteamId } from '@/lib/db';
import { getSession } from '@/lib/simple-session';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    
    const teams = await getTeams(status, search);
    return NextResponse.json(teams);
  } catch (error) {
    console.error('Teams error:', error);
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const { team_name, description, organizer_contact, player_steam_ids } = body;

    // Basic input validation
    if (!team_name || team_name.trim().length < 3) {
      return NextResponse.json({ error: 'Team name must be at least 3 characters' }, { status: 400 });
    }
    
    if (!description || description.trim().length < 10) {
      return NextResponse.json({ error: 'Description must be at least 10 characters' }, { status: 400 });
    }
    
    if (!organizer_contact || !organizer_contact.includes('@')) {
      return NextResponse.json({ error: 'Valid email address required' }, { status: 400 });
    }

    // Sanitize inputs to prevent XSS
    const sanitizeInput = (input: string) => input.trim().replace(/[<>]/g, '');
    
    // Validate Steam IDs if provided
    if (player_steam_ids && player_steam_ids.length > 0) {
      const validSteamIds = player_steam_ids.filter((id: string) => id && id.trim() !== '');
      
      if (validSteamIds.length > 6) {
        return NextResponse.json({ error: 'Maximum 6 players allowed' }, { status: 400 });
      }

      // Check if all players are registered on the platform
      for (const steamId of validSteamIds) {
        const user = await getUserBySteamId(steamId);
        if (!user) {
          return NextResponse.json({ error: `Player with Steam ID ${steamId} is not registered on the platform` }, { status: 400 });
        }
      }
    }

    const team = await createTeam({
      team_name: sanitizeInput(team_name),
      description: sanitizeInput(description),
      organizer_contact: sanitizeInput(organizer_contact),
      status: 'PENDING',
      player_steam_ids: player_steam_ids || [],
      organizer_id: session.user.id,
    });
    
    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error('Create team error:', error);
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
  }
}
