"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Plus, Package, Briefcase } from "lucide-react";
import { Breadcrumb } from "@/components/ui";
import SellerStats from "@/components/sell/SellerStats";

const NewProductForm = dynamic(() => import("@/components/sell/NewProductForm"), { loading: () => <div className="animate-pulse h-64 bg-slate-100 rounded-xl" /> });
const NewServiceForm = dynamic(() => import("@/components/sell/NewServiceForm"), { loading: () => <div className="animate-pulse h-64 bg-slate-100 rounded-xl" /> });
const SellerListings = dynamic(() => import("@/components/sell/SellerListings"), { loading: () => <div className="animate-pulse h-64 bg-slate-100 rounded-xl" /> });

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

      <div className="flex gap-2 mb-6 flex-wrap" role="tablist" aria-label="أقسام لوحة البائع">
        <button
          role="tab"
          aria-selected={activeTab === "new"}
          aria-controls="tab-panel-new"
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
          role="tab"
          aria-selected={activeTab === "service"}
          aria-controls="tab-panel-service"
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
          role="tab"
          aria-selected={activeTab === "listings"}
          aria-controls="tab-panel-listings"
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

      <div role="tabpanel" id={`tab-panel-${activeTab}`}>
        {activeTab === "new" && <NewProductForm />}
        {activeTab === "service" && <NewServiceForm />}
        {activeTab === "listings" && <SellerListings />}
      </div>
    </div>
  );
}
