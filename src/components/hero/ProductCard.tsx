import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { PRODUCTS } from "@/components/shared";
import PayButton from "./PayButton";

export default function ProductCard({ p, scrollTo }: { p: typeof PRODUCTS[0]; scrollTo: (id: string) => void }) {
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
