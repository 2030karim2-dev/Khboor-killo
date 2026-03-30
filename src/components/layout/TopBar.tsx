export default function TopBar() {
  return (
    <div className="gradient-primary text-white text-sm py-1.5">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <span>شحن مجاني للطلبات فوق 200 ر.س</span>
        <div className="hidden md:flex gap-4 items-center">
          <span>📱 تطبيق خبور متاح الآن</span>
          <span>|</span>
          <span>📞 920001234</span>
        </div>
      </div>
    </div>
  );
}
