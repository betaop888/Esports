import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.json');

// Initialize database
let db: {
  users: User[];
  players: Player[];
  teams: Team[];
  tournaments: Tournament[];
  tournament_applications: any[];
  roles: Role[];
  counters: { [key: string]: number };
} = {
  users: [],
  players: [],
  teams: [],
  tournaments: [],
  tournament_applications: [],
  roles: [],
  counters: {
    users: 0,
    players: 0,
    teams: 0,
    tournaments: 0,
    roles: 0
  }
};

// Load database from file
function loadDatabase() {
  try {
    if (fs.existsSync(dbPath)) {
      const fileData = fs.readFileSync(dbPath, 'utf8');
      const loadedDb = JSON.parse(fileData);
      
      // Merge with counters if they don't exist in old format
      db = {
        ...loadedDb,
        counters: loadedDb.counters || {
          users: loadedDb.users?.length || 0,
          players: loadedDb.players?.length || 0,
          teams: loadedDb.teams?.length || 0,
          tournaments: loadedDb.tournaments?.length || 0,
          roles: loadedDb.roles?.length || 0
        }
      };
    }
  } catch (error) {
    console.error('Error loading database:', error);
  }
}

function saveDatabase() {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  } catch (error) {
    console.error('Error saving database:', error);
  }
}

// Load on import
loadDatabase();

export interface User {
  id: number;
  steam_id: string;
  steam_username: string;
  region: string;
  avatar_url: string | null;
  created_at: string;
}

export interface Player {
  id: number;
  username: string;
  role: string;
  team_name: string;
  region: string;
}

export interface Team {
  id: number;
  team_name: string;
  description: string;
  organizer_contact: string;
  status: string;
  player_steam_ids: string[];
  organizer_id: number;
  created_at: string;
}

export interface Tournament {
  id: number;
  title: string;
  access_type: string;
  format: string;
  description: string;
  prize: string;
  status: string;
  organizer_id: number;
  created_at: string;
}

export interface Role {
  id: number;
  user_id: number;
  role: string;
  created_at: string;
}

// User operations
export async function getUserBySteamId(steamId: string): Promise<User | null> {
  return db.users.find((u: User) => u.steam_id === steamId) || null;
}

export async function createUser(user: Omit<User, 'id' | 'created_at'>): Promise<User> {
  db.counters.users++;
  const newUser: User = {
    id: db.counters.users,
    ...user,
    created_at: new Date().toISOString()
  };
  db.users.push(newUser);
  saveDatabase();
  return newUser;
}

export async function updateUserAvatar(userId: number, avatarUrl: string): Promise<void> {
  const user = db.users.find((u: User) => u.id === userId) as User | undefined;
  if (user) {
    user.avatar_url = avatarUrl;
    saveDatabase();
  }
}

export async function getUserById(id: number): Promise<User | null> {
  return db.users.find((u: User) => u.id === id) || null;
}

export async function getAllUsers(): Promise<User[]> {
  return db.users;
}

// Player operations
export async function getPlayers(role?: string, search?: string): Promise<Player[]> {
  let result = [...db.players];
  
  if (role && role !== 'Все роли') {
    result = result.filter((p: Player) => p.role === role);
  }
  
  if (search) {
    result = result.filter((p: Player) => 
      p.username.toLowerCase().includes(search.toLowerCase()) || 
      p.team_name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  return result;
}

// Team operations
export async function getTeams(status?: string, search?: string): Promise<Team[]> {
  let result = [...db.teams];
  
  if (status && status !== 'Все') {
    result = result.filter((t: Team) => t.status === status);
  }
  
  if (search) {
    result = result.filter((t: Team) => 
      t.team_name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  return result;
}

export async function createTeam(data: Omit<Team, 'id' | 'created_at'>): Promise<Team> {
  db.counters.teams++;
  const newTeam: Team = {
    id: db.counters.teams,
    ...data,
    created_at: new Date().toISOString()
  };
  db.teams.push(newTeam);
  saveDatabase();
  return newTeam;
}

export async function updateTeamStatus(id: number, status: string): Promise<Team> {
  const team = db.teams.find((t: Team) => t.id === id) as Team | undefined;
  if (team) {
    team.status = status;
    saveDatabase();
    return team;
  }
  throw new Error('Team not found');
}

export async function getTeamById(id: number): Promise<Team | null> {
  return db.teams.find((t: Team) => t.id === id) || null;
}

// Tournament operations
export async function getTournaments(status?: string, search?: string): Promise<Tournament[]> {
  let result = [...db.tournaments];
  
  if (status && status !== 'Все турниры') {
    result = result.filter((t: Tournament) => t.access_type === status);
  }
  
  if (search) {
    result = result.filter((t: Tournament) => 
      t.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  return result;
}

export async function createTournament(data: Omit<Tournament, 'id' | 'created_at'>): Promise<Tournament> {
  db.counters.tournaments++;
  const newTournament: Tournament = {
    id: db.counters.tournaments,
    ...data,
    status: data.status || 'PENDING',
    created_at: new Date().toISOString()
  };
  db.tournaments.push(newTournament);
  saveDatabase();
  return newTournament;
}

export async function updateTournamentStatus(id: number, status: string): Promise<Tournament> {
  const tournament = db.tournaments.find((t: Tournament) => t.id === id) as Tournament | undefined;
  if (tournament) {
    tournament.status = status;
    saveDatabase();
    return tournament;
  }
  throw new Error('Tournament not found');
}

// Role operations
export async function getUserRole(userId: number): Promise<Role | null> {
  return db.roles.find((r: Role) => r.user_id === userId) || null;
}

export async function grantRole(userId: number, role: string): Promise<Role> {
  db.counters.roles++;
  const newRole: Role = {
    id: db.counters.roles,
    user_id: userId,
    role,
    created_at: new Date().toISOString()
  };
  db.roles.push(newRole);
  saveDatabase();
  return newRole;
}

export async function getUsersWithRoles(): Promise<(User & { roles: string[] })[]> {
  return db.users.map((user: User) => {
    const userRoles = db.roles.filter((r: Role) => r.user_id === user.id);
    return {
      ...user,
      roles: userRoles.map((r: Role) => r.role)
    };
  });
}
