export async function getSteamRedirectUrl(returnUrl: string) {
  const steamRealm = process.env.SITE_URL || 'http://localhost:3000';
  console.log('Steam redirect URL generation:', { returnUrl, steamRealm });
  
  const params = new URLSearchParams({
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': returnUrl,
    'openid.realm': steamRealm,
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
  });
  
  const url = `https://steamcommunity.com/openid/login?${params.toString()}`;
  console.log('Generated Steam redirect URL:', url);
  return url;
}

export async function verifySteamResponse(queryParams: any): Promise<string | null> {
  console.log('Verifying Steam response with params:', queryParams);
  
  const params = new URLSearchParams({
    'openid.ns': queryParams['openid.ns'],
    'openid.mode': 'check_authentication',
    'openid.op_endpoint': queryParams['openid.op_endpoint'],
    'openid.claimed_id': queryParams['openid.claimed_id'],
    'openid.identity': queryParams['openid.identity'],
    'openid.return_to': queryParams['openid.return_to'],
    'openid.response_nonce': queryParams['openid.response_nonce'],
    'openid.signed': queryParams['openid.signed'],
    'openid.sig': queryParams['openid.sig'],
  });

  console.log('Sending verification request to Steam');
  const response = await fetch('https://steamcommunity.com/openid/login', {
    method: 'POST',
    body: params,
  });
  
  const text = await response.text();
  console.log('Steam verification response:', text);
  
  if (text.includes('is_valid:true')) {
    const steamId = queryParams['openid.identity'].split('/').pop();
    console.log('Extracted Steam ID:', steamId);
    return steamId || null;
  }
  
  console.error('Steam verification failed');
  return null;
}

export async function getSteamUserDetails(steamId: string) {
  const apiKey = process.env.STEAM_API_KEY;
  if (!apiKey) return null;
  
  const response = await fetch(
    `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`
  );
  const data = await response.json();
  
  if (data.response?.players?.[0]) {
    return {
      steamid: steamId,
      username: data.response.players[0].personaname,
      avatarUrl: data.response.players[0].avatarfull,
    };
  }
  
  return null;
}
