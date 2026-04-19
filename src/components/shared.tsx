import { useState } from "react";
import Icon from "@/components/ui/icon";

export const API_URL = "https://functions.poehali.dev/75fbbfe8-a32b-4c93-8ed9-af82c8971d16";

export const LOGO_URL = "https://cdn.poehali.dev/projects/30589419-8040-421a-8f96-70e5f7c9160c/bucket/41d29d22-0695-4907-b28c-14ffb2c16e68.png";
export const LOGO_FILTER = "invert(78%) sepia(60%) saturate(1000%) hue-rotate(350deg) brightness(100%) contrast(95%)";
export const HERO_BG = "https://cdn.poehali.dev/projects/30589419-8040-421a-8f96-70e5f7c9160c/bucket/f91339dd-d69e-4369-9248-3a4a5add7314.jpeg";

export const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "parts", label: "Запчасти" },
  { id: "consumables", label: "Расходники" },
  { id: "about", label: "О компании" },
  { id: "delivery", label: "Доставка" },
  { id: "contacts", label: "Контакты" },
  { id: "warranty", label: "Гарантия" },
];

export const PRODUCTS = [
  {
    id: 1,
    name: "RUBITEL-S",
    desc: "Садовый дисковый измельчитель веток диаметром до 60 мм",
    power: "7 л.с.",
    capacity: "до 0.5 м³/ч",
    weight: "54 кг",
    price: "45 000 ₽",
    tag: "ХИТ",
    tagColor: "bg-warning text-black",
    image: "https://cdn.poehali.dev/projects/30589419-8040-421a-8f96-70e5f7c9160c/bucket/d747d096-586a-444c-9442-5b78dcc4f963.jpeg",
  },
  {
    id: 2,
    name: "МРШ-800 TITAN",
    desc: "Молотковая мельница для переработки промышленных отходов и паллет",
    power: "55 кВт",
    capacity: "до 30 т/ч",
    weight: "3 200 кг",
    price: "от 920 000 ₽",
    tag: "НОВИНКА",
    tagColor: "bg-rust text-white",
  },
  {
    id: 3,
    name: "БТМ-1200 MEGA",
    desc: "Барабанная рубительная машина для крупного производства и лесопереработки",
    power: "110 кВт",
    capacity: "до 60 т/ч",
    weight: "5 800 кг",
    price: "от 1 850 000 ₽",
    tag: "PRO",
    tagColor: "bg-steel text-chrome",
  },
];

export const PARTS = [
  { name: "Ножи рубительные сменные", material: "Сталь 65Г", price: "от 1 200 ₽", icon: "Wrench" },
  { name: "Подшипниковые узлы SKF/FAG", material: "Оригинал", price: "от 3 500 ₽", icon: "Settings" },
  { name: "Молотки дробильные", material: "Марганцовистая сталь", price: "от 850 ₽", icon: "Hammer" },
  { name: "Решётки сортировочные", material: "Легированная сталь", price: "от 4 200 ₽", icon: "Grid3x3" },
  { name: "Приводные ремни усиленные", material: "Aramid", price: "от 600 ₽", icon: "Link" },
  { name: "Уплотнения и манжеты", material: "Viton / NBR", price: "от 120 ₽", icon: "Circle" },
];

export const REVIEWS = [
  {
    author: "Дмитрий Петров",
    company: "ЛесПром Тверь",
    rating: 5,
    text: "Эксплуатируем RUBITEL-500 уже третий год без нареканий. Производительность соответствует паспорту, сервисная поддержка на уровне.",
    date: "Март 2026",
  },
  {
    author: "Андрей Кузнецов",
    company: "ДревПрод-Урал",
    rating: 5,
    text: "Взяли БТМ-1200 MEGA для нашего производства. Окупился за 8 месяцев. Качество дробления отличное, простой в обслуживании.",
    date: "Февраль 2026",
  },
  {
    author: "Сергей Иванов",
    company: "ТехноОтход СПб",
    rating: 4,
    text: "МРШ-800 справляется с нашими объёмами отходов. Запчасти всегда в наличии, доставка быстрая. Рекомендуем.",
    date: "Январь 2026",
  },
];

export const WARRANTY_ITEMS = [
  { period: "24 мес.", label: "Гарантия на оборудование", icon: "ShieldCheck" },
  { period: "12 мес.", label: "Гарантия на запчасти", icon: "Shield" },
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
    <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide leading-tight mb-10">
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
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
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