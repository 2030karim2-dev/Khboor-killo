"use client";

import { useState } from "react";
import { Plus, Package, Briefcase } from "lucide-react";
import { Breadcrumb } from "@/components/ui";
import SellerStats from "@/components/sell/SellerStats";
import NewProductForm from "@/components/sell/NewProductForm";
import NewServiceForm from "@/components/sell/NewServiceForm";
import SellerListings from "@/components/sell/SellerListings";

export default function SellPage() {
  const [activeTab, setActiveTab] = useState<"new" | "service" | "listings">("new");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "لوحة البائع" },
        ]}
      />

      <SellerStats />

      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setActiveTab("new")}
          className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            activeTab === "new"
              ? "bg-sky-500 text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Plus size={16} className="inline-block ml-1" />
          إضافة منتج
        </button>
        <button
          onClick={() => setActiveTab("service")}
          className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            activeTab === "service"
              ? "bg-orange-500 text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Briefcase size={16} className="inline-block ml-1" />
          إضافة خدمة/مهنة
        </button>
        <button
          onClick={() => setActiveTab("listings")}
          className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            activeTab === "listings"
              ? "bg-sky-500 text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Package size={16} className="inline-block ml-1" />
          منتجاتي
        </button>
      </div>

      {activeTab === "new" && <NewProductForm />}
      {activeTab === "service" && <NewServiceForm />}
      {activeTab === "listings" && <SellerListings />}
    </div>
  );
}
