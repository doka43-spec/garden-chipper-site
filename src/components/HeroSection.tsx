import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PRODUCTS, PARTS, SectionLabel, SectionTitle } from "@/components/shared";
import HomeHero from "./hero/HomeHero";
import ProductCard from "./hero/ProductCard";
import PartCard from "./hero/PartCard";

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  const [catalogExpanded, setCatalogExpanded] = useState(false);
  const [partsExpanded, setPartsExpanded] = useState(false);

  const visibleProducts = !catalogExpanded ? PRODUCTS.slice(0, 3) : PRODUCTS;
  const visibleParts = !partsExpanded ? PARTS.slice(0, 3) : PARTS;

  return (
    <>
      <HomeHero />

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
