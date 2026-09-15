import Link from 'next/link';

export const metadata = {
  title: "Турниры",
  description: "Участвуйте в соревнованиях, регистрируйте команды и соревнуйтесь за призовые места в профессиональных турнирах Dota 2."
};

export default function TournamentsPage() {
  return (
    <div className="min-h-screen bg-[#0a0e14]">
      <header role="banner" className="h-[72px] border-b border-[rgba(255,255,255,0.08)] flex items-center px-[32px] bg-[rgba(10,14,20,0.95)] backdrop-blur-[16px]">
        <Link href="/" className="flex items-center gap-[12px] min-w-[180px]" aria-label="Dota 2 Esports Platform - Главная">
          <img src="/assets/dota-icon.png" alt="Dota 2 logo" width={40} height={40} />
          <span className="font-bold tracking-normal leading-normal text-[16px]">
            <span className="block">DOTA 2</span>
            <span className="block">ESPORTS</span>
          </span>
        </Link>
        <nav aria-label="Основная навигация" className="flex items-center gap-[16px] h-full ml-[32px]">
          <Link href="/" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Главная</Link>
          <Link href="/tournaments" aria-current="page" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Турниры</Link>
          <Link href="/teams" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Команды</Link>
          <Link href="/players" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Игроки</Link>
          <Link href="/rules" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Правила</Link>
        </nav>
        <Link href="/profile" aria-label="Перейти в профиль" className="ml-auto flex gap-[12px] items-center text-[14px]">
          <img src="/assets/steam-icon-black.png" alt="Steam icon" width={31} height={31} />
          <span>Мой профиль</span>
          <span aria-hidden="true">→</span>
        </Link>
      </header>

      <main role="main" id="main-content" className="w-full max-w-[1600px] mx-auto px-[32px]">
        <section aria-labelledby="tournaments-heading" className="py-[120px_0_80px]">
          <div className="kicker text-[12px] tracking-[0.28em] uppercase text-[#6b7683] mb-4">DOTA 2 ESPORTS / COMPETITIONS</div>
          <h1 id="tournaments-heading" className="text-[48px] leading-tight tracking-tight mb-5">Турниры</h1>
          <p className="max-w-[680px] text-[18px] leading-relaxed text-[#a8b3c0]">Участвуйте в соревнованиях, регистрируйте команды и соревнуйтесь за призовые места в профессиональных турнирах Dota 2.</p>
        </section>

        <div className="flex gap-3 flex-wrap items-center mb-7" role="search" aria-label="Поиск турниров">
          <label htmlFor="tournamentSearch" className="sr-only">Поиск турнира</label>
          <input
            id="tournamentSearch"
            type="search"
            aria-label="Поиск турнира по названию"
            className="h-12 border border-[rgba(255,255,255,0.12)] rounded-[8px] bg-[#141a23] px-4 outline-none min-w-[270px] text-white placeholder-[#6b7683]"
            placeholder="Поиск турнира"
          />
          <button className="tag" aria-pressed="false">Открытые</button>
          <button className="tag" aria-pressed="false">По приглашению</button>
        </div>

        <div aria-live="polite" aria-atomic="true" className="grid tournament-grid gap-6" id="tournamentGrid">
          <div className="empty p-12 border border-dashed border-[rgba(255,255,255,0.12)] rounded-[12px] text-center text-[#6b7683]" role="status">
            Загрузка турниров...
          </div>
        </div>
      </main>

      <footer role="contentinfo" className="py-[50px_32px_60px] border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center text-[#6b7683] text-[10px] tracking-[0.16em] uppercase">
        <div>DOTA 2 ESPORTS / PLAY / COMPETE / GROW</div>
        <div>© 2024 Dota 2 Esports Platform</div>
      </footer>
    </div>
  );
}