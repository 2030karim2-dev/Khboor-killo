import { CreditCard, Banknote } from "lucide-react";

export default function PaymentForm() {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4">طريقة الدفع</h2>
      <div className="space-y-3">
        <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-sky-500 bg-sky-50 cursor-pointer">
          <input
            type="radio"
            name="payment"
            defaultChecked
            className="accent-sky-500"
          />
          <CreditCard size={20} className="text-sky-600" />
          <div>
            <p className="font-medium text-slate-800">بطاقة ائتمانية</p>
            <p className="text-xs text-slate-500">فيزا / ماستركارد</p>
          </div>
        </label>
        <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-sky-300 cursor-pointer transition-colors">
          <input
            type="radio"
            name="payment"
            className="accent-sky-500"
          />
          <Banknote size={20} className="text-slate-600" />
          <div>
            <p className="font-medium text-slate-800">الدفع عند الاستلام</p>
            <p className="text-xs text-slate-500">
              ادفع نقداً عند وصول طلبك
            </p>
          </div>
        </label>
      </div>

      {/* Card details */}
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            رقم البطاقة
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
            placeholder="0000 0000 0000 0000"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            تاريخ الانتهاء
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
            placeholder="MM/YY"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            CVV
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
            placeholder="***"
            dir="ltr"
          />
        </div>
      </div>
    </div>
  );
}
