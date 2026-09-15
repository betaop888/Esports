import Link from 'next/link';

export default function Home() {
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
          <Link href="/" aria-current="page" className="h-full flex items-center text-[14px] text-[#262d35]">Главная</Link>
          <Link href="/tournaments" className="h-full flex items-center text-[14px] text-[#262d35]">Турниры</Link>
          <Link href="/teams" className="h-full flex items-center text-[14px] text-[#262d35]">Команды</Link>
          <Link href="/players" className="h-full flex items-center text-[14px] text-[#262d35]">Игроки</Link>
          <Link href="/rules" className="h-full flex items-center text-[14px] text-[#262d35]">Правила</Link>
        </nav>
        <Link href="/profile" aria-label="Перейти в профиль" className="ml-auto flex gap-[14px] items-center text-[14px]">
          <img src="/assets/steam-icon-black.png" alt="Steam icon" width={31} height={31} />
          <span>Мой профиль</span>
          <span aria-hidden="true">→</span>
        </Link>
      </header>

      <main role="main" id="main-content" className="w-full max-w-[1600px] mx-auto px-[60px]">
        <section aria-labelledby="hero-heading" className="py-[100px_0_50px] flex justify-between gap-[40px] items-end">
          <div>
            <div className="text-[12px] tracking-[0.28em] uppercase text-[#8e959e] mb-4">DOTA 2 ESPORTS / PLATFORM</div>
            <h1 id="hero-heading" className="text-[64px] leading-[0.94] tracking-[-0.05em] mb-5">Платформа турниров Dota 2</h1>
            <p className="max-w-[680px] text-[17px] leading-[1.6] text-[#515b66]">Собирайте тиммейтов, регистрируйте команды на турниры и выходите в про-сцену Dota 2.</p>
          </div>
          <Link href="/api/auth/steam" className="btn btn-dark px-5 py-3 bg-[#111a23] text-white rounded-[11px] font-bold border-0 cursor-pointer min-h-[48px]">
            Войти через Steam
            <span aria-hidden="true"> →</span>
          </Link>
        </section>
      </main>

      <footer role="contentinfo" className="py-[50px_60px_60px] border-t border-[#e7e8e9] flex justify-between items-center text-[#7b838d] text-[10px] tracking-[0.16em] uppercase">
        <div>DOTA 2 ESPORTS / PLAY / COMPETE / GROW</div>
        <div>© 2024 Dota 2 Esports Platform</div>
      </footer>
    </div>
  );
}
