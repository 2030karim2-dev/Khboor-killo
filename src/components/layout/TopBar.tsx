export default function TopBar() {
  return (
    <div className="gradient-primary text-white text-xs py-1">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <span>شحن مجاني للطلبات فوق 200 ر.س</span>
        <div className="hidden md:flex gap-3 items-center text-[11px]">
          <span>📱 تطبيق خبور</span>
          <span>|</span>
          <span>📞 920001234</span>
        </div>
      </div>
    </div>
  );
}
