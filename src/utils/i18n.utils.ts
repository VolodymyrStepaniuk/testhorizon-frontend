import i18next from "i18next";

/**
 * Formats enum value for display by replacing underscores with spaces and converting to title case
 * @param value The enum value to format
 * @returns The formatted string
 */
export const formatEnumWithLowerUnderline = (value?: string): string => {
  if (value == null) return "";
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Translates an enum value with a specific namespace format
 * @param namespace The namespace of the enum (e.g., "enums.project.status")
 * @param value The enum value to translate
 * @param fallback Optional fallback function if translation is not found
 * @returns The translated string for the enum value
 */
export const translateEnum = (
  namespace: string,
  value?: string,
  fallback?: (value: string) => string
): string => {
  if (value == null) return "";

  const translationKey = `${namespace}.${value}`;
  const translation = i18next.t(translationKey);

  // If translation doesn't exist (returns the key itself), use fallback
  if (translation === translationKey) {
    return fallback ? fallback(value) : formatEnumWithLowerUnderline(value);
  }

  return translation;
};
