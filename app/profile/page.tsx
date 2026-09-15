import { getSession } from '@/lib/simple-session';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function ProfilePage() {
  const session = await getSession();

  if (!session.user) {
    redirect('/api/auth/steam');
  }

  return (
    <div className="min-h-screen bg-[#0a0e14]">
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
          <a href="/rules" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Правила</a>
        </nav>
        <a href="/profile" className="ml-auto flex gap-[12px] items-center text-[14px]">
          <img src="/assets/steam-icon-black.png" alt="Steam" width={31} height={31} />
          <span>{session.user.steam_username} →</span>
        </a>
      </header>

      <main className="w-full max-w-[1600px] mx-auto px-[32px]">
        <section className="py-[120px_0_80px]">
          <div className="kicker text-[12px] tracking-[0.28em] uppercase text-[#6b7683] mb-4">DOTA 2 ESPORTS / PROFILE</div>
          <h1 className="text-[48px] leading-tight tracking-tight mb-6">Профиль игрока</h1>
          <p className="max-w-[680px] text-[18px] leading-relaxed text-[#a8b3c0]">Профиль: статистика, история турниров, достижения.</p>
        </section>

        <div className="grid grid-cols-[380px_1fr] gap-9 pb-[100px]">
          <aside className="bg-[#141a23] border border-[rgba(255,255,255,0.08)] rounded-[12px] p-9">
            <div className="w-[140px] h-[140px] mx-auto mb-5 relative">
              {session.user.avatar_url ? (
                <img
                  src={session.user.avatar_url}
                  alt={session.user.steam_username}
                  className="w-full h-full rounded-full object-cover border-4 border-[#1c2430] shadow-lg"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1c2430] to-[#6b7683] flex items-center justify-center text-white text-[48px] font-bold">
                  {session.user.steam_username?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <div className="text-center text-[32px] font-bold tracking-tight mb-2">{session.user.steam_username}</div>
            <div className="text-center text-[14px] text-[#a8b3c0] mb-6">Проверенный игрок</div>
            <div className="flex gap-2 flex-wrap mb-6">
              <a href={`https://steamcommunity.com/profiles/${session.user.steam_id}`} target="_blank" className="btn btn-dark px-5 py-3 text-white rounded-[8px] font-semibold text-sm">
                Steam профиль →
              </a>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-8 pt-8 border-t border-[rgba(255,255,255,0.08)]">
              <div className="text-center">
                <span className="block text-[24px] font-bold text-white">0</span>
                <span className="text-[12px] text-[#a8b3c0] uppercase tracking-wider">Матчей</span>
              </div>
              <div className="text-center">
                <span className="block text-[24px] font-bold text-white">0</span>
                <span className="text-[12px] text-[#a8b3c0] uppercase tracking-wider">Турниров</span>
              </div>
              <div className="text-center">
                <span className="block text-[24px] font-bold text-white">0</span>
                <span className="text-[12px] text-[#a8b3c0] uppercase tracking-wider">Команд</span>
              </div>
            </div>
          </aside>

          <section className="bg-[#141a23] border border-[rgba(255,255,255,0.08)] rounded-[12px] p-10">
            <div className="flex justify-between items-center mb-9 pb-6 border-b border-[rgba(255,255,255,0.08)]">
              <h2 className="text-[40px] font-bold tracking-tight">{session.user.steam_username}</h2>
              <div className="flex gap-2">
                <span className="inline-flex items-center h-8 px-4 rounded-full text-[12px] font-bold uppercase tracking-[0.05em] bg-[rgba(34,197,94,0.15)] text-[#22c55e] border border-[rgba(34,197,94,0.3)]">Steam проверен</span>
                <span className="inline-flex items-center h-8 px-4 rounded-full text-[12px] font-bold uppercase tracking-[0.05em] bg-[#1c2430] text-[#a8b3c0] border border-[rgba(255,255,255,0.08)]">CIS</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-10">
              <div className="flex gap-5 p-7 bg-[#1c2430] rounded-[12px] border border-[rgba(255,255,255,0.08)]">
                <div className="w-[60px] h-[60px] bg-[#141a23] rounded-[12px] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><rect x="2" y="6" width="20" height="12" rx="2"></rect></svg>
                </div>
                <div>
                  <h4 className="text-[18px] font-bold mb-2">Игровая статистика</h4>
                  <p className="text-[15px] text-[#a8b3c0]">0 матчей • 0% побед • 0 KDA</p>
                </div>
              </div>
              <div className="flex gap-5 p-7 bg-[#1c2430] rounded-[12px] border border-[rgba(255,255,255,0.08)]">
                <div className="w-[60px] h-[60px] bg-[#141a23] rounded-[12px] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                </div>
                <div>
                  <h4 className="text-[18px] font-bold mb-2">Турниры</h4>
                  <p className="text-[15px] text-[#a8b3c0]">0 участий • 0 побед • 0 призовых мест</p>
                </div>
              </div>
              <div className="flex gap-5 p-7 bg-[#1c2430] rounded-[12px] border border-[rgba(255,255,255,0.08)]">
                <div className="w-[60px] h-[60px] bg-[#141a23] rounded-[12px] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div>
                  <h4 className="text-[18px] font-bold mb-2">Команды</h4>
                  <p className="text-[15px] text-[#a8b3c0]">Не состоит в команде</p>
                </div>
              </div>
              <div className="flex gap-5 p-7 bg-[#1c2430] rounded-[12px] border border-[rgba(255,255,255,0.08)]">
                <div className="w-[60px] h-[60px] bg-[#141a23] rounded-[12px] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div>
                  <h4 className="text-[18px] font-bold mb-2">На платформе</h4>
                  <p className="text-[15px] text-[#a8b3c0]">{new Date().toLocaleDateString('ru-RU')}</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-[12px] uppercase tracking-[0.18em] text-[#6b7683] mb-3">История турниров</h3>
              <div className="text-center p-14 bg-[#1c2430] rounded-[12px] border border-dashed border-[rgba(255,255,255,0.08)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-[#6b7683]"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                <p className="text-[16px] text-[#a8b3c0] mb-5">Вы еще не участвовали в турнирах</p>
                <a href="/tournaments" className="btn btn-outline px-5 py-3 bg-transparent border border-[rgba(255,255,255,0.12)] rounded-[8px] font-bold text-sm">Найти турнир →</a>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-[12px] uppercase tracking-[0.18em] text-[#6b7683] mb-3">Командная история</h3>
              <div className="text-center p-14 bg-[#1c2430] rounded-[12px] border border-dashed border-[rgba(255,255,255,0.08)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-[#6b7683]"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <p className="text-[16px] text-[#a8b3c0] mb-5">Вы не состоите в команде</p>
                <a href="/teams" className="btn btn-outline px-5 py-3 bg-transparent border border-[rgba(255,255,255,0.12)] rounded-[8px] font-bold text-sm">Найти команду →</a>
              </div>
            </div>

            <div>
              <h3 className="text-[12px] uppercase tracking-[0.18em] text-[#6b7683] mb-3">Информация об аккаунте</h3>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col p-5 bg-[#1c2430] rounded-[12px] border border-[rgba(255,255,255,0.08)]">
                  <span className="text-[12px] text-[#6b7683] uppercase tracking-[0.08em] mb-2">Steam ID</span>
                  <span className="text-[16px] font-bold text-white">{session.user.steam_id}</span>
                </div>
                <div className="flex flex-col p-5 bg-[#1c2430] rounded-[12px] border border-[rgba(255,255,255,0.08)]">
                  <span className="text-[12px] text-[#6b7683] uppercase tracking-[0.08em] mb-2">Регистрация</span>
                  <span className="text-[16px] font-bold text-white">{new Date().toLocaleDateString('ru-RU')}</span>
                </div>
                <div className="flex flex-col p-5 bg-[#1c2430] rounded-[12px] border border-[rgba(255,255,255,0.08)]">
                  <span className="text-[12px] text-[#6b7683] uppercase tracking-[0.08em] mb-2">Регион</span>
                  <span className="text-[16px] font-bold text-white">CIS</span>
                </div>
                <div className="flex flex-col p-5 bg-[#1c2430] rounded-[12px] border border-[rgba(255,255,255,0.08)]">
                  <span className="text-[12px] text-[#6b7683] uppercase tracking-[0.08em] mb-2">Статус</span>
                  <span className="text-[16px] font-bold text-[#22c55e]">Активен</span>
                </div>
              </div>
            </div>
          </section>
        </div>
          </main>

      <footer className="py-[50px_32px_60px] border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center text-[#6b7683] text-[10px] tracking-[0.16em] uppercase">
        <div>DOTA 2 ESPORTS / PLAY / COMPETE / GROW</div>
        <div>© 2024 Dota 2 Esports Platform</div>
      </footer>
    </div>
  );
}