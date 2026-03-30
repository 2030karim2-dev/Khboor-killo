export default function FormInput({
  label,
  type = "text",
  placeholder,
  defaultValue,
  dir,
  className = "",
}: {
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  dir?: "rtl" | "ltr";
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        dir={dir}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
      />
    </div>
  );
}
