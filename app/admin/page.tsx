import { getSession } from '@/lib/simple-session';
import { redirect } from 'next/navigation';
import { getUserRole, getUsersWithRoles, getTeams, getTournaments, grantRole } from '@/lib/db';

export default async function AdminPage() {
  const session = await getSession();
  
  if (!session.user) {
    redirect('/api/auth/steam');
  }

  const userRole = await getUserRole(session.user.id);
  if (!userRole || (userRole.role !== 'admin' && userRole.role !== 'creator')) {
    redirect('/');
  }

  const users = await getUsersWithRoles();
  const pendingTeams = await getTeams('PENDING');
  const pendingTournaments = await getTournaments('PENDING');

  return (
    <div className="min-h-screen">
      <header className="h-[72px] border-b border-[rgba(255,255,255,0.08)] flex items-center px-[32px] bg-[rgba(10,14,20,0.95)] backdrop-blur-[16px]">
        <a href="/" className="flex items-center gap-[12px] min-w-[180px]">
          <img src="/assets/dota-icon.png" alt="Dota 2" width={40} height={40} />
          <span className="font-bold tracking-normal leading-normal text-[16px]">
            <span className="block">DOTA 2</span>
            <span className="block">ESPORTS</span>
          </span>
        </a>
        <nav className="flex items-center gap-[16px] h-full ml-[32px]">
          <a href="/" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Главная</a>
          <a href="/tournaments" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Турниры</a>
          <a href="/teams" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Команды</a>
          <a href="/players" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Игроки</a>
          <a href="/admin" className="h-full flex items-center text-[14px] text-[#a8b3c0] active">Админ панель</a>
        </nav>
        <a href="/profile" className="ml-auto flex gap-[12px] items-center text-[14px]">
          <img src="/assets/steam-icon-black.png" alt="Steam" width={31} height={31} />
          <span>{session.user.steam_username} →</span>
        </a>
      </header>

      <main className="w-full max-w-[1600px] mx-auto px-[32px]">
        <section className="py-[120px_0_80px]">
          <div className="kicker text-[12px] tracking-normal uppercase text-[#a8b3c0] mb-4">DOTA 2 ESPORTS / ADMIN</div>
          <h1 className="text-[48px] leading-tight tracking-tight mb-6">Админ панель</h1>
          <p className="max-w-[680px] text-[18px] leading-relaxed text-[#a8b3c0]">Админка: проверка заявок команд и турниров, управление ролями.</p>
        </section>

        <div className="grid gap-10 pb-[100px]">
          <div className="bg-[#141a23] border border-[rgba(255,255,255,0.08)] rounded-[8px] p-9">
            <h3 className="text-[12px] uppercase tracking-normal text-[#a8b3c0] mb-3">Заявки на команды</h3>
            <div className="grid gap-4 mt-6">
              {pendingTeams.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-[rgba(255,255,255,0.12)] rounded-[8px] text-[#6b7683]">
                  Нет заявок на команды
                </div>
              ) : (
                pendingTeams.map((team) => (
                  <div key={team.id} className="bg-[#1c2430] border border-[rgba(255,255,255,0.08)] rounded-[8px] p-6">
                    <div className="flex justify-between items-center mb-4">
                      <strong className="text-[18px] font-bold">{team.team_name}</strong>
                      <span className="inline-flex items-center h-7 px-3 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[rgba(255,255,255,0.1)] text-[#a8b3c0]">{team.status}</span>
                    </div>
                    <div className="mb-5">
                      <p className="text-[14px] text-[#a8b3c0] mb-2"><strong>Описание:</strong> {team.description}</p>
                      <p className="text-[14px] text-[#a8b3c0] mb-2"><strong>Контакт:</strong> {team.organizer_contact}</p>
                      {team.player_steam_ids && team.player_steam_ids.length > 0 && (
                        <p className="text-[14px] text-[#a8b3c0]"><strong>Участники:</strong> {team.player_steam_ids.join(', ')}</p>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <span className="text-[12px] text-[#6b7683]">API: PUT /api/admin/teams/{team.id}/status</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-[#141a23] border border-[rgba(255,255,255,0.08)] rounded-[8px] p-9">
            <h3 className="text-[12px] uppercase tracking-normal text-[#a8b3c0] mb-3">Заявки на турниры</h3>
            <div className="grid gap-4 mt-6">
              {pendingTournaments.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-[rgba(255,255,255,0.12)] rounded-[8px] text-[#6b7683]">
                  Нет заявок на турниры
                </div>
              ) : (
                pendingTournaments.map((tournament) => (
                  <div key={tournament.id} className="bg-[#1c2430] border border-[rgba(255,255,255,0.08)] rounded-[8px] p-6">
                    <div className="flex justify-between items-center mb-4">
                      <strong className="text-[18px] font-bold">{tournament.title}</strong>
                      <span className="inline-flex items-center h-7 px-3 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[rgba(255,255,255,0.1)] text-[#a8b3c0]">{tournament.access_type}</span>
                    </div>
                    <div className="mb-5">
                      <p className="text-[14px] text-[#a8b3c0] mb-2"><strong>Описание:</strong> {tournament.description}</p>
                      <p className="text-[14px] text-[#a8b3c0] mb-2"><strong>Формат:</strong> {tournament.format}</p>
                      <p className="text-[14px] text-[#a8b3c0]"><strong>Призовой фонд:</strong> {tournament.prize}</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-[12px] text-[#6b7683]">API: PUT /api/admin/tournaments/{tournament.id}/status</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-[#141a23] border border-[rgba(255,255,255,0.08)] rounded-[8px] p-9">
            <h3 className="text-[12px] uppercase tracking-normal text-[#a8b3c0] mb-3">Управление пользователями</h3>
            <div className="grid gap-4 mt-6">
              {users.map((user) => (
                <div key={user.id} className="bg-[#1c2430] border border-[rgba(255,255,255,0.08)] rounded-[8px] p-6">
                  <div className="flex justify-between items-center mb-4">
                    <strong className="text-[18px] font-bold">{user.steam_username}</strong>
                    <span className="inline-flex items-center h-7 px-3 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[rgba(255,255,255,0.1)] text-[#a8b3c0]">
                      {user.roles.length > 0 ? user.roles.join(', ') : 'user'}
                    </span>
                  </div>
                  <div className="mb-5">
                    <p className="text-[14px] text-[#a8b3c0] mb-2"><strong>Steam ID:</strong> {user.steam_id}</p>
                    <p className="text-[14px] text-[#a8b3c0]"><strong>Регион:</strong> {user.region}</p>
                  </div>
                  <div className="flex gap-3">
                    {!user.roles.includes('organizer') && (
                      <span className="text-[12px] text-[#6b7683]">API: POST /api/admin/users/{user.id}/roles/organizer</span>
                    )}
                    {!user.roles.includes('admin') && (
                      <span className="text-[12px] text-[#6b7683]">API: POST /api/admin/users/{user.id}/roles/admin</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-[48px_32px_32px] border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center text-[#6b7683] text-[10px] tracking-normal uppercase">
        <div>DOTA 2 ESPORTS / PLAY / COMPETE / GROW</div>
        <div>© 2024 Dota 2 Esports Platform</div>
      </footer>
    </div>
  );
}

// These will be client-side functions in a real implementation
// For now, this is a static view

