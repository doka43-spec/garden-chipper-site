import { useState } from "react";
import Icon from "@/components/ui/icon";

const GH = "https://cdn.jsdelivr.net/gh/doka43-spec/rubitel-images";

export const LOGO_URL = `${GH}/logo.png`;
export const LOGO_FILTER = "invert(1) sepia(1) saturate(5) hue-rotate(5deg) brightness(1.1)";
export const HERO_BG = `${GH}/hero-bg.jpeg`;

export const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "parts", label: "Запчасти" },
  { id: "about", label: "О нас" },
  { id: "delivery", label: "Доставка" },
  { id: "contacts", label: "Контакты" },
  { id: "articles", label: "Статьи" },
];

export const PRODUCTS = [
  {
    id: 1,
    slug: "rubitel-s",
    name: "Rubitel-S",
    seoTitle: "Rubitel-S — садовый измельчитель веток 7 л.с. купить | RUBITEL",
    seoDescription: "Купить садовый дисковый измельчитель веток Rubitel-S (7 л.с., ветки до 60 мм, 54 кг). Цена 45 000 ₽. Производство Россия, гарантия 1 год. Доставка по всей России.",
    desc: "Садовый дисковый измельчитель веток диаметром до 60 мм",
    power: "7 л.с.",
    capacity: "до 0.5 м³/ч",
    weight: "54 кг",
    price: "45 000 ₽",
    tag: "ХИТ",
    tagColor: "bg-warning text-black",
    videoUrl: "https://rutube.ru/video/594cefcea706a939d8095ebd07d20e3c/",
    videoUrl2: "https://youtube.com/watch?v=r2s1Y8QbDt8",
    images: [
      `${GH}/s-1.jpeg`,
      `${GH}/s-2.jpg`,
      `${GH}/s-3.jpg`,
      `${GH}/s-4.jpg`,
      `${GH}/s-5.jpg`,
    ],
  },
  {
    id: 2,
    slug: "rubitel-x",
    seoTitle: "Rubitel-X — промышленный измельчитель веток 21 л.с. купить | RUBITEL",
    seoDescription: "Купить промышленный измельчитель веток Rubitel-X (21 л.с., ветки до 100 мм, производительность 1.5 м³/ч). Цена 135 000 ₽. Производство Россия, гарантия 1 год.",
    images: [
      `${GH}/x-1.jpg`,
      `${GH}/x-2.jpg`,
      `${GH}/x-3.jpg`,
      `${GH}/x-4.jpg`,
      `${GH}/x-5.jpg`,
      `${GH}/x-6.jpg`,
    ],
    videoUrl: "https://rutube.ru/video/3c9950f4b27c254ffd9da94619d50376/",
    videoUrl2: "https://youtube.com/watch?v=O7aN9K8qgww",
    name: "Rubitel-X",
    desc: "Измельчитель веток диаметром до 100 мм",
    power: "21 л.с.",
    capacity: "до 1.5 м³/ч",
    weight: "156 кг",
    price: "135 000 ₽",
    tag: "НОВИНКА",
    tagColor: "bg-rust text-white",
  },
  {
    id: 4,
    slug: "rubitel-e5",
    seoTitle: "Rubitel-E5 — электрический измельчитель веток 5.5 кВт купить | RUBITEL",
    seoDescription: "Купить электрический садовый измельчитель веток Rubitel-E5 (5.5 кВт, ветки до 65 мм, 72 кг). Цена 65 000 ₽. Без бензина, тихая работа. Производство Россия, гарантия 1 год.",
    name: "Rubitel-E5",
    desc: "Садовый дисковый измельчитель веток диаметром до 65 мм",
    power: "5.5 кВт",
    capacity: "до 0.7 м³/ч",
    weight: "72 кг",
    price: "65 000 ₽",
    tag: "НОВИНКА",
    tagColor: "bg-rust text-white",
    images: [
      `${GH}/e5-1.jpeg`,
      `${GH}/e5-2.jpeg`,
      `${GH}/e5-3.jpeg`,
    ],
  },
  {
    id: 3,
    slug: "rubitel-e2",
    seoTitle: "Rubitel-E2 — электрический измельчитель веток 2.2 кВт купить | RUBITEL",
    seoDescription: "Купить электрический садовый измельчитель веток Rubitel-E2 (2.2 кВт, ветки до 50 мм, 54 кг). Цена 45 000 ₽. Компактный, лёгкий, тихий. Производство Россия, гарантия 1 год.",
    name: "Rubitel-E2",
    desc: "Садовый дисковый измельчитель веток диаметром до 50 мм",
    power: "2.2 кВт",
    capacity: "до 0.5 м³/ч",
    weight: "54 кг",
    price: "45 000 ₽",
    tag: "PRO",
    tagColor: "bg-steel text-chrome",
    videoUrl: "https://youtube.com/watch?v=XallFat8aGc",
    videoUrl2: "https://youtube.com/watch?v=umQjeYLiNNs",
    images: [
      `${GH}/e2-1.jpg`,
      `${GH}/e2-2.jpg`,
      `${GH}/e2-3.jpg`,
      `${GH}/e2-4.jpg`,
      `${GH}/e2-5.jpg`,
    ],
  },
];

export const PARTS = [
  { name: "Ножи рубительные сменные для модели Rubitel-S, Rubitel E2, Rubitel E5", material: "Сталь 6ХВ2С", price: "2 700 ₽ за комплект (2шт)", priceValue: 2700, icon: "Wrench", images: [`${GH}/knives-s-1.png`, `${GH}/knives-s-2.jpg`, `${GH}/knives-s-3.jpg`, `${GH}/knives-s-4.jpg`, `${GH}/knives-s-5.jpg`] },
  { name: "Ножи рубительные сменные для модели Rubitel-X", material: "Сталь 6ХВ2С", price: "5 000 ₽ за комплект (2шт)", priceValue: 5000, icon: "Wrench", images: [`${GH}/knives-x-1.jpg`] },
  { name: "Доплата за мотор 9 л.с. (при заказе с маркетплейсов)", material: "Двигатель повышенной мощности", price: "7 500 ₽", priceValue: 7500, icon: "Cog", images: [] },
];

export const REVIEWS = [
  {
    author: "Дмитрий",
    company: "Авито",
    rating: 5,
    text: "Покупал у Дмитрия измельчитель веток, и комплект дополнительных ножей к нему. Выполнен измельчитель качественно и продуманно, очень просто производить техническое обслуживание. Дмитрий всегда на связи, готов проконсультировать и подсказать. Дробилка не подвела ни разу! Благодарю Дмитрия за такое качественное и недорогое изделие!",
    date: "7 декабря 2024",
    images: [
      `${GH}/review-1-1.jpg`,
      `${GH}/review-1-2.jpg`,
      `${GH}/review-1-3.jpg`,
    ],
  },
  {
    author: "Антон",
    company: "Авито",
    rating: 5,
    text: "Все хорошо.",
    date: "14 апреля 2025",
    images: [
      `${GH}/review-2-1.jpg`,
    ],
  },
  {
    author: "Андрей Ковалев",
    company: "Авито",
    rating: 5,
    text: "Приобрёл щепорез у данного продавца, 45 киловатт. Станок выдал то, что я хотел, показал себя классно. Подключение произошло на ура — качество щепореза на высоте!!!! Продавцу выражаю большой респект, человеческое огромное спасибо. Рекомендую продавца — какую-либо помощь или информацию предоставит без проблем.",
    date: "19 апреля 2025",
  },
  {
    author: "Рафик Абутдинов",
    company: "Авито",
    rating: 5,
    text: "Арболитный щепорез 30 квт. Всё работает хорошо, то что надо было.",
    date: "7 мая 2025",
  },
  {
    author: "Анатолий Бурмакин",
    company: "Авито",
    rating: 5,
    text: "Приобрёл измельчитель веток. Достойная техника, удобная в перемещении, управляемое сопло, всё работает без нареканий. Продавец отвечает мгновенно, договорились, оплатил. Рекомендую — хорошая техника для дома.",
    date: "18 июля 2025",
    images: [
      `${GH}/review-5-1.jpg`,
      `${GH}/review-5-2.jpg`,
    ],
  },
  {
    author: "Александр",
    company: "Авито",
    rating: 5,
    text: "Купил измельчитель. Продавец оперативно ответил, оформил доставку. Аппарат сделан добротно, хорошо продуман: ременная передача, удобно перемещать, можно закрепить мешок и перемалывать в него. Наверное, лучший в этой ценовой категории. Продавцу спасибо и процветания!",
    date: "26 августа 2025",
    images: [
      `${GH}/review-6-1.jpg`,
    ],
  },
  {
    author: "Денис",
    company: "Авито",
    rating: 5,
    text: "Отличный измельчитель веток, простая, надежная и эффективная конструкция!!! За час переработал целую кучу веток! Намного удобнее чем сжигать. Спасибо Дмитрию за оперативную отправку и консультации!",
    date: "30 августа 2025",
    images: [
      `${GH}/review-7-1.jpg`,
    ],
  },
  {
    author: "ПроАрбо",
    company: "Авито",
    rating: 5,
    text: "Прошло уже больше года с момента покупки данного измельчителя, можно оставить объективный отзыв! Отмечу сразу, что несмотря на некоторые особенности, дробилка очень хорошо сконструирована, гравитационная подача веток, качественное железо, надёжные узлы. Занимаюсь спилом деревьев (арбористикой) и хотел именно небольшую дробилку, чтобы можно было поместить в легковой автомобиль, сдробить одно, два дерева для повышения чека своих услуг. Аппарат подошел идеально! Продавец реагирует мгновенно.",
    date: "11 сентября 2025",
  },
];

interface SectionLabelProps { children: React.ReactNode; className?: string }
export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div className={`inline-flex items-center gap-2 text-xs font-mono text-warning tracking-[0.3em] uppercase mb-4 ${className}`}>
      <div className="w-8 h-px bg-warning" />
      {children}
      <div className="w-8 h-px bg-warning" />
    </div>
  );
}

interface SectionTitleProps { children: React.ReactNode; className?: string }
export function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <h2 className={`font-oswald text-4xl md:text-5xl font-bold text-foreground tracking-wide mb-6 ${className}`}>
      {children}
    </h2>
  );
}

export const WARRANTY_ITEMS = [
  { icon: "Shield", title: "Гарантия 1 год", desc: "На всё оборудование собственного производства" },
  { icon: "Wrench", title: "Сервисное обслуживание", desc: "Ремонт и замена запчастей в кратчайшие сроки" },
  { icon: "Truck", title: "Доставка по России", desc: "Транспортными компаниями до вашего города" },
  { icon: "Phone", title: "Поддержка 24/7", desc: "Консультации по телефону и мессенджерам" },
];

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rating ? "var(--warning, #f59e0b)" : "#444", fontSize: "14px" }}>★</span>
      ))}
    </div>
  );
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/mail.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "contact", name, phone, message }),
    }).catch(() => {});
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-coal border border-border p-8 flex flex-col items-center justify-center text-center h-full min-h-[260px]">
        <Icon name="CheckCircle" size={48} className="text-warning mb-4" />
        <div className="font-oswald text-2xl font-bold text-foreground mb-2">Заявка отправлена!</div>
        <div className="text-sm text-muted-foreground font-plex">Мы свяжемся с вами в ближайшее время.</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-coal border border-border p-8 flex flex-col gap-4">
      <div className="font-oswald text-xl font-bold text-foreground mb-2">Оставить заявку</div>
      <div>
        <label className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-1.5 block">Ваше имя</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Иван Иванов"
          required
          className="w-full bg-iron border border-border px-4 py-3 text-sm text-foreground font-plex focus:outline-none focus:border-warning/50 transition-colors placeholder:text-muted-foreground/40"
        />
      </div>
      <div>
        <label className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-1.5 block">Телефон</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+7 (___) ___-__-__"
          required
          className="w-full bg-iron border border-border px-4 py-3 text-sm text-foreground font-plex focus:outline-none focus:border-warning/50 transition-colors placeholder:text-muted-foreground/40"
        />
      </div>
      <div>
        <label className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-1.5 block">Сообщение</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Интересующая модель, вопросы..."
          rows={3}
          className="w-full bg-iron border border-border px-4 py-3 text-sm text-foreground font-plex focus:outline-none focus:border-warning/50 transition-colors resize-none placeholder:text-muted-foreground/40"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-warning text-black px-6 py-3 font-oswald font-bold tracking-wider uppercase text-sm hover:bg-amber-400 transition-colors disabled:opacity-60"
      >
        {loading ? "Отправка..." : "Отправить заявку"}
      </button>
    </form>
  );
}

export function PartsCard({ part }: { part: typeof PARTS[0] }) {
  const images = part.images || [];
  const [imgIdx, setImgIdx] = useState(0);
  return (
    <div className="bg-iron border border-border hover:border-warning/40 transition-all duration-300 flex flex-col">
      <div className="relative bg-steel/30 h-44 steel-texture flex items-center justify-center overflow-hidden">
        {images.length > 0
          ? <img src={images[imgIdx]} alt={part.name} className="absolute inset-0 w-full h-full object-contain p-3" />
          : <Icon name="Wrench" size={60} className="text-border" />
        }
        {images.length > 1 && (
          <>
            <button onClick={() => setImgIdx((imgIdx - 1 + images.length) % images.length)} className="absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-6 h-6 flex items-center justify-center transition-colors">
              <Icon name="ChevronLeft" size={14} />
            </button>
            <button onClick={() => setImgIdx((imgIdx + 1) % images.length)} className="absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-6 h-6 flex items-center justify-center transition-colors">
              <Icon name="ChevronRight" size={14} />
            </button>
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 flex gap-1">
              {images.map((_, i) => (
                <button key={i} onClick={() => setImgIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIdx ? "bg-warning" : "bg-white/40"}`} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-oswald text-lg font-bold text-foreground tracking-wide mb-2 leading-tight">{part.name}</h3>
        <div className="text-xs text-muted-foreground font-mono mb-1">Материал: <span className="text-chrome">{part.material}</span></div>
        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
          <span className="font-oswald text-xl font-bold text-warning">{part.price}</span>
        </div>
      </div>
    </div>
  );
}