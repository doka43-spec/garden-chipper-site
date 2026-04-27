import { useState } from "react";
import Icon from "@/components/ui/icon";

export const API_URL = "https://functions.poehali.dev/75fbbfe8-a32b-4c93-8ed9-af82c8971d16";
export const REVIEWS_API_URL = "https://functions.poehali.dev/6b660005-abf4-4f14-af7c-d8689df6b761";

const CDN = "https://cdn.poehali.dev/projects/30589419-8040-421a-8f96-70e5f7c9160c/bucket";
export const LOGO_URL = `${CDN}/210ec4eb-46b4-446e-96aa-ad1c9ae9ce31.jpg`;
export const LOGO_FILTER = "invert(1) sepia(1) saturate(5) hue-rotate(5deg) brightness(1.1)";
export const HERO_BG = `${CDN}/f91339dd-d69e-4369-9248-3a4a5add7314.jpeg`;

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
      `${CDN}/d747d096-586a-444c-9442-5b78dcc4f963.jpeg`,
      `${CDN}/f7e91cd7-a26e-4c07-bacf-8f611c2bce2d.jpg`,
      `${CDN}/b22c03cc-a96d-412c-b495-41ae2c9df9b9.jpg`,
      `${CDN}/aa9c5143-15f3-4714-87d4-c30ae303b182.jpg`,
      `${CDN}/e466c3d3-0fbd-4854-b41e-7444d5c79e70.jpg`,
    ],
  },
  {
    id: 2,
    slug: "rubitel-x",
    seoTitle: "Rubitel-X — промышленный измельчитель веток 21 л.с. купить | RUBITEL",
    seoDescription: "Купить промышленный измельчитель веток Rubitel-X (21 л.с., ветки до 100 мм, производительность 1.5 м³/ч). Цена 135 000 ₽. Производство Россия, гарантия 1 год.",
    images: [
      `${CDN}/44fd17fc-c51a-4a33-9e17-1758fd755aad.JPG`,
      `${CDN}/83cfac3d-1303-4c1d-ad4c-6ed158398c3e.JPG`,
      `${CDN}/d8dd5a39-c126-4ea5-93eb-522e927de784.JPG`,
      `${CDN}/e6ff12ff-1bef-43b4-a3ec-7a3a1a04915d.JPG`,
      `${CDN}/849d969e-9bb9-4379-86b2-d86a16e9ee75.JPG`,
      `${CDN}/232652a1-7d4f-4a0f-808d-2d0fe61fe4ae.JPG`,
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
      `${CDN}/948beedf-6d04-40bb-81e6-7c70c70ccd00.jpeg`,
      `${CDN}/abc92367-24ee-415d-8b0a-0b8e581cd2cf.jpeg`,
      `${CDN}/8550a2ff-db06-4e3c-aacc-2544970145d8.jpeg`,
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
      `${CDN}/4ea67fca-6a6a-4c0f-927f-979bbbbc9c6e.JPG`,
      `${CDN}/b1b89311-5e56-49aa-8100-aa9dcc30fdd2.JPG`,
      `${CDN}/15a02b77-5475-4be9-8659-ccfa4370a385.JPG`,
      `${CDN}/1fb4fb69-5bf7-430a-8dcc-611702f925ba.JPG`,
      `${CDN}/2cb00263-a375-4620-8943-d96647f6fd4e.JPG`,
    ],
  },
];

export const PARTS = [
  { name: "Ножи рубительные сменные для модели Rubitel-S, Rubitel E2, Rubitel E5", material: "Сталь 6ХВ2С", price: "2 700 ₽ за комплект (2шт)", icon: "Wrench", images: [`${CDN}/a419a2bc-5f85-4811-bf82-e5698e20cee1.png`, `${CDN}/9408ce77-bbd9-4531-989f-87b830a86e36.jpg`, `${CDN}/e247701f-3373-4569-818f-711a4492cb11.jpg`, `${CDN}/0e5c7b10-65db-4bf0-90ac-f8901fc43261.JPG`, `${CDN}/ac291e65-84f1-48ef-9a0a-2fcc7b674571.JPG`] },
  { name: "Ножи рубительные сменные для модели Rubitel-X", material: "Сталь 6ХВ2С", price: "5 000 ₽ за комплект (2шт)", icon: "Wrench", images: [`${CDN}/279adbae-3649-4886-8ba3-ecd43c36208e.jpg`] },

];

export const REVIEWS = [
  {
    author: "Дмитрий",
    company: "Авито",
    rating: 5,
    text: "Покупал у Дмитрия измельчитель веток, и комплект дополнительных ножей к нему. Выполнен измельчитель качественно и продуманно, очень просто производить техническое обслуживание. Дмитрий всегда на связи, готов проконсультировать и подсказать. Дробилка не подвела ни разу! Благодарю Дмитрия за такое качественное и недорогое изделие!",
    date: "7 декабря 2024",
    images: [
      `${CDN}/a2a2fb08-8019-40a0-bcab-930e461e78f1.jpg`,
      `${CDN}/dfdf785f-fe65-41ac-bfa9-89f97882ccae.jpg`,
      `${CDN}/420771bb-fd59-4a4b-84a0-a9e17e9814e3.jpg`,
    ],
  },
  {
    author: "Антон",
    company: "Авито",
    rating: 5,
    text: "Все хорошо.",
    date: "14 апреля 2025",
    images: [
      `${CDN}/0625aaf2-48fa-4c13-ab8a-f986a25f7e57.jpg`,
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
      `${CDN}/d6f5c2c3-f8de-4875-a9c7-ab7aeb4d59f0.jpg`,
      `${CDN}/4abc2f22-cdca-47d8-8133-d238d41832ba.jpg`,
    ],
  },
  {
    author: "Александр",
    company: "Авито",
    rating: 5,
    text: "Купил измельчитель. Продавец оперативно ответил, оформил доставку. Аппарат сделан добротно, хорошо продуман: ременная передача, удобно перемещать, можно закрепить мешок и перемалывать в него. Наверное, лучший в этой ценовой категории. Продавцу спасибо и процветания!",
    date: "26 августа 2025",
    images: [
      `${CDN}/7cef89ba-50f0-48bf-a8a6-d26ab7d3b18f.jpg`,
    ],
  },
  {
    author: "Денис",
    company: "Авито",
    rating: 5,
    text: "Отличный измельчитель веток, простая, надежная и эффективная конструкция!!! За час переработал целую кучу веток! Намного удобнее чем сжигать. Спасибо Дмитрию за оперативную отправку и консультации!",
    date: "30 августа 2025",
    images: [
      `${CDN}/cae2ed74-2277-4718-931e-d93af861a28d.jpg`,
    ],
  },
  {
    author: "ПроАрбо",
    company: "Авито",
    rating: 5,
    text: "Прошло уже больше года с момента покупки данного измельчителя, можно оставить объективный отзыв! Отмечу сразу, что несмотря на некоторые особенности, дробилка очень хорошо сконструирована, гравитационная подача веток, качественное железо, надёжные узлы. Занимаюсь спилом деревьев (арбористикой) и хотел именно небольшую дробилку, чтобы можно было поместить в легковой автомобиль, сдробить одно, два дерева для повышения чека своих услуг. Аппарат оправдал мои ожидания в первый же заказ, полностью окупив. Заказывал с двигателем 9 л.с., действительно грызёт всё что проходит в бункерное окно. Были поломки, но в 100% это моя вина, тупые ножи, сухие ветки и т.д. Могу смело рекомендовать данную дробилку. За эти деньги, другой альтернативы и близко нет, уверен что эта дробилка лучшая в своём классе! Дмитрий постоянно на связи, на любые вопросы оперативно отвечает!",
    date: "4 апреля 2025",
    images: [
      "/images/fd4c02f0-1ce6-41e4-b0d8-3a36366b735d.png",
      "/images/1f96f7e3-907c-4582-83db-ce76dbb092ec.png",
      "/images/d0ec39fc-b22e-4289-acf5-6c430a746a4c.png",
      "/images/4bd4d37e-cdcb-47ed-80e2-dfa2a76acf97.png",
      "/images/7deaa25f-221e-4669-95e5-c179acc043ef.jpg",
    ],
  },
];

export const WARRANTY_ITEMS = [
  { period: "12 мес.", label: "Гарантия на оборудование", icon: "ShieldCheck" },
  { period: "48 ч", label: "Реакция сервиса", icon: "Clock" },
  { period: "10 лет", label: "Поставка запчастей", icon: "Package" },
];

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? "text-warning" : "text-muted-foreground"} style={{ fontSize: 14 }}>
          ★
        </span>
      ))}
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-px bg-warning" />
      <span className="font-mono text-xs tracking-[0.25em] text-warning uppercase">{children}</span>
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground tracking-wide leading-tight mb-10">
      {children}
    </h2>
  );
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg("Заполните имя и телефон");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", name, phone, message }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Ошибка отправки. Попробуйте ещё раз.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Нет связи с сервером. Попробуйте позже.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-coal border border-border p-8 flex flex-col items-center justify-center min-h-[360px] text-center">
        <div className="w-14 h-14 border-2 border-warning flex items-center justify-center mb-5">
          <Icon name="Check" size={28} className="text-warning" />
        </div>
        <div className="font-oswald text-2xl font-bold text-foreground uppercase tracking-wide mb-2">
          Заявка принята!
        </div>
        <p className="text-muted-foreground font-plex text-sm leading-relaxed mb-6">
          Мы получили вашу заявку и перезвоним в ближайшее время.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="border border-warning/40 text-warning px-6 py-2 font-oswald font-bold tracking-wider uppercase text-xs hover:bg-warning/10 transition-colors"
        >
          Отправить ещё
        </button>
      </div>
    );
  }

  return (
    <div className="bg-coal border border-border p-8">
      <div className="font-oswald text-xl font-bold text-foreground uppercase tracking-wide mb-6">
        Получить коммерческое предложение
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-muted-foreground tracking-wider mb-1.5 uppercase">
            Имя и компания
          </label>
          <input
            type="text"
            placeholder="ООО «ЛесПром», Дмитрий"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-iron border border-border px-4 py-3 text-sm text-foreground font-plex placeholder:text-muted-foreground/50 focus:outline-none focus:border-warning/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted-foreground tracking-wider mb-1.5 uppercase">
            Телефон
          </label>
          <input
            type="tel"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-iron border border-border px-4 py-3 text-sm text-foreground font-plex placeholder:text-muted-foreground/50 focus:outline-none focus:border-warning/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted-foreground tracking-wider mb-1.5 uppercase">
            Что нужно?
          </label>
          <textarea
            rows={3}
            placeholder="Опишите задачу: что измельчаем, объёмы, требования..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-iron border border-border px-4 py-3 text-sm text-foreground font-plex placeholder:text-muted-foreground/50 focus:outline-none focus:border-warning/50 transition-colors resize-none"
          />
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 text-sm text-red-400 font-plex">
            <Icon name="AlertCircle" size={14} />
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-warning text-black py-4 font-oswald font-bold tracking-wider uppercase hover:bg-amber-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              Отправляем...
            </>
          ) : (
            "Отправить заявку"
          )}
        </button>
        <div className="text-xs text-muted-foreground/60 font-mono text-center">
          Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
        </div>
      </form>
    </div>
  );
}