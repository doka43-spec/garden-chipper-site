import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { PRODUCTS, PARTS, SectionLabel, SectionTitle, HERO_BG } from "@/components/shared";

const YOKASSA_URL = "/pay.php";

async function payWithYokassa(amount: number, description: string, email: string, phone: string, quantity: number = 1) {
  try {
    const res = await fetch(YOKASSA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        description,
        email: email || undefined,
        phone: phone || undefined,
        return_url: "https://rubitel.ru",
        quantity,
      }),
    });
    const text = await res.text();
    let data: { confirmation_url?: string; error?: string } = {};
    try { data = JSON.parse(text); } catch { data = { error: text.slice(0, 200) }; }

    if (data.confirmation_url) {
      window.location.href = data.confirmation_url;
    } else {
      const reason = data.error || `HTTP ${res.status}`;
      alert("Ошибка оплаты: " + reason);
    }
  } catch (e) {
    alert("Сеть недоступна: " + (e instanceof Error ? e.message : "unknown"));
  }
}

function PayButton({ amount, description, showQty = false }: { amount: number; description: string; showQty?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qty, setQty] = useState(1);

  const totalAmount = amount * qty;

  const handlePay = async () => {
    const hasEmail = email && email.includes("@");
    const hasPhone = phone && phone.replace(/\D/g, "").length >= 10;
    if (!hasEmail && !hasPhone) {
      alert("Введите email или телефон для получения чека");
      return;
    }
    setLoading(true);
    setShowModal(false);
    await payWithYokassa(totalAmount, description, email, phone, qty);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => { setQty(1); setShowModal(true); }}
        disabled={loading}
        className="bg-green-800 text-white px-4 py-2 text-xs font-oswald font-bold tracking-wider uppercase hover:bg-green-700 transition-colors disabled:opacity-60"
      >
        {loading ? "..." : "Оплатить"}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowModal(false)}>
          <div className="bg-white text-black p-6 w-80 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="font-oswald font-bold text-lg mb-1">Оплата</div>

            {showQty && (
              <div className="flex items-center justify-between mb-4 border border-gray-200 p-3">
                <span className="text-sm text-gray-600">Количество комплектов</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-7 h-7 border border-gray-300 flex items-center justify-center text-lg font-bold hover:border-green-600 transition-colors">−</button>
                  <span className="font-oswald font-bold text-base w-4 text-center">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-7 h-7 border border-gray-300 flex items-center justify-center text-lg font-bold hover:border-green-600 transition-colors">+</button>
                </div>
              </div>
            )}

            {showQty && (
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">Итого:</span>
                <span className="font-oswald font-bold text-green-600 text-base">{totalAmount.toLocaleString("ru-RU")} ₽</span>
              </div>
            )}

            <div className="text-sm text-gray-600 mb-3">Укажите email или телефон — на него придёт чек</div>
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
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "");
                if (val.startsWith("8")) val = "7" + val.slice(1);
                if (!val.startsWith("7")) val = "7" + val;
                val = val.slice(0, 11);
                let formatted = "+7";
                if (val.length > 1) formatted += " (" + val.slice(1, 4);
                if (val.length >= 4) formatted += ") " + val.slice(4, 7);
                if (val.length >= 7) formatted += "-" + val.slice(7, 9);
                if (val.length >= 9) formatted += "-" + val.slice(9, 11);
                setPhone(formatted);
              }}
              onFocus={() => { if (!phone) setPhone("+7 "); }}
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
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      setImgIdx((prev) => delta > 0 ? (prev + 1) % images.length : (prev - 1 + images.length) % images.length);
    }
    touchStartX.current = null;
  };

  return (
    <div className="group bg-iron border border-border hover:border-warning/50 transition-all duration-300 flex flex-col">
      <div className="relative bg-steel/40 h-48 steel-texture flex items-center justify-center overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {images.length > 0 ? (
          <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${imgIdx * 100}%)` }}>
            {images.map((src, i) => (
              <img key={i} src={src} alt={`${p.name} ${i + 1}`} loading="lazy" className="w-full h-full object-contain flex-shrink-0" />
            ))}
          </div>
        ) : (
          <Icon name="Cog" size={80} className="text-border group-hover:text-steel transition-colors" />
        )}
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
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      setImgIdx((prev) => delta > 0 ? (prev + 1) % images.length : (prev - 1 + images.length) % images.length);
    }
    touchStartX.current = null;
  };

  return (
    <div className="group border border-border bg-coal/60 hover:border-warning/40 hover:bg-coal/80 transition-all cursor-pointer flex flex-col">
      {images.length > 0 && (
        <div className="relative h-56 bg-steel/10 overflow-hidden flex-shrink-0" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${imgIdx * 100}%)` }}>
            {images.map((src, i) => (
              <img key={i} src={src} alt={`${part.name} ${i + 1}`} loading="lazy" className="w-full h-full object-contain p-2 flex-shrink-0" />
            ))}
          </div>
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
                  amount={part.priceValue}
                  description={part.name}
                  showQty={part.name.includes("Ножи")}
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
      <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden bg-coal">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-coal/90 via-coal/60 to-transparent z-10" />
        <div
          className="absolute inset-0 bg-no-repeat bg-[length:160%] bg-[60%_30%] md:bg-cover md:bg-[60%_center] md:bg-[length:75%]"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 hidden md:block" style={{background: 'radial-gradient(ellipse 40% 60% at 85% 45%, rgba(0,0,0,0.55) 0%, transparent 100%)'}} />
        <div className="absolute inset-0 hidden md:block" style={{background: 'linear-gradient(to left, #111111 0%, #111111 4%, transparent 22%)'}} />
        <div className="absolute inset-0 hidden md:block" style={{background: 'linear-gradient(to right, #111111 0%, #111111 3%, transparent 25%)'}} />

        <div className="absolute top-0 left-0 right-0 h-1 bg-warning" />

        <div className="flex absolute top-6 right-6 z-30 flex-col md:flex-row gap-2">
          <a
            href="https://youtube.com/@vyatkalux"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
            className="flex items-center justify-center bg-red-900/50 hover:bg-red-700/70 text-white/70 hover:text-white w-9 h-9 md:w-10 md:h-10 rounded transition-colors shadow-lg"
          >
            <Icon name="Youtube" size={18} />
          </a>
          <a
            href="https://rutube.ru/channel/27535132/"
            target="_blank"
            rel="noopener noreferrer"
            title="Rutube"
            className="flex items-center justify-center bg-green-900/50 hover:bg-green-700/70 text-white/70 hover:text-white w-9 h-9 md:w-10 md:h-10 rounded transition-colors shadow-lg"
          >
            <Icon name="Play" size={18} />
          </a>
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:pl-16 py-10 md:py-20">
          <div className="max-w-xs md:max-w-sm lg:max-w-md">
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
              <span className="hidden md:inline">Производство Россия.</span>
              <span className="hidden md:inline">ИП Сухоруков Д.А.</span>
              <span className="hidden md:inline text-xs text-foreground/60">ОГРНИП 319435000055688 от 17.12.2019г</span>
            </div>



            <div className="animate-fade-in-up delay-400 mt-6 md:mt-14 flex flex-wrap gap-6 md:gap-8">
              {[
                { val: "15+", label: "лет на рынке" },
                { val: "800+", label: "единиц продано" },
                { val: "98%", label: "клиентов довольны" },
                { val: "1 год", label: "гарантия" },

              ].map((s) => (
                <div key={s.label}>
                  <div className="font-oswald text-2xl md:text-3xl font-bold text-warning/60 leading-none">{s.val}</div>
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