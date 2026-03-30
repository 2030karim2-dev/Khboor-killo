"use client";

import { forwardRef } from "react";

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  error?: string;
  required?: boolean;
  id?: string;
  className?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, type = "text", placeholder, dir, error, required, id, className = "", ...props }, ref) => {
    const inputId = id || label.replace(/\s+/g, "-").toLowerCase();
    return (
      <div className={className}>
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          dir={dir}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`w-full px-4 py-2.5 rounded-xl border transition-colors text-right focus:outline-none ${
            error
              ? "border-red-300 focus:border-red-500 bg-red-50/50"
              : "border-slate-200 focus:border-sky-500"
          }`}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-red-500 text-xs mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
export default FormField;
