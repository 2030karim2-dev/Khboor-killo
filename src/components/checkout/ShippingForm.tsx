export default function ShippingForm() {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4">معلومات الشحن</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            الاسم الأول
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
            placeholder="أدخل اسمك الأول"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            الاسم الأخير
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
            placeholder="أدخل اسمك الأخير"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            رقم الجوال
          </label>
          <input
            type="tel"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
            placeholder="05xxxxxxxx"
            dir="ltr"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            المدينة
          </label>
          <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white">
            <option>الرياض</option>
            <option>جدة</option>
            <option>الدمام</option>
            <option>مكة المكرمة</option>
            <option>المدينة المنورة</option>
            <option>أبها</option>
            <option>تبوك</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            العنوان التفصيلي
          </label>
          <textarea
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right resize-none"
            placeholder="الحي، الشارع، رقم المبنى..."
          />
        </div>
      </div>
    </div>
  );
}
