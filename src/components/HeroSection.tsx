import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { PRODUCTS, PARTS, SectionLabel, SectionTitle, HERO_BG } from "@/components/shared";

const YOKASSA_URL = "https://functions.poehali.dev/5adaba0c-589d-426d-83f4-a4673a8e2f51";

async function payWithYokassa(amount: number, description: string, email: string, phone: string) {
  const res = await fetch(YOKASSA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      description,
      email: email || undefined,
      phone: phone || undefined,
      return_url: "https://rubitel.ru",
    }),
  });
  const data = await res.json();
  if (data.confirmation_url) {
    window.location.href = data.confirmation_url;
  } else {
    alert("Ошибка при создании платежа. Попробуйте позже.");
  }
}

function PayButton({ amount, description }: { amount: number; description: string }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handlePay = async () => {
    const hasEmail = email && email.includes("@");
    const hasPhone = phone && phone.replace(/\D/g, "").length >= 10;
    if (!hasEmail && !hasPhone) {
      alert("Введите email или телефон для получения чека");
      return;
    }
    setLoading(true);
    setShowModal(false);
    await payWithYokassa(amount, description, email, phone);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 text-xs font-oswald font-bold tracking-wider uppercase hover:bg-green-500 transition-colors disabled:opacity-60"
      >
        {loading ? "..." : "Оплатить"}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowModal(false)}>
          <div className="bg-white text-black p-6 w-80 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="font-oswald font-bold text-lg mb-1">Оплата</div>
            <div className="text-sm text-gray-600 mb-4">Укажите email или телефон — на него придёт чек</div>
            <input
              type="email"
              placeholder="Email (your@email.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-sm mb-2 outline-none focus:border-green-600"
              autoFocus
            />
            <div className="text-xs text-center text-gray-400 mb-2">или</div>
            <input
              type="tel"
              placeholder="Телефон (+7 900 000 00 00)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePay()}
              className="w-full border border-gray-300 px-3 py-2 text-sm mb-4 outline-none focus:border-green-600"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-xs text-gray-500 hover:text-black transition-colors">
                Отмена
              </button>
              <button onClick={handlePay} className="bg-green-600 text-white px-4 py-2 text-xs font-oswald font-bold uppercase hover:bg-green-500 transition-colors">
                Перейти к оплате
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

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
        {p.videoUrl && (
          <a href={p.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-warning font-mono tracking-wider transition-colors mb-2">
            <Icon name="PlayCircle" size={16} className="text-warning" />
            {p.videoUrl.includes("youtube") ? "Смотреть видео на YouTube" : "Смотреть видео на Rutube"}
          </a>
        )}
        {p.videoUrl2 && (
          <a href={p.videoUrl2} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-warning font-mono tracking-wider transition-colors mb-4">
            <Icon name="PlayCircle" size={16} className="text-warning" />
            {p.videoUrl2.includes("youtube") ? "Смотреть видео на YouTube" : "Смотреть видео на Rutube"}
          </a>
        )}
        <div className="flex flex-col gap-2">
          <div className="font-oswald text-base font-bold text-foreground">{p.price}</div>
          <div className="flex gap-2 flex-wrap">
            <Link
              to={`/product/${p.slug}`}
              className="border border-warning/50 text-warning px-3 py-2 text-xs font-oswald font-bold tracking-wider uppercase hover:bg-warning/10 transition-colors"
            >
              Подробнее
            </Link>
            <button
              onClick={() => scrollTo("contacts")}
              className="bg-warning text-black px-4 py-2 text-xs font-oswald font-bold tracking-wider uppercase hover:bg-amber-400 transition-colors"
            >
              Заказать
            </button>
            {p.slug === "rubitel-s" && (
              <PayButton amount={45000} description={`${p.name} — садовый измельчитель веток`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PartCard({ part, scrollTo }: { part: typeof import("@/components/shared").PARTS[0]; scrollTo: (id: string) => void }) {
  const images = part.images || [];
  const [imgIdx, setImgIdx] = useState(0);
  return (
    <div className="group border border-border bg-coal/60 hover:border-warning/40 hover:bg-coal/80 transition-all cursor-pointer flex flex-col">
      {images.length > 0 && (
        <div className="relative h-56 bg-steel/10 overflow-hidden flex-shrink-0">
          <img src={images[imgIdx]} alt={part.name} className="absolute inset-0 w-full h-full object-contain p-2" />
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); setImgIdx((imgIdx - 1 + images.length) % images.length); }} className="absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-6 h-6 flex items-center justify-center transition-colors">
                <Icon name="ChevronLeft" size={14} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setImgIdx((imgIdx + 1) % images.length); }} className="absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-6 h-6 flex items-center justify-center transition-colors">
                <Icon name="ChevronRight" size={14} />
              </button>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20 flex gap-1">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIdx ? "bg-warning" : "bg-white/50"}`} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start gap-4">
          {images.length === 0 && (
            <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-warning/50 transition-colors flex-shrink-0">
              <Icon name={part.icon} size={18} className="text-warning" fallback="Wrench" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="font-oswald font-bold text-foreground text-base leading-tight mb-1">{part.name}</div>
            <div className="text-xs text-muted-foreground font-mono mb-3">{part.material}</div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-oswald font-bold text-warning text-sm">{part.price}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => scrollTo("contacts")} className="text-xs text-muted-foreground hover:text-warning font-mono tracking-wider transition-colors">
                  Заказать →
                </button>
                <PayButton
                  amount={part.name.includes("Rubitel-X") ? 5000 : 2700}
                  description={part.name}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  const [catalogExpanded, setCatalogExpanded] = useState(false);
  const [partsExpanded, setPartsExpanded] = useState(false);

  const visibleProducts = !catalogExpanded ? PRODUCTS.slice(0, 3) : PRODUCTS;
  const visibleParts = !partsExpanded ? PARTS.slice(0, 3) : PARTS;

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

        <div className="flex absolute top-6 right-6 z-30 flex-col gap-2">
          <a
            href="https://youtube.com/@vyatkalux"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
            className="flex items-center justify-center bg-red-900/70 hover:bg-red-600 text-white/80 w-7 h-7 md:w-10 md:h-10 rounded transition-colors shadow-lg md:bg-red-600 md:hover:bg-red-500 md:text-white"
          >
            <Icon name="Youtube" size={14} />
          </a>
          <a
            href="https://rutube.ru/channel/27535132/"
            target="_blank"
            rel="noopener noreferrer"
            title="Rutube"
            className="flex items-center justify-center bg-green-900/70 hover:bg-green-700 text-white/80 w-7 h-7 md:w-10 md:h-10 rounded transition-colors shadow-lg md:bg-green-700 md:hover:bg-green-600 md:text-white"
          >
            <Icon name="Play" size={14} />
          </a>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-2xl">
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

      {/* CATALOG */}
      <section id="catalog" className="py-24 bg-coal">
        <div className="max-w-7xl mx-auto px-4">
          <SectionLabel>Каталог оборудования</SectionLabel>
          <SectionTitle>Измельчители</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            {visibleProducts.map((p) => (
              <ProductCard key={p.id} p={p} scrollTo={scrollTo} />
            ))}
          </div>
          <div className="mt-8 text-center flex flex-col items-center gap-3">
            {!catalogExpanded && PRODUCTS.length > 3 && (
              <button
                onClick={() => setCatalogExpanded(true)}
                className="w-full md:w-auto border border-warning text-warning px-8 py-3 font-oswald font-bold tracking-wider uppercase text-sm hover:bg-warning/10 transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="ChevronDown" size={16} />
                Показать все модели ({PRODUCTS.length - 3} ещё)
              </button>
            )}
            {catalogExpanded && (
              <button
                onClick={() => setCatalogExpanded(false)}
                className="w-full md:w-auto border border-border text-muted-foreground px-8 py-3 font-oswald font-bold tracking-wider uppercase text-sm hover:bg-warning/10 transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="ChevronUp" size={16} />
                Свернуть
              </button>
            )}

          </div>
        </div>
      </section>

      {/* PARTS */}
      <section id="parts" className="py-24 bg-iron steel-texture">
        <div className="max-w-7xl mx-auto px-4">
          <SectionLabel>Оригинальные детали</SectionLabel>
          <SectionTitle>Запчасти и<br />комплектующие</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleParts.map((part) => (
              <PartCard key={part.name} part={part} scrollTo={scrollTo} />
            ))}
          </div>
          {!partsExpanded && PARTS.length > 3 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setPartsExpanded(true)}
                className="w-full md:w-auto border border-warning text-warning px-8 py-3 font-oswald font-bold tracking-wider uppercase text-sm hover:bg-warning/10 transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <Icon name="ChevronDown" size={16} />
                Показать все запчасти ({PARTS.length - 3} ещё)
              </button>
            </div>
          )}
          {partsExpanded && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setPartsExpanded(false)}
                className="w-full md:w-auto border border-border text-muted-foreground px-8 py-3 font-oswald font-bold tracking-wider uppercase text-sm hover:bg-warning/10 transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <Icon name="ChevronUp" size={16} />
                Свернуть
              </button>
            </div>
          )}
        </div>
      </section>


    </>
  );
}