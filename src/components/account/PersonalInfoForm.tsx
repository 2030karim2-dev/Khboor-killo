export default function PersonalInfoForm() {
  return (
    <div className="card p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6">
        المعلومات الشخصية
      </h2>
      <form className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              الاسم الأول
            </label>
            <input
              type="text"
              defaultValue="أحمد"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              الاسم الأخير
            </label>
            <input
              type="text"
              defaultValue="محمد"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            defaultValue="ahmed@email.com"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            رقم الجوال
          </label>
          <input
            type="tel"
            defaultValue="0501234567"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            المدينة
          </label>
          <select className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white">
            <option>الرياض</option>
            <option>جدة</option>
            <option>الدمام</option>
          </select>
        </div>
        <button type="submit" className="btn-primary">
          حفظ التغييرات
        </button>
      </form>
    </div>
  );
}
