"use client";

import { useState } from "react";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { Breadcrumb, EmptyState } from "@/components/ui";
import { useToast } from "@/lib/ToastContext";
import { CITIES } from "@/lib";

interface Address {
  id: string;
  label: string;
  city: string;
  address: string;
  phone: string;
  isDefault: boolean;
}

const STORAGE_KEY = "khuboor_addresses";

function loadAddresses(): Address[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* empty */ }
  return [];
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(loadAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { success, warning } = useToast();

  const save = (items: Address[]) => {
    setAddresses(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const addr: Address = {
      id: editingId || crypto.randomUUID().slice(0, 8),
      label: form.get("label") as string,
      city: form.get("city") as string,
      address: form.get("address") as string,
      phone: form.get("phone") as string,
      isDefault: addresses.length === 0,
    };

    if (editingId) {
      save(addresses.map((a) => (a.id === editingId ? addr : a)));
      success("تم تحديث العنوان بنجاح");
    } else {
      save([...addresses, addr]);
      success("تمت إضافة العنوان بنجاح");
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    save(addresses.filter((a) => a.id !== id));
    warning("تم حذف العنوان");
  };

  const handleSetDefault = (id: string) => {
    save(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
    success("تم تعيين العنوان الافتراضي");
  };

  const handleEdit = (addr: Address) => {
    setEditingId(addr.id);
    setShowForm(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "العناوين" }]} />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-slate-800">دفتر العناوين</h1>
        <button
          onClick={() => { setEditingId(null); setShowForm(true); }}
          className="btn-primary"
        >
          <Plus size={18} />
          إضافة عنوان
        </button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6 animate-slide-up">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            {editingId ? "تعديل العنوان" : "عنوان جديد"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="addr-label" className="block text-sm font-medium text-slate-700 mb-1.5">اسم العنوان</label>
                <input id="addr-label" name="label" required defaultValue={editingId ? addresses.find((a) => a.id === editingId)?.label : ""} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-right" placeholder="المنزل، العمل..." />
              </div>
              <div>
                <label htmlFor="addr-city" className="block text-sm font-medium text-slate-700 mb-1.5">المدينة</label>
                <select id="addr-city" name="city" required defaultValue={editingId ? addresses.find((a) => a.id === editingId)?.city : ""} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none bg-white">
                  <option value="">اختر المدينة</option>
                  {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="addr-address" className="block text-sm font-medium text-slate-700 mb-1.5">العنوان التفصيلي</label>
              <textarea id="addr-address" name="address" required rows={2} defaultValue={editingId ? addresses.find((a) => a.id === editingId)?.address : ""} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-right resize-none" placeholder="الحي، الشارع، رقم المبنى..." />
            </div>
            <div>
              <label htmlFor="addr-phone" className="block text-sm font-medium text-slate-700 mb-1.5">رقم الجوال</label>
              <input id="addr-phone" name="phone" type="tel" required defaultValue={editingId ? addresses.find((a) => a.id === editingId)?.phone : ""} className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none" placeholder="05xxxxxxxx" dir="ltr" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">
                {editingId ? "حفظ التعديلات" : "إضافة العنوان"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="btn-outline">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {addresses.length === 0 && !showForm ? (
        <EmptyState
          icon={<MapPin size={48} className="text-slate-300 mx-auto" />}
          title="لا توجد عناوين"
          description="أضف عنواناً لتسهيل عملية الشراء"
          actionLabel="إضافة عنوان"
          actionHref="#"
        />
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="card p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-sky-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-800">{addr.label}</span>
                  {addr.isDefault && (
                    <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">افتراضي</span>
                  )}
                </div>
                <p className="text-sm text-slate-600">{addr.city} - {addr.address}</p>
                <p className="text-sm text-slate-500" dir="ltr">{addr.phone}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEdit(addr)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600" aria-label="تعديل">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(addr.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500" aria-label="حذف">
                  <Trash2 size={16} />
                </button>
                {!addr.isDefault && (
                  <button onClick={() => handleSetDefault(addr.id)} className="text-xs text-sky-600 hover:text-sky-700 px-2">
                    افتراضي
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
