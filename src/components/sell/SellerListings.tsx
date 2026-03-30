const listings = [
  { name: "تويوتا كامري 2024", price: "125,000", status: "نشط", views: 234 },
  { name: "طقم فرامل أصلي", price: "450", status: "نشط", views: 89 },
  { name: "بطارية سيارة 100 أمبير", price: "380", status: "قيد المراجعة", views: 45 },
];

export default function SellerListings() {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        منتجاتي المعروضة
      </h2>
      {listings.map((item, i) => (
        <div key={i} className="card p-4 flex items-center gap-4">
          <div className="w-16 h-16 bg-slate-100 rounded-xl shrink-0 flex items-center justify-center text-2xl">
            📦
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800">{item.name}</h3>
            <p className="text-sm text-slate-500">{item.price} ر.س</p>
          </div>
          <div className="text-left">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                item.status === "نشط"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {item.status}
            </span>
            <p className="text-xs text-slate-400 mt-1">{item.views} مشاهدة</p>
          </div>
        </div>
      ))}
    </div>
  );
}
