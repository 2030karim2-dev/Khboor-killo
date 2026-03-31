"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormTextareaProps {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export function FormTextarea({
  label, name, rows = 3, required, placeholder, defaultValue, className = "",
}: FormTextareaProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right resize-none"
      />
    </div>
  );
}

interface FormSelectProps {
  label: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  defaultValue?: string;
  className?: string;
}

export function FormSelect({
  label, name, required, options, defaultValue, className = "",
}: FormSelectProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white"
      >
        <option value="">اختر {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

interface PasswordInputProps {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}

export function PasswordInput({ label, name, required, placeholder = "••••••••" }: PasswordInputProps) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          required={required}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          aria-label={show ? "إخفاء" : "إظهار"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

interface FormActionsProps {
  submitLabel: string;
  cancelLabel?: string;
  onCancel?: () => void;
  isSubmitting?: boolean;
  loadingLabel?: string;
}

export function FormActions({
  submitLabel, cancelLabel, onCancel, isSubmitting, loadingLabel = "جاري الحفظ...",
}: FormActionsProps) {
  return (
    <div className="flex gap-3 pt-2">
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? loadingLabel : submitLabel}
      </button>
      {cancelLabel && (
        <button type="button" onClick={onCancel} className="btn-outline py-3 text-base">
          {cancelLabel}
        </button>
      )}
    </div>
  );
}
