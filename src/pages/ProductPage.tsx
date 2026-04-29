import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { PRODUCTS } from "@/components/shared";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS.find((p) => p.slug === slug);

  const [imgIdx, setImgIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent, length: number) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      setImgIdx((prev) => delta > 0 ? (prev + 1) % length : (prev - 1 + length) % length);
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    if (!product) return;
    const prevTitle = document.title;
    document.title = product.seoTitle;

    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", product.seoDescription);
    setMeta("og:title", product.seoTitle, true);
    setMeta("og:description", product.seoDescription, true);
    setMeta("og:url", `https://rubitel.ru/product/${product.slug}`, true);
    setMeta("og:image", product.images?.[0] ?? "", true);
    setMeta("twitter:title", product.seoTitle);
    setMeta("twitter:description", product.seoDescription);

    let canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    const prevCanonical = canonical?.href ?? "";
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://rubitel.ru/product/${product.slug}`;

    const priceNum = product.price.replace(/\D/g, "");
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.seoDescription,
      "image": product.images ?? [],
      "brand": { "@type": "Brand", "name": "RUBITEL" },
      "offers": {
        "@type": "Offer",
        "url": `https://rubitel.ru/product/${product.slug}`,
        "priceCurrency": "RUB",
        "price": priceNum,
        "priceValidUntil": "2027-01-01",
        "availability": "https://schema.org/InStock",
        "seller": { "@type": "Organization", "name": "RUBITEL" }
      },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Мощность", "value": product.power },
        { "@type": "PropertyValue", "name": "Производительность", "value": product.capacity },
        { "@type": "PropertyValue", "name": "Масса", "value": product.weight },
      ]
    };

    let ldScript = document.querySelector<HTMLScriptElement>("script[data-product-ld]");
    if (!ldScript) {
      ldScript = document.createElement("script");
      ldScript.type = "application/ld+json";
      ldScript.setAttribute("data-product-ld", "true");
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify(jsonLd);

    return () => {
      document.title = prevTitle;
      if (canonical) canonical.href = prevCanonical;
      ldScript?.remove();
    };
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-coal text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="font-oswald text-4xl font-bold text-warning mb-4">404</div>
          <div className="text-muted-foreground mb-6">Продукт не найден</div>
          <Link to="/" className="bg-warning text-black px-6 py-3 font-oswald font-bold tracking-wider uppercase text-sm hover:bg-amber-400 transition-colors">
            На главную
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [];
  const otherProducts = PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <div className="min-h-screen bg-coal text-foreground">
      {/* TOP BAR */}
      <div className="border-b border-border bg-iron steel-texture">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-6 text-xs text-muted-foreground font-mono">
            <a href="tel:+79123333225" aria-label="Позвонить +7 (912) 333-32-25" className="flex items-center gap-1.5 hover:text-warning transition-colors">
              <Icon name="Phone" size={11} />
              +7 (912) 333-32-25
            </a>
            <span className="hidden md:flex items-center gap-1.5">
              <Icon name="Clock" size={11} />
              Пн–Пт 8:00–18:00
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
            <span className="text-warning animate-pulse-border">● ОНЛАЙН</span>
            <a href="mailto:vyatkalux@yandex.ru" aria-label="Написать на почту" className="hidden md:block hover:text-warning transition-colors">vyatkalux@yandex.ru</a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-iron border-b border-border shadow-lg shadow-black/40">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://cdn.jsdelivr.net/gh/doka43-spec/rubitel-images/logo.png"
              alt="Rubitel"
              className="w-9 h-9 object-contain"
              style={{ filter: "invert(78%) sepia(60%) saturate(1000%) hue-rotate(350deg) brightness(100%) contrast(95%)" }}
            />
            <div>
              <div className="font-oswald text-lg font-bold text-foreground tracking-wider leading-none flex items-center gap-1">
                Rubitel
                <span className="border border-white/70 rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none font-bold text-white/70" style={{ fontSize: "8px" }}>R</span>
              </div>
              <div className="text-[10px] text-muted-foreground font-mono tracking-[0.2em]">INDUSTRIAL EQUIPMENT</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Link to="/" className="hover:text-warning transition-colors">Главная</Link>
            <span>/</span>
            <Link to="/#catalog" className="hover:text-warning transition-colors">Каталог</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <Link
            to="/#contacts"
            className="hidden md:flex items-center gap-2 bg-warning text-black px-5 py-2.5 text-xs font-oswald font-bold tracking-wider uppercase hover:bg-amber-400 transition-colors"
          >
            <Icon name="Phone" size={13} />
            Заказать звонок
          </Link>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="border-b border-border bg-iron/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <Link to="/" className="hover:text-warning transition-colors">Главная</Link>
          <Icon name="ChevronRight" size={12} />
          <Link to="/#catalog" className="hover:text-warning transition-colors">Каталог</Link>
          <Icon name="ChevronRight" size={12} />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* PRODUCT */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* IMAGE GALLERY */}
          <div className="space-y-4">
            <div className="relative bg-steel/40 steel-texture aspect-square flex items-center justify-center overflow-hidden border border-border" onTouchStart={handleTouchStart} onTouchEnd={(e) => handleTouchEnd(e, images.length)}>
              {images.length > 0 ? (
                <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${imgIdx * 100}%)` }}>
                  {images.map((src, i) => (
                    <img key={i} src={src} alt={`${product.name} — фото ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-contain p-4 flex-shrink-0" />
                  ))}
                </div>
              ) : (
                <Icon name="Cog" size={120} className="text-border" />
              )}
              <div className={`absolute top-4 left-0 px-3 py-1 text-xs font-oswald font-bold tracking-wider z-10 ${product.tagColor}`}>{product.tag}</div>
              {images.length > 1 && (
                <>
                  <button onClick={() => setImgIdx((imgIdx - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white w-10 h-10 flex items-center justify-center transition-colors">
                    <Icon name="ChevronLeft" size={20} />
                  </button>
                  <button onClick={() => setImgIdx((imgIdx + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white w-10 h-10 flex items-center justify-center transition-colors">
                    <Icon name="ChevronRight" size={20} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                    {images.map((_, i) => (
                      <button key={i} aria-label={`Перейти к фото ${i + 1}`} onClick={() => setImgIdx(i)} className={`w-2 h-2 rounded-full transition-colors ${i === imgIdx ? "bg-white" : "bg-white/40"}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((src, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} className={`flex-shrink-0 w-16 h-16 border-2 transition-colors overflow-hidden ${i === imgIdx ? "border-warning" : "border-border hover:border-warning/50"}`}>
                    <img src={src} alt={`${product.name} фото ${i + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-warning" />
              <span className="font-mono text-xs tracking-[0.2em] text-warning uppercase">Промышленный измельчитель</span>
            </div>
            <h1 className="font-oswald text-4xl lg:text-5xl font-bold text-foreground tracking-wide mb-3">{product.name}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4 font-plex">{product.desc}</p>

            <div className="inline-flex items-center gap-2 self-start mb-8 border border-green-700/40 bg-green-900/15 px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono tracking-wider uppercase text-green-400">В наличии — отгрузка 1-3 дня</span>
            </div>

            {/* SPECS */}
            <div className="border border-border bg-iron/60 p-6 mb-8">
              <div className="font-oswald text-sm font-bold text-muted-foreground tracking-wider uppercase mb-4">Технические характеристики</div>
              <div className="space-y-3">
                {[
                  { label: "Мощность", val: product.power, icon: "Zap" },
                  { label: "Производительность", val: product.capacity, icon: "BarChart2" },
                  { label: "Масса", val: product.weight, icon: "Weight" },
                ].map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-plex">
                      <Icon name={spec.icon} size={14} className="text-warning" fallback="Settings" />
                      {spec.label}
                    </div>
                    <div className="font-mono text-sm font-bold text-warning">{spec.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* VIDEOS */}
            {(product.videoUrl || product.videoUrl2) && (
              <div className="mb-8">
                <div className="font-oswald text-sm font-bold text-muted-foreground tracking-wider uppercase mb-3">Видео</div>
                <div className="flex gap-2">
                {product.videoUrl && (
                  <a href={product.videoUrl} target="_blank" rel="noopener noreferrer" title={product.videoUrl.includes("youtube") ? "Смотреть на YouTube" : "Смотреть на Rutube"} className="flex items-center border border-border bg-iron/40 hover:border-warning/50 hover:bg-iron/80 p-2 transition-colors">
                    <Icon name="PlayCircle" size={18} className="text-warning" />
                  </a>
                )}
                {product.videoUrl2 && (
                  <a href={product.videoUrl2} target="_blank" rel="noopener noreferrer" title={product.videoUrl2.includes("youtube") ? "Смотреть на YouTube" : "Смотреть на Rutube"} className="flex items-center border border-border bg-iron/40 hover:border-warning/50 hover:bg-iron/80 p-2 transition-colors">
                    <Icon name="PlayCircle" size={18} className="text-warning" />
                  </a>
                )}
                </div>
              </div>
            )}

            {/* PRICE & CTA */}
            <div className="mt-auto border-t border-border pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-muted-foreground font-mono tracking-wider mb-1">Цена</div>
                  <div className="font-oswald text-3xl font-bold text-foreground">{product.price}</div>
                </div>
                <div className="text-right text-xs text-muted-foreground font-mono">
                  <div>Доставка по России</div>
                  <div className="text-warning">Гарантия 1 год</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  to="/#contacts"
                  className="bg-warning text-black py-3.5 text-sm font-oswald font-bold tracking-wider uppercase hover:bg-amber-400 transition-colors text-center min-h-[48px] flex items-center justify-center"
                >
                  Заказать
                </Link>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/79123333225?text=${encodeURIComponent(`Здравствуйте! Интересует ${product.name} (${product.price}). Подскажите по наличию и доставке.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 border border-green-700/60 text-green-400 py-3 text-sm font-oswald font-bold tracking-wider uppercase hover:bg-green-900/30 hover:border-green-600 transition-colors min-h-[44px]"
                  >
                    <Icon name="MessageCircle" size={16} />
                    WhatsApp
                  </a>
                  <a
                    href="tel:+79123333225"
                    aria-label="Позвонить"
                    className="flex items-center justify-center gap-2 border border-warning/40 text-warning px-5 py-3 text-sm font-oswald font-bold tracking-wider uppercase hover:bg-warning/10 transition-colors min-h-[44px]"
                  >
                    <Icon name="Phone" size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ADVANTAGES */}
        <div className="border border-border bg-iron/40 p-8 mb-20">
          <div className="font-oswald text-sm font-bold text-muted-foreground tracking-wider uppercase mb-6">Почему RUBITEL</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "Factory", title: "Производство Россия", desc: "Собственное производство, контроль качества на каждом этапе" },
              { icon: "Shield", title: "Гарантия 1 год", desc: "Официальная гарантия на все модели, бесплатный ремонт" },
              { icon: "Truck", title: "Доставка по России", desc: "Отправка в любой регион транспортной компанией" },
              { icon: "Wrench", title: "Запчасти в наличии", desc: "Оригинальные запчасти и расходники всегда в наличии" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-2">
                <Icon name={item.icon} size={22} className="text-warning" fallback="CheckCircle" />
                <div className="font-oswald font-bold text-foreground text-sm">{item.title}</div>
                <div className="text-xs text-muted-foreground font-plex leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* OTHER PRODUCTS */}
        {otherProducts.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-px bg-warning" />
              <span className="font-mono text-xs tracking-[0.2em] text-warning uppercase">Другие модели</span>
            </div>
            <div className="font-oswald text-2xl font-bold text-foreground mb-8">Также смотрите</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.slug}`} className="group bg-iron border border-border hover:border-warning/50 transition-all duration-300 flex flex-col">
                  <div className="relative bg-steel/40 h-48 steel-texture flex items-center justify-center overflow-hidden">
                    {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="absolute inset-0 w-full h-full object-contain" />}
                    <div className={`absolute top-4 left-0 px-3 py-1 text-xs font-oswald font-bold tracking-wider z-10 ${p.tagColor}`}>{p.tag}</div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-oswald text-xl font-bold text-foreground tracking-wide mb-1">{p.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-plex flex-1">{p.desc}</p>
                    <div className="flex items-center justify-between">
                      <div className="font-oswald text-lg font-bold text-foreground">{p.price}</div>
                      <span className="text-xs text-warning font-mono group-hover:underline">Подробнее →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-iron mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground font-mono">© 2024 RUBITEL — ИП Сухоруков Д.А.</div>
          <Link to="/" className="text-xs text-muted-foreground hover:text-warning font-mono transition-colors">← Вернуться на главную</Link>
        </div>
      </footer>

      {/* Floating WhatsApp button on mobile */}
      <a
        href={`https://wa.me/79123333225?text=${encodeURIComponent(`Здравствуйте! Интересует ${product.name}. Подскажите по наличию и доставке.`)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        className="fixed bottom-6 left-4 z-50 md:hidden bg-green-600 hover:bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all"
      >
        <Icon name="MessageCircle" size={26} />
      </a>
    </div>
  );
}