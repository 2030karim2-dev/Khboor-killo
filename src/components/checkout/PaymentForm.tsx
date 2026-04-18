"use client";

import { CreditCard, Banknote, Building2, Wallet, Smartphone } from "lucide-react";
import { useController, type Control, type FieldErrors } from "react-hook-form";
import type { CheckoutInput } from "@/lib/validations";

interface PaymentFormProps {
  control: Control<CheckoutInput>;
  paymentMethod: "card" | "cash" | "bank" | "wallet";
  errors: FieldErrors<CheckoutInput>;
}

const paymentMethods = [
  { value: "cash", icon: Banknote, label: "الدفع عند الاستلام", desc: "ادفع نقداً عند وصول طلبك" },
  { value: "card", icon: CreditCard, label: "بطاقة ائتمانية", desc: "فيزا / ماستركارد" },
  { value: "bank", icon: Building2, label: "تحويل بنكي", desc: "تحويل على الحساب البنكي" },
  { value: "wallet", icon: Wallet, label: "محفظة إلكترونية", desc: "Sadad / Mada / Apple Pay" },
];

export default function PaymentForm({ control, paymentMethod, errors }: PaymentFormProps) {
  const { field: methodField } = useController({
    name: "paymentMethod",
    control,
  });

  const { field: cardNumberField } = useController({
    name: "cardNumber",
    control,
  });

  const { field: cardExpiryField } = useController({
    name: "cardExpiry",
    control,
  });

  const { field: cardCvvField } = useController({
    name: "cardCvv",
    control,
  });

  return (
    <div className="card p-6 dark:bg-slate-800">
      <fieldset>
        <legend className="text-lg font-bold text-slate-800 dark:text-white mb-4">طريقة الدفع</legend>
        <div className="grid md:grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <label
              key={method.value}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                methodField.value === method.value
                  ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20"
                  : "border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-600"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.value}
                checked={methodField.value === method.value}
                onChange={() => methodField.onChange(method.value)}
                className="accent-sky-500"
              />
              <method.icon
                size={20}
                className={methodField.value === method.value ? "text-sky-600" : "text-slate-500"}
                aria-hidden="true"
              />
              <div>
                <p className="font-medium text-slate-800 dark:text-white">{method.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{method.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </fieldset>

      {paymentMethod === "card" && (
        <div className="mt-6 grid md:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
          <div className="md:col-span-2">
            <label htmlFor="card-number" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              رقم البطاقة
            </label>
            <input
              id="card-number"
              type="text"
              {...cardNumberField}
              placeholder="0000 0000 0000 0000"
              dir="ltr"
              maxLength={19}
              aria-invalid={!!errors.cardNumber}
              className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none bg-white dark:bg-slate-800 ${
                errors.cardNumber ? "border-red-300 bg-red-50/50" : "border-slate-200 dark:border-slate-700 focus:border-sky-500"
              }`}
            />
            {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber.message}</p>}
          </div>
          <div>
            <label htmlFor="card-expiry" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              تاريخ الانتهاء
            </label>
            <input
              id="card-expiry"
              type="text"
              {...cardExpiryField}
              placeholder="MM/YY"
              dir="ltr"
              maxLength={5}
              aria-invalid={!!errors.cardExpiry}
              className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none bg-white dark:bg-slate-800 ${
                errors.cardExpiry ? "border-red-300 bg-red-50/50" : "border-slate-200 dark:border-slate-700 focus:border-sky-500"
              }`}
            />
            {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry.message}</p>}
          </div>
          <div>
            <label htmlFor="card-cvv" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              CVV
            </label>
            <input
              id="card-cvv"
              type="text"
              {...cardCvvField}
              placeholder="***"
              dir="ltr"
              maxLength={4}
              aria-invalid={!!errors.cardCvv}
              className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none bg-white dark:bg-slate-800 ${
                errors.cardCvv ? "border-red-300 bg-red-50/50" : "border-slate-200 dark:border-slate-700 focus:border-sky-500"
              }`}
            />
            {errors.cardCvv && <p className="text-red-500 text-xs mt-1">{errors.cardCvv.message}</p>}
          </div>
        </div>
      )}

      {paymentMethod === "bank" && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-3">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">معلومات الحساب البنكي:</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
              <p className="text-slate-500 dark:text-slate-400">اسم البنك</p>
              <p className="font-medium text-slate-800 dark:text-white">البنك الأهلي التجاري</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
              <p className="text-slate-500 dark:text-slate-400">رقم الحساب</p>
              <p className="font-medium text-slate-800 dark:text-white">SA1234567890123456789012</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg md:col-span-2">
              <p className="text-slate-500 dark:text-slate-400">اسم المستفيد</p>
              <p className="font-medium text-slate-800 dark:text-white">متجر خبور للتجارة</p>
            </div>
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400">
            ⚠️ يرجى إرسال إشعار الدفع عبر الواتساب بعد التحويل
          </p>
        </div>
      )}

      {paymentMethod === "wallet" && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-3">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">المحافظ المتاحة:</p>
          <div className="flex flex-wrap gap-3">
            {["Sadad", "Mada", "Apple Pay", "STC Pay"].map((wallet) => (
              <button
                key={wallet}
                type="button"
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-sky-500 transition-colors"
              >
                {wallet}
              </button>
            ))}
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400">
            ⚠️ سيتم إرسال رابط الدفع على رقم هاتفك
          </p>
        </div>
      )}
    </div>
  );
}