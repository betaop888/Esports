import Link from 'next/link';

export const metadata = {
  title: "Игроки",
  description: "База игроков Dota 2. Профили, статистика, история выступлений на турнирах."
};

export default function PlayersPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfa]">
      <header role="banner" className="h-[110px] border-b border-[#e7e8e9] flex items-center px-[60px] bg-white/92 backdrop-blur-[12px]">
        <Link href="/" className="flex items-center gap-[17px] min-w-[266px]" aria-label="Dota 2 Esports Platform - Главная">
          <img src="/assets/dota-icon.png" alt="Dota 2 logo" width={40} height={40} />
          <span className="font-bold tracking-[0.09em] leading-[1.03] text-[16px]">
            <span className="block">DOTA 2</span>
            <span className="block">ESPORTS</span>
          </span>
        </Link>
        <nav aria-label="Основная навигация" className="flex items-center gap-[46px] h-full ml-[74px]">
          <Link href="/" className="h-full flex items-center text-[14px] text-[#262d35]">Главная</Link>
          <Link href="/tournaments" className="h-full flex items-center text-[14px] text-[#262d35]">Турниры</Link>
          <Link href="/teams" className="h-full flex items-center text-[14px] text-[#262d35]">Команды</Link>
          <Link href="/players" aria-current="page" className="h-full flex items-center text-[14px] text-[#262d35]">Игроки</Link>
          <Link href="/rules" className="h-full flex items-center text-[14px] text-[#262d35]">Правила</Link>
        </nav>
        <Link href="/profile" aria-label="Перейти в профиль" className="ml-auto flex gap-[14px] items-center text-[14px]">
          <img src="/assets/steam-icon-black.png" alt="Steam icon" width={31} height={31} />
          <span>Мой профиль</span>
          <span aria-hidden="true">→</span>
        </Link>
      </header>

      <main role="main" id="main-content" className="w-full max-w-[1600px] mx-auto px-[60px]">
        <section aria-labelledby="players-heading" className="py-[100px_0_50px] flex justify-between gap-[40px] items-end">
          <div>
            <div className="text-[12px] tracking-[0.28em] uppercase text-[#8e959e] mb-4">DOTA 2 ESPORTS / PLAYERS</div>
            <h1 id="players-heading" className="text-[64px] leading-[0.94] tracking-[-0.05em] mb-5">Игроки</h1>
            <p className="max-w-[680px] text-[17px] leading-[1.6] text-[#515b66]">База игроков Dota 2. Профили, статистика, история выступлений на турнирах.</p>
          </div>
        </section>

        <div className="flex gap-3 flex-wrap items-center mb-7" role="search" aria-label="Поиск игроков">
          <label htmlFor="playerSearch" className="sr-only">Поиск игрока</label>
          <input 
            id="playerSearch" 
            type="search"
            aria-label="Поиск игрока по имени"
            className="h-12 border border-[#e7e8e9] rounded-[11px] bg-white px-4 outline-none min-w-[270px]" 
            placeholder="Поиск игрока" 
          />
          <label htmlFor="roleFilter" className="sr-only">Фильтр по роли</label>
          <select id="roleFilter" aria-label="Фильтр по роли игрока" className="h-12 border border-[#e7e8e9] rounded-[11px] bg-white px-4 outline-none">
            <option>Все роли</option>
            <option>Carry</option>
            <option>Mid</option>
            <option>Offlane</option>
            <option>Support</option>
          </select>
        </div>

        <div aria-live="polite" aria-atomic="true" className="grid player-grid gap-6" id="playerGrid">
          <div className="empty p-12 border border-dashed border-[#e7e8e9] rounded-[12px] text-center text-[#8a929b]" role="status">
            Загрузка игроков...
          </div>
        </div>
      </main>

      <footer role="contentinfo" className="py-[50px_60px_60px] border-t border-[#e7e8e9] flex justify-between items-center text-[#7b838d] text-[10px] tracking-[0.16em] uppercase">
        <div>DOTA 2 ESPORTS / PLAY / COMPETE / GROW</div>
        <div>© 2024 Dota 2 Esports Platform</div>
      </footer>
    </div>
  );
}
