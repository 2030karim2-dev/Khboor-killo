"use client";

import { useState } from "react";
import { Plus, Package } from "lucide-react";
import { Breadcrumb } from "@/components/ui";
import SellerStats from "@/components/sell/SellerStats";
import NewProductForm from "@/components/sell/NewProductForm";
import SellerListings from "@/components/sell/SellerListings";

export default function SellPage() {
  const [activeTab, setActiveTab] = useState<"new" | "listings">("new");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "لوحة البائع" },
        ]}
      />

      <SellerStats />

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("new")}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            activeTab === "new"
              ? "bg-sky-500 text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Plus size={16} className="inline-block ml-1" />
          إضافة منتج جديد
        </button>
        <button
          onClick={() => setActiveTab("listings")}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            activeTab === "listings"
              ? "bg-sky-500 text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Package size={16} className="inline-block ml-1" />
          منتجاتي
        </button>
      </div>

      {activeTab === "new" ? <NewProductForm /> : <SellerListings />}
    </div>
  );
}
