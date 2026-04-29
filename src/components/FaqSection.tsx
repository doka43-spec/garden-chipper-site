import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { SectionLabel, SectionTitle } from "@/components/shared";

const FAQ_ITEMS = [
  {
    q: "Как осуществляется доставка?",
    a: "Мы отправляем оборудование по всей России транспортными компаниями: «Деловые Линии», ПЭК, «КИТ», СДЭК. Доставка до терминала ТК — за наш счёт при заказе от 100 000 ₽. От терминала до адреса — оплачивается получателем. Сроки: 3–10 дней в зависимости от региона.",
  },
  {
    q: "Какая гарантия на оборудование?",
    a: "На все измельчители даём официальную гарантию 1 год с даты продажи. Гарантия покрывает производственные дефекты. Не покрывает: износ режущих ножей, неправильную эксплуатацию (попадание камней, металла), повреждения при транспортировке. Запасные ножи всегда в наличии.",
  },
  {
    q: "Можно ли купить в рассрочку?",
    a: "Да. Мы работаем с «Долями» и предоставляем рассрочку через ЮKassa на 4 платежа без процентов. Также возможны схемы оплаты для юрлиц по безналичному расчёту с НДС. Для крупных заказов обсуждаем индивидуальные условия.",
  },
  {
    q: "Какое питание у электрических моделей?",
    a: "Rubitel-E2 работает от 220 В (бытовая сеть, 2.2 кВт). Rubitel-E5 — от 380 В (промышленная сеть, 5.5 кВт). Бензиновые модели Rubitel-S и Rubitel-X не требуют электричества — мобильны, можно использовать в полевых условиях.",
  },
  {
    q: "Какой срок изготовления, если модели нет в наличии?",
    a: "Стандартные модели обычно есть в наличии — отгружаем за 1–3 дня. Если конкретной модели нет — изготавливаем под заказ за 14–30 рабочих дней. Можем модифицировать по требованиям заказчика (бункер, привод, размер ножей).",
  },
  {
    q: "Возможен ли выезд специалиста для запуска и обучения?",
    a: "Да, организуем выезд инженера для пусконаладочных работ и обучения персонала. Для крупных предприятий — бесплатно при заказе от 300 000 ₽. В остальных случаях — по тарифу + командировочные расходы. Расскажем по телефону.",
  },
  {
    q: "Как часто нужно менять ножи и обслуживать оборудование?",
    a: "Ножи требуют заточки каждые 50–80 моточасов и замены примерно раз в сезон при активной эксплуатации. Замена масла — каждые 100 часов. Проверка ремней и подшипников — раз в полгода. Все запчасти есть в нашем каталоге, цены ниже рыночных.",
  },
  {
    q: "Какие способы оплаты принимаете?",
    a: "Принимаем все основные способы: банковские карты (через ЮKassa), СБП, безналичный расчёт для ИП и юрлиц с НДС, наличные при самовывозе с производства. После оплаты сразу выдаём чек и закрывающие документы.",
  },
  {
    q: "Можно ли приехать посмотреть оборудование вживую?",
    a: "Да, ждём вас на производстве в Кировской области (посёлок Торфяной, ул. Транспортная 13б и 15). Покажем все модели в работе, проведём тест-драйв, ответим на вопросы. Желательно предупредить за 1–2 дня по телефону +7 (912) 333-32-25.",
  },
  {
    q: "Что входит в комплектацию?",
    a: "В стандартный комплект входят: сам измельчитель, инструкция, паспорт изделия, гарантийный талон, набор инструментов для базового обслуживания, дополнительный комплект ножей (зависит от модели). При необходимости докомплектуем под ваши задачи.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    const ldScript = document.createElement("script");
    ldScript.type = "application/ld+json";
    ldScript.id = "ld-faq";
    ldScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    });
    document.head.appendChild(ldScript);
    return () => {
      const existing = document.getElementById("ld-faq");
      if (existing) existing.remove();
    };
  }, []);

  return (
    <section id="faq" className="py-24 bg-coal">
      <div className="max-w-4xl mx-auto px-4">
        <SectionLabel>Частые вопросы</SectionLabel>
        <SectionTitle>FAQ</SectionTitle>
        <div className="flex flex-col gap-2">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="border border-border bg-iron transition-colors hover:border-chrome/30">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left min-h-[56px]"
                >
                  <span className="font-oswald font-bold text-foreground text-base md:text-lg leading-tight">
                    {item.q}
                  </span>
                  <Icon
                    name={isOpen ? "Minus" : "Plus"}
                    size={20}
                    className="text-warning flex-shrink-0"
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1">
                    <p className="text-muted-foreground font-plex leading-relaxed text-sm md:text-base">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <p className="text-muted-foreground font-plex mb-4">
            Не нашли ответ на свой вопрос?
          </p>
          <a
            href="https://wa.me/79123333225"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-warning/60 text-warning px-6 py-3 font-oswald font-bold tracking-wider uppercase text-sm hover:bg-warning/10 transition-colors min-h-[44px]"
          >
            <Icon name="MessageCircle" size={16} />
            Спросить в WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
