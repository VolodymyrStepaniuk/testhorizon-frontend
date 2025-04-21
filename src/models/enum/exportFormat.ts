export const ExportFormat = {
  XML: "XML",
  CSV: "CSV",
} as const;
export type ExportFormat = (typeof ExportFormat)[keyof typeof ExportFormat];
