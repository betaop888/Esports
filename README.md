# Dota 2 Esports - Next.js Migration

## Project Overview
This is a Next.js version of the Dota 2 Esports platform, migrated from Express for Vercel deployment.

## Features Implemented
- ✅ Next.js 16 with TypeScript
- ✅ Tailwind CSS 4
- ✅ Steam OpenID authentication
- ✅ Iron-session for session management (90-day sessions)
- ✅ JSON file-based database (compatible with serverless)
- ✅ Admin panel with role-based access control
- ✅ Team creation with Steam ID validation
- ✅ Tournament management
- ✅ Creator role for Steam ID: 76561199771227331

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Environment Variables
Create `.env.local`:
```bash
PORT=3000
NODE_ENV=development
SESSION_SECRET=dota2-esports-super-secret-session-key-2024
STEAM_API_KEY=DD776CE42D062F8B967273297196BCA5
SITE_URL=http://localhost:3000
```

### Development
```bash
npm run dev
```
Visit http://localhost:3000

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

## API Endpoints

### Authentication
- `GET /api/auth/steam` - Steam login redirect
- `GET /api/auth/steam/callback` - Steam callback
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Players
- `GET /api/players` - Get all players (with filters)
- Query params: `role`, `search`

### Teams
- `GET /api/teams` - Get all teams (with filters)
- Query params: `status`, `search`
- `POST /api/teams` - Create team (requires auth)
- Body: `team_name`, `description`, `organizer_contact`, `player_steam_ids`

### Tournaments
- `GET /api/tournaments` - Get all tournaments (with filters)
- Query params: `status`, `search`
- `POST /api/tournaments` - Create tournament (requires auth)

### Admin (requires admin/creator role)
- `GET /api/admin/teams/pending` - Get pending team applications
- `PUT /api/admin/teams/[id]/status` - Approve/reject team
- `GET /api/admin/tournaments/pending` - Get pending tournament applications
- `PUT /api/admin/tournaments/[id]/status` - Approve/reject tournament
- `GET /api/admin/users` - Get all users with roles
- `POST /api/admin/users/[id]/role` - Grant role to user

## Pages
- `/` - Homepage
- `/profile` - User profile (requires auth)
- `/teams` - Teams catalog
- `/tournaments` - Tournaments catalog
- `/players` - Players catalog
- `/admin` - Admin panel (requires admin/creator role)

## Database
Current implementation uses JSON file-based storage (`database.json`) for compatibility with serverless environments.

For production, consider migrating to:
- Vercel Postgres (recommended)
- Upstash Redis
- Neon Postgres

## Role System
- `user` - Default role for all users
- `organizer` - Can create tournaments
- `admin` - Full admin access
- `creator` - Platform creator (full access)

## Session Management
- 90-day session duration
- No rolling sessions (prevents frequent logouts)
- HTTP-only cookies
- SameSite: lax
- Secure in production

## Vercel Deployment

### Install Vercel CLI
```bash
npm install -g vercel
```

### Deploy
```bash
vercel
```

### Environment Variables on Vercel
Set the same variables in Vercel dashboard:
- `SESSION_SECRET`
- `STEAM_API_KEY`
- `SITE_URL` (your production URL)

## Testing
```bash
# Test auth flow
curl http://localhost:3000/api/auth/me

# Test API endpoints
curl http://localhost:3000/api/players
curl http://localhost:3000/api/teams
curl http://localhost:3000/api/tournaments
```

## Current Status
- ✅ Basic Next.js structure
- ✅ Authentication system
- ✅ API routes
- ✅ Basic pages
- ✅ Admin panel (view only)
- ⏳ Client-side interactivity (forms, search, filters)
- ⏳ Full admin panel functionality
- ⏳ Real-time updates

## Next Steps
1. Add client-side JavaScript for forms and interactivity
2. Implement full admin panel with client-side actions
3. Add search and filtering functionality
4. Migrate to Vercel Postgres for production
5. Add error handling and loading states
6. Add animations and transitions
