import { NextRequest, NextResponse } from 'next/server';
import { getSteamUserDetails } from '@/lib/steam-auth';
import { getSession, setSession } from '@/lib/simple-session';
import { getUserBySteamId, createUser, updateUserAvatar, getUserRole } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryParams = Object.fromEntries(searchParams.entries());

  try {
    console.log('Steam callback received:', queryParams);
    
    // Extract Steam ID directly from the claimed_id/identity
    const claimedId = queryParams['openid.claimed_id'] || queryParams['openid.identity'];
    const steamId = claimedId?.split('/').pop();
    
    console.log('Extracted Steam ID:', steamId);
    
    if (!steamId) {
      console.error('Failed to extract Steam ID');
      return NextResponse.redirect(new URL('/?auth=error', request.url));
    }

    const steamUser = await getSteamUserDetails(steamId);
    console.log('Steam user:', steamUser);
    
    let user = await getUserBySteamId(steamId);
    console.log('Existing user:', user);

    if (!user) {
      user = await createUser({
        steam_id: steamId,
        steam_username: steamUser?.username || `SteamUser_${steamId}`,
        region: 'CIS',
        avatar_url: steamUser?.avatarUrl || null,
      });
      console.log('Created user:', user);
    } else if (steamUser?.avatarUrl && !user.avatar_url) {
      await updateUserAvatar(user.id, steamUser.avatarUrl);
      user.avatar_url = steamUser.avatarUrl;
    }

    // Check user role
    const userRole = await getUserRole(user.id);
    console.log('User role:', userRole);
    
    const sessionData = {
      user: {
        id: user.id,
        steam_id: user.steam_id,
        steam_username: user.steam_username,
        avatar_url: user.avatar_url,
        role: userRole?.role || 'user',
      }
    };
    
    await setSession(sessionData);
    console.log('Session saved:', sessionData);

    return NextResponse.redirect(new URL('/profile', request.url));
  } catch (error) {
    console.error('Steam auth error:', error);
    return NextResponse.redirect(new URL('/?auth=error', request.url));
  }
}
