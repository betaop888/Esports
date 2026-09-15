import Link from 'next/link';

export const metadata = {
  title: "Правила",
  description: "Правила и регламент турниров на платформе Dota 2 Esports."
};

export default function RulesPage() {
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
          <Link href="/players" className="h-full flex items-center text-[14px] text-[#262d35]">Игроки</Link>
          <Link href="/rules" aria-current="page" className="h-full flex items-center text-[14px] text-[#262d35]">Правила</Link>
        </nav>
        <Link href="/profile" aria-label="Перейти в профиль" className="ml-auto flex gap-[14px] items-center text-[14px]">
          <img src="/assets/steam-icon-black.png" alt="Steam icon" width={31} height={31} />
          <span>Мой профиль</span>
          <span aria-hidden="true">→</span>
        </Link>
      </header>

      <main role="main" id="main-content" className="w-full max-w-[1600px] mx-auto px-[60px]">
        <section aria-labelledby="rules-heading" className="py-[100px_0_50px]">
          <div className="text-[12px] tracking-[0.28em] uppercase text-[#8e959e] mb-4">DOTA 2 ESPORTS / RULES</div>
          <h1 id="rules-heading" className="text-[64px] leading-[0.94] tracking-[-0.05em] mb-5">Правила платформы</h1>
          <p className="max-w-[680px] text-[17px] leading-[1.6] text-[#515b66]">Правила и регламент турниров на платформе Dota 2 Esports.</p>
        </section>

        <section aria-labelledby="general-rules-heading" className="bg-white border border-[#e7e8e9] rounded-[14px] p-12 mb-10">
          <h2 id="general-rules-heading" className="text-[28px] font-bold tracking-[-0.03em] mb-9">Общие правила</h2>
          <div className="text-[14px] leading-[1.8] text-[#49535d] space-y-4">
            <p>Все участники обязаны соблюдать правила честной игры и спортивного поведения.</p>
            <p>Запрещено использование читов, ботов и любых сторонних программ, дающих несправедливое преимущество.</p>
            <p>Участники должны быть авторизованы через Steam для участия в турнирах.</p>
            <p>Команды должны состоять из 5-6 игроков, все из которых должны быть зарегистрированы на платформе.</p>
          </div>
        </section>

        <section aria-labelledby="tournament-rules-heading" className="bg-white border border-[#e7e8e9] rounded-[14px] p-12 mb-10">
          <h2 id="tournament-rules-heading" className="text-[28px] font-bold tracking-[-0.03em] mb-9">Правила турниров</h2>
          <div className="text-[14px] leading-[1.8] text-[#49535d] space-y-4">
            <p>Турниры проводятся в формате 5v5.</p>
            <p>Все участники должны быть готовы к началу матча за 15 минут до назначенного времени.</p>
            <p>В случае неявки команды без уважительной причины, команда может быть дисквалифицирована.</p>
            <p>Спорные ситуации решаются администрацией платформы.</p>
          </div>
        </section>

        <section aria-labelledby="sanctions-heading" className="bg-white border border-[#e7e8e9] rounded-[14px] p-12">
          <h2 id="sanctions-heading" className="text-[28px] font-bold tracking-[-0.03em] mb-9">Санкции</h2>
          <div className="text-[14px] leading-[1.8] text-[#49535d] space-y-4">
            <p>За нарушение правил участники могут получить предупреждение, временную или постоянную блокировку.</p>
            <p>Решение о санкциях принимает администрация платформы.</p>
            <p>Участники имеют право обжаловать решение в течение 7 дней.</p>
          </div>
        </section>
      </main>

      <footer role="contentinfo" className="py-[50px_60px_60px] border-t border-[#e7e8e9] flex justify-between items-center text-[#7b838d] text-[10px] tracking-[0.16em] uppercase">
        <div>DOTA 2 ESPORTS / PLAY / COMPETE / GROW</div>
        <div>© 2024 Dota 2 Esports Platform</div>
      </footer>
    </div>
  );
}
