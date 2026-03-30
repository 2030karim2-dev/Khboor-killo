"use client";

import { Breadcrumb } from "@/components/ui";
import AccountSidebar from "@/components/account/AccountSidebar";
import PersonalInfoForm from "@/components/account/PersonalInfoForm";
import RecentOrders from "@/components/account/RecentOrders";

export default function AccountPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "حسابي" },
        ]}
      />

      <div className="grid md:grid-cols-4 gap-6">
        <AccountSidebar />
        <div className="md:col-span-3">
          <PersonalInfoForm />
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}
