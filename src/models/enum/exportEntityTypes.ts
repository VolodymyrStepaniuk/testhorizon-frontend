export const ExportEntityType = {
  TEST_CASE: "TEST_CASE",
  TEST: "TEST",
  PROJECT: "PROJECT",
  BUG_REPORT: "BUG_REPORT",
} as const;

export type ExportEntityType =
  (typeof ExportEntityType)[keyof typeof ExportEntityType];
