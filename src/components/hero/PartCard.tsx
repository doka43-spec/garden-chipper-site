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
