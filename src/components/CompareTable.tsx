import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const COMPARE_DATA = [
  {
    slug: "rubitel-e2",
    name: "Rubitel-E2",
    type: "Электро 220В",
    power: "2.2 кВт",
    diameter: "до 50 мм",
    capacity: "0.5 м³/ч",
    weight: "54 кг",
    price: "45 000 ₽",
    bestFor: "Дача, балкон",
    accent: false,
  },
  {
    slug: "rubitel-s",
    name: "Rubitel-S",
    type: "Бензин",
    power: "7 л.с.",
    diameter: "до 60 мм",
    capacity: "0.5 м³/ч",
    weight: "54 кг",
    price: "45 000 ₽",
    bestFor: "Сад, поле",
    accent: true,
  },
  {
    slug: "rubitel-e5",
    name: "Rubitel-E5",
    type: "Электро 380В",
    power: "5.5 кВт",
    diameter: "до 65 мм",
    capacity: "0.7 м³/ч",
    weight: "72 кг",
    price: "65 000 ₽",
    bestFor: "Сад+, тихая работа",
    accent: false,
  },
  {
    slug: "rubitel-x",
    name: "Rubitel-X",
    type: "Бензин",
    power: "21 л.с.",
    diameter: "до 100 мм",
    capacity: "1.5 м³/ч",
    weight: "156 кг",
    price: "135 000 ₽",
    bestFor: "Бизнес, лесхоз",
    accent: false,
  },
];

const ROWS: { label: string; key: keyof typeof COMPARE_DATA[0] }[] = [
  { label: "Тип питания", key: "type" },
  { label: "Мощность", key: "power" },
  { label: "Диаметр веток", key: "diameter" },
  { label: "Производительность", key: "capacity" },
  { label: "Масса", key: "weight" },
  { label: "Цена", key: "price" },
  { label: "Подходит для", key: "bestFor" },
];

export default function CompareTable() {
  return (
    <div className="mt-12 mb-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-warning tracking-[0.3em] uppercase mb-3">
          <span className="w-8 h-px bg-warning" />
          Сравнение моделей
          <span className="w-8 h-px bg-warning" />
        </div>
        <h3 className="font-oswald text-2xl md:text-3xl font-bold text-foreground">
          Какой измельчитель выбрать?
        </h3>
      </div>

      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <table className="w-full min-w-[640px] border-collapse bg-iron border border-border">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-mono text-[10px] tracking-wider uppercase text-muted-foreground sticky left-0 bg-iron z-10">
                Параметр
              </th>
              {COMPARE_DATA.map((item) => (
                <th
                  key={item.slug}
                  className={`p-4 text-center font-oswald font-bold text-base md:text-lg tracking-wide ${
                    item.accent ? "text-warning bg-warning/5" : "text-foreground"
                  }`}
                >
                  {item.name}
                  {item.accent && (
                    <div className="text-[9px] mt-1 font-mono tracking-widest text-warning">
                      ★ ХИТ ПРОДАЖ
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, rowIdx) => (
              <tr
                key={row.key}
                className={`border-b border-border/50 ${rowIdx % 2 === 1 ? "bg-coal/40" : ""}`}
              >
                <td className="p-4 font-mono text-[11px] tracking-wider uppercase text-muted-foreground sticky left-0 bg-inherit z-10">
                  {row.label}
                </td>
                {COMPARE_DATA.map((item) => (
                  <td
                    key={item.slug}
                    className={`p-4 text-center text-sm font-plex ${
                      row.key === "price"
                        ? "font-oswald text-base font-bold text-warning"
                        : "text-foreground"
                    } ${item.accent ? "bg-warning/5" : ""}`}
                  >
                    {item[row.key]}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-4 sticky left-0 bg-iron z-10" />
              {COMPARE_DATA.map((item) => (
                <td
                  key={item.slug}
                  className={`p-4 text-center ${item.accent ? "bg-warning/5" : ""}`}
                >
                  <Link
                    to={`/product/${item.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-warning font-mono tracking-wider transition-colors"
                  >
                    Подробнее
                    <Icon name="ArrowRight" size={12} />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="md:hidden mt-3 text-center">
        <span className="text-[11px] text-muted-foreground font-mono tracking-wider">
          ← листайте таблицу →
        </span>
      </div>
    </div>
  );
}
