"use client";

import { CreditCard, Banknote } from "lucide-react";

export interface PaymentData {
  method: "card" | "cash";
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
}

interface PaymentFormProps {
  data: PaymentData;
  onChange: (data: PaymentData) => void;
  errors?: Partial<Record<keyof PaymentData, string>>;
}

export default function PaymentForm({ data, onChange, errors }: PaymentFormProps) {
  const update = (field: keyof PaymentData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="card p-6">
      <fieldset>
        <legend className="text-lg font-bold text-slate-800 mb-4">طريقة الدفع</legend>
        <div className="space-y-3">
          <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
            data.method === "card" ? "border-sky-500 bg-sky-50" : "border-slate-200 hover:border-sky-300"
          }`}>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={data.method === "card"}
              onChange={() => update("method", "card")}
              className="accent-sky-500"
            />
            <CreditCard size={20} className="text-sky-600" aria-hidden="true" />
            <div>
              <p className="font-medium text-slate-800">بطاقة ائتمانية</p>
              <p className="text-xs text-slate-500">فيزا / ماستركارد</p>
            </div>
          </label>
          <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
            data.method === "cash" ? "border-sky-500 bg-sky-50" : "border-slate-200 hover:border-sky-300"
          }`}>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={data.method === "cash"}
              onChange={() => update("method", "cash")}
              className="accent-sky-500"
            />
            <Banknote size={20} className="text-slate-600" aria-hidden="true" />
            <div>
              <p className="font-medium text-slate-800">الدفع عند الاستلام</p>
              <p className="text-xs text-slate-500">ادفع نقداً عند وصول طلبك</p>
            </div>
          </label>
        </div>
      </fieldset>

      {data.method === "card" && (
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="card-number" className="block text-sm font-medium text-slate-700 mb-1.5">
              رقم البطاقة
            </label>
            <input
              id="card-number"
              type="text"
              value={data.cardNumber}
              onChange={(e) => update("cardNumber", e.target.value)}
              placeholder="0000 0000 0000 0000"
              dir="ltr"
              maxLength={19}
              aria-invalid={!!errors?.cardNumber}
              className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none ${
                errors?.cardNumber ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
              }`}
            />
            {errors?.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
          </div>
          <div>
            <label htmlFor="card-expiry" className="block text-sm font-medium text-slate-700 mb-1.5">
              تاريخ الانتهاء
            </label>
            <input
              id="card-expiry"
              type="text"
              value={data.cardExpiry}
              onChange={(e) => update("cardExpiry", e.target.value)}
              placeholder="MM/YY"
              dir="ltr"
              maxLength={5}
              aria-invalid={!!errors?.cardExpiry}
              className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none ${
                errors?.cardExpiry ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
              }`}
            />
            {errors?.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
          </div>
          <div>
            <label htmlFor="card-cvv" className="block text-sm font-medium text-slate-700 mb-1.5">
              CVV
            </label>
            <input
              id="card-cvv"
              type="text"
              value={data.cardCvv}
              onChange={(e) => update("cardCvv", e.target.value)}
              placeholder="***"
              dir="ltr"
              maxLength={4}
              aria-invalid={!!errors?.cardCvv}
              className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none ${
                errors?.cardCvv ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
              }`}
            />
            {errors?.cardCvv && <p className="text-red-500 text-xs mt-1">{errors.cardCvv}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
