export const FileEntityType = {
  USER: "USER",
  TEST_CASE: "TEST_CASE",
  TEST: "TEST",
  PROJECT: "PROJECT",
  COMMENT: "COMMENT",
  BUG_REPORT: "BUG_REPORT",
} as const;
export type FileEntityType =
  (typeof FileEntityType)[keyof typeof FileEntityType];
