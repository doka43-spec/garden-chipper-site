import Icon from "@/components/ui/icon";
import { SectionLabel, SectionTitle } from "@/components/shared";

interface AboutSectionProps {
  scrollTo: (id: string) => void;
}

export default function AboutSection({ scrollTo }: AboutSectionProps) {
  return (
    <>
      {/* ABOUT */}
      <section id="about" className="py-24 bg-iron steel-texture">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel>О нас</SectionLabel>
              <SectionTitle>Производство</SectionTitle>
              <p className="text-muted-foreground font-plex leading-relaxed mb-6">
                Мы выпускаем промышленные измельчители с 2009 года на собственном производстве в России. Производство находится в Кировской области по адресу: посёлок Торфяной, ул. Транспортная 13б и 15.
              </p>
              <p className="text-muted-foreground font-plex leading-relaxed mb-6">
                Каждый станок проходит строгий контроль качества на всех этапах изготовления. Имеется собственное конструкторское бюро. Производственные площади — 1000 м².
              </p>
              <p className="text-muted-foreground font-plex leading-relaxed mb-10">
                При изготовлении оборудования используются современные технологии: изготовление деталей на станках ЧПУ, порошковая покраска в высокотемпературной камере, лазерная резка деталей, термическая обработка ножей и закалка ключевых узлов.
              </p>

            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: "Factory", label: "Российское производство", sub: "Кировская область" },
                { icon: "Award", label: "Сертификаты ГОСТ", sub: "Вся линейка продукции" },
                { icon: "Users", label: "Команда 10 чел.", sub: "Инженеры и технологи" },
                { icon: "Globe", label: "Экспорт в 2 страны", sub: "Белоруссия и Казахстан" },
              ].map((item) => (
                <div key={item.label} className="bg-coal border border-border p-6 flex items-start gap-3">
                  <div className="w-8 h-8 border border-warning/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={item.icon} size={14} className="text-warning" fallback="Star" />
                  </div>
                  <div>
                    <div className="font-oswald font-bold text-sm text-foreground">{item.label}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-24 bg-coal">
        <div className="max-w-7xl mx-auto px-4">
          <SectionLabel>Логистика</SectionLabel>
          <SectionTitle>Доставка<br />и оплата</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "Truck",
                title: "Доставка по России",
                items: ["Автотранспортом по всей России", "Железнодорожные перевозки", "Попутный транспорт — экономия до 40%", "Страхование груза включено"],
              },
              {
                icon: "CreditCard",
                title: "Способы оплаты",
                items: ["Безналичный расчёт (НДС)", "Лизинг — от 0% первый взнос", "Рассрочка до 24 месяцев", "Аккредитив для крупных заказов"],
              },
              {
                icon: "PackageCheck",
                title: "Сроки и условия",
                items: ["Склад готовой продукции — в наличии", "Под заказ — от 45 рабочих дней", "Монтаж и пуско-наладка включены", "Обучение операторов на месте"],
              },
            ].map((block) => (
              <div key={block.title} className="bg-iron border border-border p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-warning flex items-center justify-center">
                    <Icon name={block.icon} size={18} className="text-black" fallback="Package" />
                  </div>
                  <h3 className="font-oswald text-lg font-bold text-foreground uppercase tracking-wide">{block.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground font-plex">
                      <div className="w-1 h-1 bg-warning mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border border-warning/30 warning-stripe p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-mono text-xs text-warning/70 tracking-wider mb-2">ВЫГОДНОЕ ПРЕДЛОЖЕНИЕ</div>
              <div className="font-oswald text-2xl font-bold text-foreground uppercase">Лизинг от 0% первоначального взноса</div>
              <div className="text-sm text-muted-foreground font-plex mt-1">Сотрудничаем с 12 лизинговыми компаниями. Одобрение за 2 рабочих дня.</div>
            </div>
            <button
              onClick={() => scrollTo("contacts")}
              className="flex-shrink-0 bg-warning text-black px-8 py-3 font-oswald font-bold tracking-wider uppercase hover:bg-amber-400 transition-colors"
            >
              Рассчитать лизинг
            </button>
          </div>
        </div>
      </section>
    </>
  );
}