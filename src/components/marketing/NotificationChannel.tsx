"use client";

import { Bell, Smartphone, Mail } from "lucide-react";

interface NotificationChannelProps {
  icon: typeof Smartphone;
  iconColor: string;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function NotificationChannel({ icon: Icon, iconColor, title, description, checked, onChange }: NotificationChannelProps) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-3 mb-3">
        <Icon size={20} className={iconColor} />
        <h4 className="font-medium text-slate-800 dark:text-white">{title}</h4>
      </div>
      <label className="flex items-center justify-between">
        <span className="text-sm text-slate-500">{description}</span>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 rounded"
        />
      </label>
    </div>
  );
}