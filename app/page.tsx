import Link from 'next/link';

export default function Home() {
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
          <Link href="/" aria-current="page" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Главная</Link>
          <Link href="/tournaments" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Турниры</Link>
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
        <section aria-labelledby="hero-heading" className="py-[120px_0_80px] flex justify-between gap-[40px] items-end">
          <div>
            <div className="text-[12px] tracking-normal uppercase text-[#a8b3c0] mb-4">DOTA 2 ESPORTS / PLATFORM</div>
            <h1 id="hero-heading" className="text-[48px] leading-tight tracking-tight mb-6">Платформа турниров Dota 2</h1>
            <p className="max-w-[680px] text-[18px] leading-relaxed text-[#a8b3c0]">Собирайте тиммейтов, регистрируйте команды на турниры и выходите в про-сцену Dota 2.</p>
          </div>
          <Link href="/api/auth/steam" className="btn btn-dark px-6 py-3 text-white rounded-[6px] font-semibold border-0 cursor-pointer min-h-[44px]">
            Войти через Steam
            <span aria-hidden="true"> →</span>
          </Link>
        </section>
      </main>

      <footer role="contentinfo" className="py-[48px_32px_32px] border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center text-[#6b7683] text-[10px] tracking-normal uppercase">
        <div>DOTA 2 ESPORTS / PLAY / COMPETE / GROW</div>
        <div>© 2024 Dota 2 Esports Platform</div>
      </footer>
    </div>
  );
}
