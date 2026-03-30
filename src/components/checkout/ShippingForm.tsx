"use client";

import { CITIES } from "@/lib";

export interface ShippingData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  address: string;
}

interface ShippingFormProps {
  data: ShippingData;
  onChange: (data: ShippingData) => void;
  errors?: Partial<Record<keyof ShippingData, string>>;
}

export default function ShippingForm({ data, onChange, errors }: ShippingFormProps) {
  const update = (field: keyof ShippingData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="card p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4">معلومات الشحن</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ship-firstName" className="block text-sm font-medium text-slate-700 mb-1.5">
            الاسم الأول <span className="text-red-500">*</span>
          </label>
          <input
            id="ship-firstName"
            type="text"
            value={data.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            placeholder="أدخل اسمك الأول"
            aria-invalid={!!errors?.firstName}
            className={`w-full px-4 py-2.5 rounded-xl border transition-colors text-right focus:outline-none ${
              errors?.firstName ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
            }`}
          />
          {errors?.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="ship-lastName" className="block text-sm font-medium text-slate-700 mb-1.5">
            الاسم الأخير <span className="text-red-500">*</span>
          </label>
          <input
            id="ship-lastName"
            type="text"
            value={data.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            placeholder="أدخل اسمك الأخير"
            aria-invalid={!!errors?.lastName}
            className={`w-full px-4 py-2.5 rounded-xl border transition-colors text-right focus:outline-none ${
              errors?.lastName ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
            }`}
          />
          {errors?.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="ship-phone" className="block text-sm font-medium text-slate-700 mb-1.5">
            رقم الجوال <span className="text-red-500">*</span>
          </label>
          <input
            id="ship-phone"
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="05xxxxxxxx"
            dir="ltr"
            aria-invalid={!!errors?.phone}
            className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none ${
              errors?.phone ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
            }`}
          />
          {errors?.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="ship-city" className="block text-sm font-medium text-slate-700 mb-1.5">
            المدينة <span className="text-red-500">*</span>
          </label>
          <select
            id="ship-city"
            value={data.city}
            onChange={(e) => update("city", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white"
          >
            <option value="">اختر المدينة</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors?.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="ship-address" className="block text-sm font-medium text-slate-700 mb-1.5">
            العنوان التفصيلي <span className="text-red-500">*</span>
          </label>
          <textarea
            id="ship-address"
            rows={3}
            value={data.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="الحي، الشارع، رقم المبنى..."
            aria-invalid={!!errors?.address}
            className={`w-full px-4 py-2.5 rounded-xl border transition-colors text-right resize-none focus:outline-none ${
              errors?.address ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
            }`}
          />
          {errors?.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>
      </div>
    </div>
  );
}
