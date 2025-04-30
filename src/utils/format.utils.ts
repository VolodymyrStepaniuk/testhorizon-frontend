import { formatDistance, FormatDistanceOptions, Locale } from "date-fns";
import { enUS, uk } from "date-fns/locale";
import i18n from "i18next";

export const formatEnumWithoutLowerUnderline = (enumValue: string): string => {
  return enumValue.charAt(0) + enumValue.slice(1).toLowerCase();
};

export const formatEnumWithLowerUnderline = (enumValue: string): string => {
  return enumValue
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const truncateText = (text: string, maxLength: number = 120): string => {
  if (!text) return "";
  return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(i18n.language, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const localeMap: Record<string, Locale> = {
  en: enUS,
  uk: uk,
};

export function formatDistanceLocalized(
  date: Date | number,
  baseDate: Date | number = Date.now(),
  options?: Omit<FormatDistanceOptions, "locale">
): string {
  const lang = i18n.language;
  const locale = localeMap[lang] || enUS;

  return formatDistance(date, baseDate, {
    addSuffix: true,
    locale,
    ...options,
  });
}
