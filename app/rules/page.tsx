import Link from 'next/link';

export const metadata = {
  title: "Правила",
  description: "Правила и регламент турниров на платформе Dota 2 Esports."
};

export default function RulesPage() {
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
          <Link href="/players" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Игроки</Link>
          <Link href="/rules" aria-current="page" className="h-full flex items-center text-[14px] text-[#a8b3c0]">Правила</Link>
        </nav>
        <Link href="/profile" aria-label="Перейти в профиль" className="ml-auto flex gap-[12px] items-center text-[14px]">
          <img src="/assets/steam-icon-black.png" alt="Steam icon" width={31} height={31} />
          <span>Мой профиль</span>
          <span aria-hidden="true">→</span>
        </Link>
      </header>

      <main role="main" id="main-content" className="w-full max-w-[1600px] mx-auto px-[32px]">
        <section aria-labelledby="rules-heading" className="py-[120px_0_80px]">
          <div className="text-[12px] tracking-normal uppercase text-[#a8b3c0] mb-4">DOTA 2 ESPORTS / RULES</div>
          <h1 id="rules-heading" className="text-[48px] leading-tight tracking-tight mb-6">Правила платформы</h1>
          <p className="max-w-[680px] text-[18px] leading-relaxed text-[#a8b3c0]">Правила и регламент турниров на платформе Dota 2 Esports.</p>
        </section>

        <section aria-labelledby="general-rules-heading" className="bg-[#141a23] border border-[rgba(255,255,255,0.08)] rounded-[8px] p-12 mb-10">
          <h2 id="general-rules-heading" className="text-[24px] font-bold tracking-tight mb-6">Общие правила</h2>
          <div className="text-[14px] leading-relaxed text-[#a8b3c0] space-y-4">
            <p>Честная игра обязательна.</p>
            <p>Читы, боты и сторонний софт запрещены.</p>
            <p>Участники должны быть авторизованы через Steam для участия в турнирах.</p>
            <p>Команды должны состоять из 5-6 игроков, все из которых должны быть зарегистрированы на платформе.</p>
          </div>
        </section>

        <section aria-labelledby="tournament-rules-heading" className="bg-[#141a23] border border-[rgba(255,255,255,0.08)] rounded-[8px] p-12 mb-10">
          <h2 id="tournament-rules-heading" className="text-[24px] font-bold tracking-tight mb-6">Правила турниров</h2>
          <div className="text-[14px] leading-relaxed text-[#a8b3c0] space-y-4">
            <p>Турниры проводятся в формате 5v5.</p>
            <p>К матчу нужно быть готовым за 15 минут.</p>
            <p>В случае неявки команды без уважительной причины, команда может быть дисквалифицирована.</p>
            <p>Споры решает администрация.</p>
          </div>
        </section>

        <section aria-labelledby="sanctions-heading" className="bg-[#141a23] border border-[rgba(255,255,255,0.08)] rounded-[8px] p-12">
          <h2 id="sanctions-heading" className="text-[24px] font-bold tracking-tight mb-6">Санкции</h2>
          <div className="text-[14px] leading-relaxed text-[#a8b3c0] space-y-4">
            <p>За нарушение правил участники могут получить предупреждение, временную или постоянную блокировку.</p>
            <p>Санкции назначает администрация.</p>
            <p>Апелляция подается в течение 7 дней.</p>
          </div>
        </section>
      </main>

      <footer role="contentinfo" className="py-[48px_32px_32px] border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center text-[#6b7683] text-[10px] tracking-normal uppercase">
        <div>DOTA 2 ESPORTS / PLAY / COMPETE / GROW</div>
        <div>© 2024 Dota 2 Esports Platform</div>
      </footer>
    </div>
  );
}
