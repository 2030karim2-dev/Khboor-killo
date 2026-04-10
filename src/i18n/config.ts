export type Lang = "ar" | "en" | "zh";

export interface LanguageConfig {
  code: Lang;
  name: string;
  nativeName: string;
  dir: "rtl" | "ltr";
  font: string;
}

export const languages: LanguageConfig[] = [
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl", font: "Noto Kufi Arabic" },
  { code: "en", name: "English", nativeName: "English", dir: "ltr", font: "Inter" },
  { code: "zh", name: "Chinese", nativeName: "中文", dir: "ltr", font: "Noto Sans SC" },
];

export const defaultLang: Lang = "ar";

export function getLanguageConfig(code: Lang): LanguageConfig {
  return languages.find((l) => l.code === code) || languages[0];
}
