import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import { PARTS } from "@/components/shared";
import PayButton from "./PayButton";

export default function PartCard({ part, scrollTo }: { part: typeof PARTS[0]; scrollTo: (id: string) => void }) {
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
    <div className="group border border-border bg-iron hover:border-chrome/40 transition-all cursor-pointer flex flex-col">
      {images.length > 0 && (
        <div className="relative h-52 bg-steel/30 steel-texture overflow-hidden flex-shrink-0" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${imgIdx * 100}%)` }}>
            {images.map((src, i) => (
              <img key={i} src={src} alt={`${part.name} ${i + 1}`} loading="lazy" className="w-full h-full object-contain p-2 flex-shrink-0" />
            ))}
          </div>
          {images.length > 1 && (
            <>
              <button aria-label="Предыдущее фото" onClick={(e) => { e.stopPropagation(); setImgIdx((imgIdx - 1 + images.length) % images.length); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-8 h-8 flex items-center justify-center transition-colors">
                <Icon name="ChevronLeft" size={18} />
              </button>
              <button aria-label="Следующее фото" onClick={(e) => { e.stopPropagation(); setImgIdx((imgIdx + 1) % images.length); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-8 h-8 flex items-center justify-center transition-colors">
                <Icon name="ChevronRight" size={18} />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                {images.map((_, i) => (
                  <button key={i} aria-label={`Перейти к фото ${i + 1}`} onClick={() => setImgIdx(i)} className={`w-2 h-2 rounded-full transition-colors ${i === imgIdx ? "bg-white" : "bg-white/40"}`} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start gap-4 mb-4 flex-1">
          {images.length === 0 && (
            <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-chrome/50 transition-colors flex-shrink-0">
              <Icon name={part.icon} size={18} className="text-warning" fallback="Wrench" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="font-oswald font-bold text-foreground text-base leading-tight mb-1">{part.name}</div>
            <div className="text-xs text-muted-foreground font-mono">{part.material}</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-oswald text-xl font-bold text-foreground">{part.price}</div>
          <button
            onClick={() => scrollTo("contacts")}
            className="w-full bg-warning text-black px-4 py-3 text-sm font-oswald font-bold tracking-wider uppercase hover:bg-amber-400 transition-colors min-h-[44px]"
          >
            Заказать
          </button>
          <PayButton
            amount={part.priceValue}
            description={part.name}
            showQty={part.name.includes("Ножи")}
          />
        </div>
      </div>
    </div>
  );
}