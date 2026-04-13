import { useState } from "react";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/75fbbfe8-a32b-4c93-8ed9-af82c8971d16";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "parts", label: "Запчасти" },
  { id: "consumables", label: "Расходники" },
  { id: "about", label: "О компании" },
  { id: "delivery", label: "Доставка" },
  { id: "contacts", label: "Контакты" },
  { id: "warranty", label: "Гарантия" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "ИМЗ-500 ПРОФИ",
    desc: "Дисковый измельчитель для древесины и веток диаметром до 200 мм",
    power: "22 кВт",
    capacity: "до 15 т/ч",
    weight: "1 850 кг",
    price: "от 480 000 ₽",
    tag: "ХИТ",
    tagColor: "bg-warning text-black",
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

const PARTS = [
  { name: "Ножи рубительные сменные", material: "Сталь 65Г", price: "от 1 200 ₽", icon: "Wrench" },
  { name: "Подшипниковые узлы SKF/FAG", material: "Оригинал", price: "от 3 500 ₽", icon: "Settings" },
  { name: "Молотки дробильные", material: "Марганцовистая сталь", price: "от 850 ₽", icon: "Hammer" },
  { name: "Решётки сортировочные", material: "Легированная сталь", price: "от 4 200 ₽", icon: "Grid3x3" },
  { name: "Приводные ремни усиленные", material: "Aramid", price: "от 600 ₽", icon: "Link" },
  { name: "Уплотнения и манжеты", material: "Viton / NBR", price: "от 120 ₽", icon: "Circle" },
];

const REVIEWS = [
  {
    author: "Дмитрий Петров",
    company: "ЛесПром Тверь",
    rating: 5,
    text: "Эксплуатируем ИМЗ-500 уже третий год без нареканий. Производительность соответствует паспорту, сервисная поддержка на уровне.",
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

const WARRANTY_ITEMS = [
  { period: "24 мес.", label: "Гарантия на оборудование", icon: "ShieldCheck" },
  { period: "12 мес.", label: "Гарантия на запчасти", icon: "Shield" },
  { period: "48 ч", label: "Реакция сервиса", icon: "Clock" },
  { period: "10 лет", label: "Поставка запчастей", icon: "Package" },
];

function StarRating({ rating }: { rating: number }) {
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-px bg-warning" />
      <span className="font-mono text-xs tracking-[0.25em] text-warning uppercase">{children}</span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide leading-tight mb-10">
      {children}
    </h2>
  );
}

function ContactForm() {
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

export default function Index() {
  const [activeNav, setActiveNav] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeReviewFilter, setActiveReviewFilter] = useState(0);

  const scrollTo = (id: string) => {
    setActiveNav(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-coal text-foreground">
      {/* TOP BAR */}
      <div className="border-b border-border bg-iron steel-texture">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-6 text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1.5">
              <Icon name="Phone" size={11} />
              +7 (912) 333-32-25
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Icon name="Clock" size={11} />
              Пн–Пт 8:00–18:00
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
            <span className="text-warning animate-pulse-border">● ОНЛАЙН</span>
            <span className="hidden md:block">vyatkalux@yandex.ru</span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-iron border-b border-border shadow-lg shadow-black/40">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
            <div className="w-9 h-9 bg-warning flex items-center justify-center">
              <Icon name="Cog" size={20} className="text-black" />
            </div>
            <div>
              <div className="font-oswald text-lg font-bold text-foreground tracking-wider leading-none">ИЗМЕЛЬЧПРОМ</div>
              <div className="text-[10px] text-muted-foreground font-mono tracking-[0.2em]">INDUSTRIAL EQUIPMENT</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-2 text-xs font-oswald tracking-wider uppercase transition-all ${
                  activeNav === item.id ? "text-warning border-b-2 border-warning" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("contacts")}
              className="hidden md:flex items-center gap-2 bg-warning text-black px-4 py-2 text-xs font-oswald font-bold tracking-wider uppercase hover:bg-amber-400 transition-colors"
            >
              <Icon name="Phone" size={13} />
              Заказать звонок
            </button>
            <button className="lg:hidden p-2 text-muted-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
              <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-iron">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full text-left px-6 py-3.5 text-sm font-oswald tracking-wider uppercase text-muted-foreground hover:text-warning hover:bg-steel/30 transition-colors border-b border-border/50"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/80 to-transparent z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/30589419-8040-421a-8f96-70e5f7c9160c/files/97003c2d-cc32-4fca-a9d3-1c91f37197c2.jpg)` }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-warning" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-warning" />
              <span className="font-mono text-xs tracking-[0.3em] text-warning uppercase">ПРОМЫШЛЕННОЕ ОБОРУДОВАНИЕ</span>
            </div>
            <h1 className="animate-fade-in-up delay-100 font-oswald text-6xl md:text-8xl font-bold text-foreground uppercase leading-none tracking-tight mb-6">
              МОЩЬ<br /><span className="text-warning">МЕТАЛЛА</span><br />В ДЕЛЕ
            </h1>
            <p className="animate-fade-in-up delay-200 text-chrome text-lg leading-relaxed mb-10 max-w-lg font-plex">
              Промышленные измельчители российского производства. Надёжность, подтверждённая тысячами часов работы на реальных производствах.
            </p>
            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("catalog")}
                className="flex items-center justify-center gap-2 bg-warning text-black px-8 py-4 font-oswald font-bold text-base tracking-wider uppercase hover:bg-amber-400 transition-all hover:shadow-lg hover:shadow-warning/20"
              >
                <Icon name="ChevronRight" size={18} />
                Смотреть каталог
              </button>
              <button
                onClick={() => scrollTo("contacts")}
                className="flex items-center justify-center gap-2 border border-chrome/40 text-chrome px-8 py-4 font-oswald font-bold text-base tracking-wider uppercase hover:border-warning hover:text-warning transition-all"
              >
                <Icon name="MessageSquare" size={18} />
                Получить КП
              </button>
            </div>
            <div className="animate-fade-in-up delay-400 mt-14 flex flex-wrap gap-8">
              {[
                { val: "15+", label: "лет на рынке" },
                { val: "800+", label: "единиц продано" },
                { val: "98%", label: "клиентов довольны" },
                { val: "48 ч", label: "сервисный выезд" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-oswald text-3xl font-bold text-warning leading-none">{s.val}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1 tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 warning-stripe opacity-60" />
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 bg-coal">
        <div className="max-w-7xl mx-auto px-4">
          <SectionLabel>Каталог оборудования</SectionLabel>
          <SectionTitle>Измельчители</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="group bg-iron border border-border hover:border-warning/50 transition-all duration-300 flex flex-col">
                <div className="relative bg-steel/40 h-48 steel-texture flex items-center justify-center overflow-hidden">
                  <Icon name="Cog" size={80} className="text-border group-hover:text-steel transition-colors" />
                  <div className={`absolute top-4 left-0 px-3 py-1 text-xs font-oswald font-bold tracking-wider ${p.tagColor}`}>{p.tag}</div>
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
                  <div className="flex items-center justify-between">
                    <div className="font-oswald text-xl font-bold text-foreground">{p.price}</div>
                    <button
                      onClick={() => scrollTo("contacts")}
                      className="bg-warning text-black px-4 py-2 text-xs font-oswald font-bold tracking-wider uppercase hover:bg-amber-400 transition-colors"
                    >
                      Заказать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button className="border border-warning/40 text-warning px-8 py-3 font-oswald font-bold tracking-wider uppercase text-sm hover:bg-warning/10 transition-colors">
              Весь каталог — 24 модели
            </button>
          </div>
        </div>
      </section>

      {/* PARTS */}
      <section id="parts" className="py-24 bg-iron steel-texture">
        <div className="max-w-7xl mx-auto px-4">
          <SectionLabel>Оригинальные детали</SectionLabel>
          <SectionTitle>Запчасти и<br />комплектующие</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTS.map((part) => (
              <div key={part.name} className="group border border-border bg-coal/60 p-5 hover:border-warning/40 hover:bg-coal/80 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-warning/50 transition-colors flex-shrink-0">
                    <Icon name={part.icon} size={18} className="text-warning" fallback="Wrench" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-oswald font-bold text-foreground text-base leading-tight mb-1">{part.name}</div>
                    <div className="text-xs text-muted-foreground font-mono mb-3">{part.material}</div>
                    <div className="flex items-center justify-between">
                      <span className="font-oswald font-bold text-warning text-sm">{part.price}</span>
                      <button
                        onClick={() => scrollTo("contacts")}
                        className="text-xs text-muted-foreground hover:text-warning font-mono tracking-wider transition-colors"
                      >
                        Заказать →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-coal border border-warning/20 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="font-oswald text-lg font-bold text-foreground">Не нашли нужную деталь?</div>
              <div className="text-sm text-muted-foreground font-plex mt-1">Закажем под артикул или пришлите фото — подберём аналог в течение часа</div>
            </div>
            <button
              onClick={() => scrollTo("contacts")}
              className="flex-shrink-0 bg-warning text-black px-6 py-3 font-oswald font-bold tracking-wider uppercase text-sm hover:bg-amber-400 transition-colors"
            >
              Запросить деталь
            </button>
          </div>
        </div>
      </section>

      {/* CONSUMABLES */}
      <section id="consumables" className="py-24 bg-coal">
        <div className="max-w-7xl mx-auto px-4">
          <SectionLabel>Регулярное обслуживание</SectionLabel>
          <SectionTitle>Расходные<br />материалы</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { name: "Смазки и масла (Shell, Mobil)", hint: "Для подшипников и приводов", price: "от 450 ₽/кг" },
                { name: "Фильтры воздушные и масляные", hint: "Оригинальные и аналоги", price: "от 280 ₽/шт" },
                { name: "Абразивные круги и диски", hint: "Для заточки ножей", price: "от 120 ₽/шт" },
                { name: "Крепёж специальный (DIN, ГОСТ)", hint: "Болты, гайки, шпильки М12–М42", price: "от 15 ₽/шт" },
                { name: "Средства защиты (СИЗ)", hint: "Перчатки, очки, беруши", price: "от 90 ₽" },
              ].map((c) => (
                <div key={c.name} className="flex items-center justify-between p-4 border border-border hover:border-warning/30 transition-colors bg-iron/40">
                  <div>
                    <div className="font-oswald font-bold text-sm text-foreground">{c.name}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">{c.hint}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm text-warning font-bold">{c.price}</div>
                    <button onClick={() => scrollTo("contacts")} className="text-xs text-muted-foreground hover:text-warning transition-colors mt-0.5">
                      Заказать →
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-iron border border-border p-8 flex flex-col justify-between steel-texture">
              <div>
                <div className="font-oswald text-3xl font-bold text-foreground mb-2 uppercase">Регламентное<br />обслуживание</div>
                <div className="w-12 h-1 bg-warning mb-6" />
                <p className="text-muted-foreground font-plex text-sm leading-relaxed mb-6">
                  Составим регламент ТО для вашего оборудования и обеспечим поставку всех расходников по графику — без простоев и сюрпризов.
                </p>
                <ul className="space-y-3">
                  {["Ежемесячная поставка по заявке", "Оплата по факту поставки", "Персональный менеджер", "Складской запас под ваш парк"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-chrome font-plex">
                      <div className="w-4 h-4 border border-warning/50 flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-warning" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => scrollTo("contacts")} className="mt-8 bg-warning text-black py-3 font-oswald font-bold tracking-wider uppercase text-sm hover:bg-amber-400 transition-colors w-full">
                Заключить договор на ТО
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-iron steel-texture">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel>О нас</SectionLabel>
              <SectionTitle>Производство<br />с характером</SectionTitle>
              <p className="text-muted-foreground font-plex leading-relaxed mb-6">
                Мы выпускаем промышленные измельчители с 2009 года на собственном производстве в России. Каждая машина проходит 72-часовое нагрузочное тестирование перед отгрузкой.
              </p>
              <p className="text-muted-foreground font-plex leading-relaxed mb-10">
                Конструкторское бюро — 12 инженеров. Производственная площадь — 4 800 м². Собственная термическая обработка ножей и закалка ключевых узлов.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "Factory", label: "Российское производство", sub: "Тверская область" },
                  { icon: "Award", label: "Сертификаты ГОСТ", sub: "Вся линейка продукции" },
                  { icon: "Users", label: "Команда 120 чел.", sub: "Инженеры и технологи" },
                  { icon: "Globe", label: "Экспорт в 8 стран", sub: "СНГ и Европа" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
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
            <div className="relative">
              <div className="bg-coal border border-border p-8">
                <div className="font-mono text-xs text-warning/60 mb-6 tracking-wider">// ТЕХНИЧЕСКИЕ ВОЗМОЖНОСТИ</div>
                {[
                  { label: "Мощность привода", val: "22–250 кВт", pct: 85 },
                  { label: "Производительность", val: "до 80 т/ч", pct: 92 },
                  { label: "Диаметр измельчения", val: "до 350 мм", pct: 70 },
                  { label: "Ресурс ножей", val: "до 200 ч", pct: 78 },
                ].map((spec) => (
                  <div key={spec.label} className="mb-5">
                    <div className="flex justify-between mb-2">
                      <span className="font-oswald text-sm text-chrome uppercase tracking-wide">{spec.label}</span>
                      <span className="font-mono text-sm text-warning font-bold">{spec.val}</span>
                    </div>
                    <div className="h-1 bg-steel/50">
                      <div className="h-full bg-warning transition-all duration-700" style={{ width: `${spec.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-warning/30" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-warning/30" />
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

      {/* REVIEWS */}
      <section className="py-24 bg-iron steel-texture">
        <div className="max-w-7xl mx-auto px-4">
          <SectionLabel>Реальные покупатели</SectionLabel>
          <SectionTitle>Отзывы<br />и рейтинг</SectionTitle>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12 bg-coal border border-border p-6">
            <div className="text-center px-6">
              <div className="font-oswald text-7xl font-bold text-warning leading-none">4.9</div>
              <StarRating rating={5} />
              <div className="text-xs text-muted-foreground font-mono mt-2 tracking-wider">из 5.0</div>
            </div>
            <div className="w-px h-16 bg-border hidden md:block" />
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const counts = [142, 18, 4, 1, 0];
                const total = counts.reduce((a, b) => a + b, 0);
                const count = counts[5 - star];
                return (
                  <div key={star} className="flex items-center gap-3 mb-1.5">
                    <span className="text-warning text-xs w-3">{star}★</span>
                    <div className="flex-1 h-1.5 bg-steel/50">
                      <div className="h-full bg-warning transition-all duration-500" style={{ width: `${(count / total) * 100}%` }} />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground w-6">{count}</span>
                  </div>
                );
              })}
            </div>
            <div className="text-center px-4">
              <div className="font-oswald text-3xl font-bold text-foreground">165</div>
              <div className="text-xs text-muted-foreground font-mono mt-1 tracking-wider">ОТЗЫВОВ</div>
              <button className="mt-4 bg-warning text-black px-4 py-2 text-xs font-oswald font-bold tracking-wider uppercase hover:bg-amber-400 transition-colors">
                Оставить отзыв
              </button>
            </div>
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            {["Все", "5 звёзд", "4 звезды", "Видео-отзывы"].map((f, i) => (
              <button
                key={f}
                onClick={() => setActiveReviewFilter(i)}
                className={`px-4 py-2 text-xs font-oswald font-bold tracking-wider uppercase transition-colors ${
                  activeReviewFilter === i ? "bg-warning text-black" : "border border-border text-muted-foreground hover:border-warning/40 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {REVIEWS.map((r) => (
              <div key={r.author} className="bg-coal border border-border p-6 hover:border-warning/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-steel flex items-center justify-center font-oswald font-bold text-warning text-lg">
                      {r.author[0]}
                    </div>
                    <div>
                      <div className="font-oswald font-bold text-sm text-foreground">{r.author}</div>
                      <div className="text-xs text-muted-foreground font-mono">{r.company}</div>
                    </div>
                  </div>
                  <StarRating rating={r.rating} />
                </div>
                <p className="text-muted-foreground text-sm font-plex leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground/60">{r.date}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="ThumbsUp" size={11} />
                    Полезно
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WARRANTY */}
      <section id="warranty" className="py-24 bg-coal">
        <div className="max-w-7xl mx-auto px-4">
          <SectionLabel>Надёжность</SectionLabel>
          <SectionTitle>Гарантия<br />и сервис</SectionTitle>
          <div className="grid md:grid-cols-4 gap-5 mb-12">
            {WARRANTY_ITEMS.map((w) => (
              <div key={w.label} className="bg-iron border border-border p-6 text-center group hover:border-warning/40 transition-colors">
                <div className="w-12 h-12 border border-warning/30 flex items-center justify-center mx-auto mb-4 group-hover:border-warning transition-colors">
                  <Icon name={w.icon} size={22} className="text-warning" fallback="Shield" />
                </div>
                <div className="font-oswald text-4xl font-bold text-warning mb-2">{w.period}</div>
                <div className="text-xs text-muted-foreground font-plex leading-tight">{w.label}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-iron border border-border p-8">
              <h3 className="font-oswald text-xl font-bold text-foreground uppercase tracking-wide mb-5">Условия гарантии</h3>
              <ul className="space-y-3">
                {[
                  "Бесплатная замена дефектных узлов в течение гарантийного срока",
                  "Выезд сервисного инженера в течение 48 часов",
                  "Гарантия сохраняется при использовании оригинальных расходников",
                  "Восстановление работоспособности в срок до 5 рабочих дней",
                  "Подменный фонд ключевых агрегатов для срочных случаев",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground font-plex">
                    <Icon name="CheckCircle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-iron border border-border p-8">
              <h3 className="font-oswald text-xl font-bold text-foreground uppercase tracking-wide mb-5">Сервисная сеть</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { city: "Москва", type: "Сервисный центр" },
                  { city: "СПб", type: "Партнёрский СЦ" },
                  { city: "Екатеринбург", type: "Сервисный центр" },
                  { city: "Новосибирск", type: "Выездной сервис" },
                  { city: "Краснодар", type: "Партнёрский СЦ" },
                  { city: "Казань", type: "Выездной сервис" },
                ].map((c) => (
                  <div key={c.city} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-warning flex-shrink-0" />
                    <div>
                      <div className="font-oswald text-sm font-bold text-foreground">{c.city}</div>
                      <div className="text-xs text-muted-foreground font-mono">{c.type}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo("contacts")} className="w-full border border-warning/40 text-warning py-3 font-oswald font-bold tracking-wider uppercase text-sm hover:bg-warning/10 transition-colors">
                Вызвать сервисного инженера
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-iron steel-texture">
        <div className="max-w-7xl mx-auto px-4">
          <SectionLabel>Связь</SectionLabel>
          <SectionTitle>Контакты</SectionTitle>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              {[
                { icon: "Phone", label: "Телефон отдела продаж", val: "+7 (912) 333-32-25", sub: "Бесплатно по России, Пн–Пт 8–18" },
                { icon: "Mail", label: "Email", val: "vyatkalux@yandex.ru", sub: "Ответ в течение 2 часов" },
                { icon: "MapPin", label: "Офис и производство", val: "г. Тверь, ул. Промышленная, 42", sub: "Заезд по предварительной договорённости" },
                { icon: "MessageCircle", label: "WhatsApp / Telegram", val: "+7 (900) 000-11-22", sub: "Быстрые ответы в мессенджерах" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-warning/30 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={16} className="text-warning" fallback="Phone" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-mono tracking-wider mb-1">{c.label}</div>
                    <div className="font-oswald font-bold text-lg text-foreground">{c.val}</div>
                    <div className="text-xs text-muted-foreground font-plex mt-0.5">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-coal border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-warning flex items-center justify-center">
                <Icon name="Cog" size={16} className="text-black" />
              </div>
              <div>
                <div className="font-oswald text-base font-bold text-foreground tracking-wider">ИЗМЕЛЬЧПРОМ</div>
                <div className="text-[10px] text-muted-foreground font-mono tracking-[0.2em]">INDUSTRIAL EQUIPMENT</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-xs text-muted-foreground hover:text-warning font-oswald tracking-wider uppercase transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground/60 font-mono">© 2009–2026 ИЗМЕЛЬЧПРОМ. Все права защищены.</div>
            <div className="flex gap-6 text-xs text-muted-foreground/60 font-mono">
              <span className="cursor-pointer hover:text-warning transition-colors">Политика конфиденциальности</span>
              <span className="cursor-pointer hover:text-warning transition-colors">Оферта</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}