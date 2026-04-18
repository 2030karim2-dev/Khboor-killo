"use client";

import { useState } from "react";
import { Truck, MapPin, Package, Clock, CheckCircle } from "lucide-react";

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  icon: typeof Truck;
}

const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    name: "توصيل عادي",
    description: "3-5 أيام عمل",
    price: 25,
    estimatedDays: "3-5 أيام",
    icon: Truck,
  },
  {
    id: "express",
    name: "توصيل سريع",
    description: "يوم واحد",
    price: 50,
    estimatedDays: "يوم واحد",
    icon: Clock,
  },
  {
    id: "pickup",
    name: "استلام من المستودع",
    description: "استلم من أقرب مستودع",
    price: 0,
    estimatedDays: "فوري",
    icon: Package,
  },
];

const cities = [
  { name: "صنعاء", zone: "central" },
  { name: "عدن", zone: "south" },
  { name: "تعز", zone: "central" },
  { name: "الحديدة", zone: "west" },
  { name: "إب", zone: "central" },
  { name: "حضرموت", zone: "east" },
  { name: "ذمار", zone: "central" },
  { name: "البيضاء", zone: "central" },
];

export default function ShippingCalculator() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedOption, setSelectedOption] = useState("standard");
  const [showResult, setShowResult] = useState(false);

  const selectedShipping = shippingOptions.find((opt) => opt.id === selectedOption);
  const selectedCityData = cities.find((c) => c.name === selectedCity);

  const handleCalculate = () => {
    if (selectedCity) {
      setShowResult(true);
    }
  };

  return (
    <div className="card p-6 dark:bg-slate-800">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
        <Truck size={20} className="text-sky-500" />
        خيارات الشحن
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="city-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            اختر المدينة
          </label>
          <select
            id="city-select"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setShowResult(false);
            }}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
          >
            <option value="">اختر المدينة...</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCity && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              خيارات التوصيل المتاحة لـ {selectedCity}:
            </p>
            {shippingOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  selectedOption === option.id
                    ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20"
                    : "border-slate-200 dark:border-slate-700 hover:border-sky-300"
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => setSelectedOption(option.id)}
                  className="accent-sky-500"
                />
                <option.icon
                  size={20}
                  className={selectedOption === option.id ? "text-sky-600" : "text-slate-500"}
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-800 dark:text-white">{option.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{option.estimatedDays}</p>
                </div>
                <span
                  className={`font-bold ${
                    option.price === 0
                      ? "text-emerald-500"
                      : "text-slate-800 dark:text-white"
                  }`}
                >
                  {option.price === 0 ? "مجاني" : `${option.price} ر.ي`}
                </span>
              </label>
            ))}
          </div>
        )}

        {showResult && selectedShipping && (
          <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle size={18} />
              <span className="font-medium">توصيل {selectedShipping.name}</span>
            </div>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
              التكلفة: {selectedShipping.price === 0 ? "مجاني" : `${selectedShipping.price} ر.ي`}
            </p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              الوقت المتوقع: {selectedShipping.estimatedDays}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}