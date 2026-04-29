import { useState, useEffect } from "react";

const YOKASSA_URL = "/pay.php";

async function payWithYokassa(amount: number, description: string, email: string, phone: string, quantity: number = 1) {
  try {
    const res = await fetch(YOKASSA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        description,
        email: email || undefined,
        phone: phone || undefined,
        return_url: "https://rubitel.ru",
        quantity,
      }),
    });
    const text = await res.text();
    let data: { confirmation_url?: string; error?: string } = {};
    try { data = JSON.parse(text); } catch { data = { error: text.slice(0, 200) }; }

    if (data.confirmation_url) {
      window.location.href = data.confirmation_url;
    } else {
      const reason = data.error || `HTTP ${res.status}`;
      alert("Ошибка оплаты: " + reason);
    }
  } catch (e) {
    alert("Сеть недоступна: " + (e instanceof Error ? e.message : "unknown"));
  }
}

export default function PayButton({ amount, description, showQty = false }: { amount: number; description: string; showQty?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qty, setQty] = useState(1);

  const totalAmount = amount * qty;

  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showModal]);

  const handlePay = async () => {
    const hasEmail = email && email.includes("@");
    const hasPhone = phone && phone.replace(/\D/g, "").length >= 10;
    if (!hasEmail && !hasPhone) {
      alert("Введите email или телефон для получения чека");
      return;
    }
    setLoading(true);
    setShowModal(false);
    await payWithYokassa(totalAmount, description, email, phone, qty);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => { setQty(1); setShowModal(true); }}
        disabled={loading}
        className="w-full border border-green-700/60 text-green-400 px-4 py-2.5 text-xs font-oswald font-bold tracking-wider uppercase hover:bg-green-900/30 hover:border-green-600 transition-colors disabled:opacity-60 min-h-[40px]"
      >
        {loading ? "..." : "Оплатить онлайн"}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowModal(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="pay-modal-title" className="bg-white text-black p-6 w-80 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div id="pay-modal-title" className="font-oswald font-bold text-lg mb-1">Оплата</div>

            {showQty && (
              <div className="flex items-center justify-between mb-4 border border-gray-200 p-3">
                <span className="text-sm text-gray-600">Количество комплектов</span>
                <div className="flex items-center gap-3">
                  <button aria-label="Уменьшить количество" onClick={() => setQty(q => Math.max(1, q - 1))} className="w-7 h-7 border border-gray-300 flex items-center justify-center text-lg font-bold hover:border-green-600 transition-colors">−</button>
                  <span className="font-oswald font-bold text-base w-4 text-center" aria-live="polite">{qty}</span>
                  <button aria-label="Увеличить количество" onClick={() => setQty(q => q + 1)} className="w-7 h-7 border border-gray-300 flex items-center justify-center text-lg font-bold hover:border-green-600 transition-colors">+</button>
                </div>
              </div>
            )}

            {showQty && (
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">Итого:</span>
                <span className="font-oswald font-bold text-green-600 text-base">{totalAmount.toLocaleString("ru-RU")} ₽</span>
              </div>
            )}

            <div className="text-sm text-gray-600 mb-3">Укажите email или телефон — на него придёт чек</div>
            <input
              type="email"
              placeholder="Email (your@email.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-sm mb-2 outline-none focus:border-green-600"
              autoFocus
            />
            <div className="text-xs text-center text-gray-400 mb-2">или</div>
            <input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "");
                if (val === "") { setPhone(""); return; }
                if (val.startsWith("8")) val = "7" + val.slice(1);
                if (!val.startsWith("7")) val = "7" + val;
                val = val.slice(0, 11);
                let formatted = "+7";
                if (val.length > 1) formatted += " (" + val.slice(1, 4);
                if (val.length >= 4) formatted += ") " + val.slice(4, 7);
                if (val.length >= 7) formatted += "-" + val.slice(7, 9);
                if (val.length >= 9) formatted += "-" + val.slice(9, 11);
                setPhone(formatted);
              }}
              onKeyDown={(e) => e.key === "Enter" && handlePay()}
              className="w-full border border-gray-300 px-3 py-2 text-sm mb-4 outline-none focus:border-green-600"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-xs text-gray-500 hover:text-black transition-colors">
                Отмена
              </button>
              <button onClick={handlePay} className="bg-green-600 text-white px-4 py-2 text-xs font-oswald font-bold uppercase hover:bg-green-500 transition-colors">
                Перейти к оплате
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}