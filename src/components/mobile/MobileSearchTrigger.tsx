"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import MobileSearchOverlay from "./MobileSearchOverlay";

export default function MobileSearchTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-2.5 py-2.5 px-4 rounded-xl bg-slate-100 text-slate-400 text-sm md:hidden"
        aria-label="بحث"
      >
        <Search size={18} />
        <span>ابحث عن منتجات...</span>
      </button>
      <MobileSearchOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
