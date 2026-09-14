import { NextResponse } from 'next/server';
import { getSteamRedirectUrl } from '@/lib/steam-auth';

export async function GET() {
  const returnUrl = `${process.env.SITE_URL || 'http://localhost:3000'}/api/auth/steam/callback`;
  const redirectUrl = await getSteamRedirectUrl(returnUrl);
  return NextResponse.redirect(redirectUrl);
}
