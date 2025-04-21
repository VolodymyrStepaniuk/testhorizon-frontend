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
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
