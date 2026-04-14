"use client";

import { CITIES } from "@/lib";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CheckoutInput } from "@/lib/validations";

interface ShippingFormProps {
  register: UseFormRegister<CheckoutInput>;
  errors: FieldErrors<CheckoutInput>;
}

export default function ShippingForm({ register, errors }: ShippingFormProps) {
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
            {...register("firstName")}
            placeholder="أدخل اسمك الأول"
            aria-invalid={!!errors.firstName}
            className={`w-full px-4 py-2.5 rounded-xl border transition-colors text-right focus:outline-none ${
              errors.firstName ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
            }`}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="ship-lastName" className="block text-sm font-medium text-slate-700 mb-1.5">
            الاسم الأخير <span className="text-red-500">*</span>
          </label>
          <input
            id="ship-lastName"
            type="text"
            {...register("lastName")}
            placeholder="أدخل اسمك الأخير"
            aria-invalid={!!errors.lastName}
            className={`w-full px-4 py-2.5 rounded-xl border transition-colors text-right focus:outline-none ${
              errors.lastName ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
            }`}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="ship-phone" className="block text-sm font-medium text-slate-700 mb-1.5">
            رقم الجوال <span className="text-red-500">*</span>
          </label>
          <input
            id="ship-phone"
            type="tel"
            {...register("phone")}
            placeholder="7XXXXXXXX"
            dir="ltr"
            aria-invalid={!!errors.phone}
            className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none ${
              errors.phone ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
            }`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="ship-city" className="block text-sm font-medium text-slate-700 mb-1.5">
            المدينة <span className="text-red-500">*</span>
          </label>
          <select
            id="ship-city"
            {...register("city")}
            className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none transition-colors bg-white ${
              errors.city ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
            }`}
          >
            <option value="">اختر المدينة</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="ship-address" className="block text-sm font-medium text-slate-700 mb-1.5">
            العنوان التفصيلي <span className="text-red-500">*</span>
          </label>
          <textarea
            id="ship-address"
            rows={3}
            {...register("address")}
            placeholder="الحي، الشارع، رقم المبنى..."
            aria-invalid={!!errors.address}
            className={`w-full px-4 py-2.5 rounded-xl border transition-colors text-right resize-none focus:outline-none ${
              errors.address ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
            }`}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>
      </div>
    </div>
  );
}