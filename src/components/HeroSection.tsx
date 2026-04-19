import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PRODUCTS, PARTS, SectionLabel, SectionTitle, HERO_BG } from "@/components/shared";

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

function ProductCard({ p, scrollTo }: { p: typeof import("@/components/shared").PRODUCTS[0]; scrollTo: (id: string) => void }) {
  const images = p.images || [];
  const [imgIdx, setImgIdx] = useState(0);
  return (
    <div className="group bg-iron border border-border hover:border-warning/50 transition-all duration-300 flex flex-col">
      <div className="relative bg-steel/40 h-48 steel-texture flex items-center justify-center overflow-hidden">
        {images.length > 0
          ? <img src={images[imgIdx]} alt={p.name} className="absolute inset-0 w-full h-full object-contain" />
          : <Icon name="Cog" size={80} className="text-border group-hover:text-steel transition-colors" />
        }
        {images.length > 1 && (
          <>
            <button onClick={() => setImgIdx((imgIdx - 1 + images.length) % images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-7 h-7 flex items-center justify-center transition-colors">
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button onClick={() => setImgIdx((imgIdx + 1) % images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-7 h-7 flex items-center justify-center transition-colors">
              <Icon name="ChevronRight" size={16} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1">
              {images.map((_, i) => (
                <button key={i} onClick={() => setImgIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIdx ? "bg-warning" : "bg-white/50"}`} />
              ))}
            </div>
          </>
        )}
        <div className={`absolute top-4 left-0 px-3 py-1 text-xs font-oswald font-bold tracking-wider z-10 ${p.tagColor}`}>{p.tag}</div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-oswald text-2xl font-bold text-foreground tracking-wide mb-2">{p.name}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5 font-plex flex-1">{p.desc}</p>
        <div className="border-t border-border pt-4 mb-5 grid grid-cols-3 gap-3">
          {[
            { label: "Мощность", val: p.power },
            { label: "Произв.", val: p.capacity },
            { label: "Масса", val: p.weight },
          ].map((spec) => (
            <div key={spec.label} className="text-center">
              <div className="font-mono text-sm font-bold text-warning">{spec.val}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 tracking-wider">{spec.label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="font-oswald text-xl font-bold text-foreground">{p.price}</div>
          <button
            onClick={() => scrollTo("contacts")}
            className="bg-warning text-black px-4 py-2 text-xs font-oswald font-bold tracking-wider uppercase hover:bg-amber-400 transition-colors"
          >
            Заказать
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
    <>
      {/* HERO */}
      <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-coal/60 via-coal/40 to-coal/30 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-warning" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-warning" />
              <span className="font-mono text-xs tracking-[0.3em] text-warning uppercase">ПРОМЫШЛЕННОЕ ОБОРУДОВАНИЕ</span>
            </div>

            <p className="animate-fade-in-up delay-200 text-chrome/80 text-lg leading-relaxed mb-10 max-w-lg font-plex">
              Садовые измельчители веток, рубительные машины, молотковые дробилки. Надёжность, качество, неприхотливость. Производство Россия. ИП Сухоруков Д.А.
            </p>

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

      {/* CATALOG */}
      <section id="catalog" className="py-24 bg-coal">
        <div className="max-w-7xl mx-auto px-4">
          <SectionLabel>Каталог оборудования</SectionLabel>
          <SectionTitle>Измельчители</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} p={p} scrollTo={scrollTo} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <button className="border border-warning/40 text-warning px-8 py-3 font-oswald font-bold tracking-wider uppercase text-sm hover:bg-warning/10 transition-colors">
              Весь каталог — 24 модели
            </button>
          </div>
        </div>
      </section>

      {/* PARTS */}
      <section id="parts" className="py-24 bg-iron steel-texture">
        <div className="max-w-7xl mx-auto px-4">
          <SectionLabel>Оригинальные детали</SectionLabel>
          <SectionTitle>Запчасти и<br />комплектующие</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTS.map((part) => (
              <div key={part.name} className="group border border-border bg-coal/60 p-5 hover:border-warning/40 hover:bg-coal/80 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-warning/50 transition-colors flex-shrink-0">
                    <Icon name={part.icon} size={18} className="text-warning" fallback="Wrench" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-oswald font-bold text-foreground text-base leading-tight mb-1">{part.name}</div>
                    <div className="text-xs text-muted-foreground font-mono mb-3">{part.material}</div>
                    <div className="flex items-center justify-between">
                      <span className="font-oswald font-bold text-warning text-sm">{part.price}</span>
                      <button
                        onClick={() => scrollTo("contacts")}
                        className="text-xs text-muted-foreground hover:text-warning font-mono tracking-wider transition-colors"
                      >
                        Заказать →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-coal border border-warning/20 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="font-oswald text-lg font-bold text-foreground">Не нашли нужную деталь?</div>
              <div className="text-sm text-muted-foreground font-plex mt-1">Закажем под артикул или пришлите фото — подберём аналог в течение часа</div>
            </div>
            <button
              onClick={() => scrollTo("contacts")}
              className="flex-shrink-0 bg-warning text-black px-6 py-3 font-oswald font-bold tracking-wider uppercase text-sm hover:bg-amber-400 transition-colors"
            >
              Запросить деталь
            </button>
          </div>
        </div>
      </section>

      {/* CONSUMABLES */}
      <section id="consumables" className="py-24 bg-coal">
        <div className="max-w-7xl mx-auto px-4">
          <SectionLabel>Регулярное обслуживание</SectionLabel>
          <SectionTitle>Расходные<br />материалы</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { name: "Смазки и масла (Shell, Mobil)", hint: "Для подшипников и приводов", price: "от 450 ₽/кг" },
                { name: "Фильтры воздушные и масляные", hint: "Оригинальные и аналоги", price: "от 280 ₽/шт" },
                { name: "Абразивные круги и диски", hint: "Для заточки ножей", price: "от 120 ₽/шт" },
                { name: "Крепёж специальный (DIN, ГОСТ)", hint: "Болты, гайки, шпильки М12–М42", price: "от 15 ₽/шт" },
                { name: "Средства защиты (СИЗ)", hint: "Перчатки, очки, беруши", price: "от 90 ₽" },
              ].map((c) => (
                <div key={c.name} className="flex items-center justify-between p-4 border border-border hover:border-warning/30 transition-colors bg-iron/40">
                  <div>
                    <div className="font-oswald font-bold text-sm text-foreground">{c.name}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">{c.hint}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm text-warning font-bold">{c.price}</div>
                    <button onClick={() => scrollTo("contacts")} className="text-xs text-muted-foreground hover:text-warning transition-colors mt-0.5">
                      Заказать →
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-iron border border-border p-8 flex flex-col justify-between steel-texture">
              <div>
                <div className="font-oswald text-3xl font-bold text-foreground mb-2 uppercase">Регламентное<br />обслуживание</div>
                <div className="w-12 h-1 bg-warning mb-6" />
                <p className="text-muted-foreground font-plex text-sm leading-relaxed mb-6">
                  Составим регламент ТО для вашего оборудования и обеспечим поставку всех расходников по графику — без простоев и сюрпризов.
                </p>
                <ul className="space-y-3">
                  {["Ежемесячная поставка по заявке", "Оплата по факту поставки", "Персональный менеджер", "Складской запас под ваш парк"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-chrome font-plex">
                      <div className="w-4 h-4 border border-warning/50 flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-warning" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => scrollTo("contacts")} className="mt-8 bg-warning text-black py-3 font-oswald font-bold tracking-wider uppercase text-sm hover:bg-amber-400 transition-colors w-full">
                Заключить договор на ТО
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}