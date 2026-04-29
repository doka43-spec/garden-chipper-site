import Icon from "@/components/ui/icon";
import { HERO_BG } from "@/components/shared";

export default function HomeHero() {
  return (
    <>
      {/* HERO — MOBILE: фото сверху, текст снизу */}
      <section id="home" className="md:hidden relative bg-coal overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-warning z-30" />

        {/* Соцсети поверх фото */}
        <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
          <a
            href="https://youtube.com/@vyatkalux"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
            aria-label="YouTube канал"
            className="flex items-center justify-center bg-red-900/60 text-white/80 w-9 h-9 rounded transition-colors shadow-lg"
          >
            <Icon name="Youtube" size={18} />
          </a>
          <a
            href="https://rutube.ru/channel/27535132/"
            target="_blank"
            rel="noopener noreferrer"
            title="Rutube"
            aria-label="Rutube канал"
            className="flex items-center justify-center bg-green-900/60 text-white/80 w-9 h-9 rounded transition-colors shadow-lg"
          >
            <Icon name="Play" size={18} />
          </a>
          <a
            href="https://wa.me/79123333225"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            aria-label="Написать в WhatsApp"
            className="flex items-center justify-center bg-green-700/70 text-white/90 w-9 h-9 rounded transition-colors shadow-lg"
          >
            <Icon name="MessageCircle" size={18} />
          </a>
          <a
            href="https://www.avito.ru/brands/i11837785"
            target="_blank"
            rel="noopener noreferrer"
            title="Avito"
            aria-label="Объявления на Avito"
            className="flex items-center justify-center bg-sky-700/70 text-white/90 w-9 h-9 rounded transition-colors shadow-lg font-bold text-xs"
          >
            A
          </a>
        </div>

        {/* Фото на 50% высоты экрана */}
        <div
          className="w-full h-[50vh] bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />

        {/* Текстовый блок */}
        <div className="px-5 py-8">
          <div className="animate-fade-in-up flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-warning" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-warning uppercase">Промышленное оборудование</span>
          </div>

          <div className="animate-fade-in-up delay-200 text-chrome/85 text-base leading-relaxed mb-5 font-plex flex flex-col gap-0.5">
            <span>Садовые измельчители веток,</span>
            <span>рубительные машины,</span>
            <span>молотковые дробилки.</span>
            <span className="flex items-center gap-1.5 font-oswald text-2xl font-bold text-warning tracking-widest mt-2">
              Rubitel
              <span className="border border-warning rounded-full w-4 h-4 flex items-center justify-center leading-none font-bold text-warning" style={{fontSize: '9px'}}>R</span>
            </span>
          </div>

          <div className="animate-fade-in-up delay-400 grid grid-cols-2 gap-4">
            {[
              { val: "15+", label: "лет на рынке" },
              { val: "800+", label: "единиц продано" },
              { val: "98%", label: "клиентов довольны" },
              { val: "1 год", label: "гарантия" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-oswald text-2xl font-bold text-warning leading-none">{s.val}</div>
                <div className="text-[11px] text-muted-foreground font-mono mt-1 tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 warning-stripe opacity-60" />
      </section>

      {/* HERO — DESKTOP: оригинальная версия */}
      <section className="hidden md:flex relative min-h-[92vh] items-center overflow-hidden bg-coal">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-coal/90 via-coal/60 to-transparent z-10" />
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-[60%_center] md:bg-[length:75%]"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse 40% 60% at 85% 45%, rgba(0,0,0,0.55) 0%, transparent 100%)'}} />
        <div className="absolute inset-0" style={{background: 'linear-gradient(to left, #111111 0%, #111111 4%, transparent 22%)'}} />
        <div className="absolute inset-0" style={{background: 'linear-gradient(to right, #111111 0%, #111111 3%, transparent 25%)'}} />

        <div className="absolute top-0 left-0 right-0 h-1 bg-warning" />

        <div className="absolute top-6 right-6 z-30 flex flex-row gap-2">
          <a
            href="https://youtube.com/@vyatkalux"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
            aria-label="YouTube канал"
            className="flex items-center justify-center bg-red-900/50 hover:bg-red-700/70 text-white/70 hover:text-white w-10 h-10 rounded transition-colors shadow-lg"
          >
            <Icon name="Youtube" size={18} />
          </a>
          <a
            href="https://rutube.ru/channel/27535132/"
            target="_blank"
            rel="noopener noreferrer"
            title="Rutube"
            aria-label="Rutube канал"
            className="flex items-center justify-center bg-green-900/50 hover:bg-green-700/70 text-white/70 hover:text-white w-10 h-10 rounded transition-colors shadow-lg"
          >
            <Icon name="Play" size={18} />
          </a>
          <a
            href="https://wa.me/79123333225"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            aria-label="Написать в WhatsApp"
            className="flex items-center justify-center bg-green-700/60 hover:bg-green-600/80 text-white/80 hover:text-white w-10 h-10 rounded transition-colors shadow-lg"
          >
            <Icon name="MessageCircle" size={18} />
          </a>
          <a
            href="https://www.avito.ru/brands/i11837785"
            target="_blank"
            rel="noopener noreferrer"
            title="Avito"
            aria-label="Объявления на Avito"
            className="flex items-center justify-center bg-sky-700/60 hover:bg-sky-600/80 text-white/80 hover:text-white w-10 h-10 rounded transition-colors shadow-lg font-bold text-sm"
          >
            A
          </a>
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 pl-16 py-20">
          <div className="max-w-sm lg:max-w-md">
            <div className="animate-fade-in-up flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-warning" />
              <span className="font-mono text-xs tracking-[0.3em] text-warning uppercase">ПРОМЫШЛЕННОЕ ОБОРУДОВАНИЕ</span>
            </div>

            <div className="animate-fade-in-up delay-200 text-chrome/80 text-lg leading-relaxed mb-6 max-w-lg font-plex flex flex-col gap-1">
              <span>Садовые измельчители веток,</span>
              <span>рубительные машины,</span>
              <span>молотковые дробилки.</span>
              <span className="flex items-center gap-1.5 font-oswald text-2xl font-bold text-warning tracking-widest">
                Rubitel
                <span className="text-xs border border-warning rounded-full w-4 h-4 flex items-center justify-center leading-none font-bold text-warning" style={{fontSize: '9px'}}>R</span>
              </span>
              <span>Производство Россия.</span>
              <span>ИП Сухоруков Д.А.</span>
              <span className="text-xs text-foreground/60">ОГРНИП 319435000055688 от 17.12.2019г</span>
            </div>

            <div className="animate-fade-in-up delay-400 mt-14 flex flex-wrap gap-8">
              {[
                { val: "15+", label: "лет на рынке" },
                { val: "800+", label: "единиц продано" },
                { val: "98%", label: "клиентов довольны" },
                { val: "1 год", label: "гарантия" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-oswald text-3xl font-bold text-warning/60 leading-none">{s.val}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1 tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 warning-stripe opacity-60" />
      </section>
    </>
  );
}