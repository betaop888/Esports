import Link from 'next/link';

export const metadata = {
  title: "Игроки",
  description: "База игроков Dota 2. Профили, статистика, история выступлений на турнирах."
};

export default function PlayersPage() {
  return (
    <div className="min-h-screen">
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
          <Link href="/tournaments" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Турниры</Link>
          <Link href="/teams" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Команды</Link>
          <Link href="/players" aria-current="page" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Игроки</Link>
          <Link href="/rules" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Правила</Link>
        </nav>
        <Link href="/profile" aria-label="Перейти в профиль" className="ml-auto flex gap-[12px] items-center text-[14px]">
          <img src="/assets/steam-icon-black.png" alt="Steam icon" width={31} height={31} />
          <span>Мой профиль</span>
          <span aria-hidden="true">→</span>
        </Link>
      </header>

      <main role="main" id="main-content" className="w-full max-w-[1600px] mx-auto px-[32px]">
        <section aria-labelledby="players-heading" className="py-[120px_0_80px] flex justify-between gap-[40px] items-end">
          <div>
            <div className="text-[12px] tracking-normal uppercase text-[#a8b3c0] mb-4">DOTA 2 ESPORTS / PLAYERS</div>
            <h1 id="players-heading" className="text-[48px] leading-tight tracking-tight mb-6">Игроки</h1>
            <p className="max-w-[680px] text-[18px] leading-relaxed text-[#a8b3c0]">База игроков Dota 2. Профили, статистика, история выступлений на турнирах.</p>
          </div>
        </section>

        <div className="flex gap-3 flex-wrap items-center mb-7" role="search" aria-label="Поиск игроков">
          <label htmlFor="playerSearch" className="sr-only">Поиск игрока</label>
          <input 
            id="playerSearch" 
            type="search"
            aria-label="Поиск игрока по имени"
            className="h-12 border border-[rgba(255,255,255,0.12)] rounded-[6px] bg-[#141a23] px-4 outline-none min-w-[270px] text-white" 
            placeholder="Поиск игрока" 
          />
          <label htmlFor="roleFilter" className="sr-only">Фильтр по роли</label>
          <select id="roleFilter" aria-label="Фильтр по роли игрока" className="h-12 border border-[rgba(255,255,255,0.12)] rounded-[6px] bg-[#141a23] px-4 outline-none text-white">
            <option>Все роли</option>
            <option>Carry</option>
            <option>Mid</option>
            <option>Offlane</option>
            <option>Support</option>
          </select>
        </div>

        <div aria-live="polite" aria-atomic="true" className="grid player-grid gap-6" id="playerGrid">
          <div className="empty p-12 border border-dashed border-[rgba(255,255,255,0.12)] rounded-[8px] text-center text-[#6b7683]" role="status">
            Загрузка игроков...
          </div>
        </div>
      </main>

      <footer role="contentinfo" className="py-[48px_32px_32px] border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center text-[#6b7683] text-[10px] tracking-normal uppercase">
        <div>DOTA 2 ESPORTS / PLAY / COMPETE / GROW</div>
        <div>© 2024 Dota 2 Esports Platform</div>
      </footer>
    </div>
  );
}
