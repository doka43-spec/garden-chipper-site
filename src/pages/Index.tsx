import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS, LOGO_URL, LOGO_FILTER } from "@/components/shared";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";

export default function Index() {
  const [activeNav, setActiveNav] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    setActiveNav(id);
    setMobileOpen(false);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-coal text-foreground">
      {/* TOP BAR */}
      <div className="border-b border-border bg-iron steel-texture">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-6 text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1.5">
              <Icon name="Phone" size={11} />
              +7 (912) 333-32-25
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Icon name="Clock" size={11} />
              Пн–Пт 8:00–18:00
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
            <span className="text-warning animate-pulse-border">● ОНЛАЙН</span>
            <span className="hidden md:block">vyatkalux@yandex.ru</span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-iron border-b border-border shadow-lg shadow-black/40">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
            <img
              src="https://cdn.jsdelivr.net/gh/doka43-spec/rubitel-images/logo.png"
              alt="Rubitel"
              className="w-9 h-9 object-contain"
              style={{ filter: "invert(78%) sepia(60%) saturate(1000%) hue-rotate(350deg) brightness(100%) contrast(95%)" }}
            />
            <div>
              <div className="font-oswald text-lg font-bold text-foreground tracking-wider leading-none flex items-center gap-1">
                Rubitel
                <span className="border border-white/70 rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none font-bold text-white/70" style={{fontSize: '8px'}}>R</span>
              </div>
              <div className="text-[10px] text-muted-foreground font-mono tracking-[0.2em]">INDUSTRIAL EQUIPMENT</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-2 text-xs font-oswald tracking-wider uppercase transition-all ${
                  activeNav === item.id ? "text-warning border-b-2 border-warning" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("contacts")}
              className="hidden md:flex items-center gap-2 bg-warning/55 text-black px-4 py-2 text-xs font-oswald font-bold tracking-wider uppercase hover:bg-warning/80 transition-colors"
            >
              <Icon name="Phone" size={13} />
              Заказать звонок
            </button>
            <button className="lg:hidden p-2 text-muted-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
              <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-iron">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full text-left px-6 py-3.5 text-sm font-oswald tracking-wider uppercase text-muted-foreground hover:text-warning hover:bg-steel/30 transition-colors border-b border-border/50"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <HeroSection scrollTo={scrollTo} />
      <AboutSection scrollTo={scrollTo} />
      <ReviewsSection scrollTo={scrollTo} />
    </div>
  );
}