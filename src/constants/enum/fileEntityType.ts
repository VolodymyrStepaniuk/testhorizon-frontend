export const FileEntityType = {
  USER: "User",
  TEST_CASE: "Test Case",
  TEST: "Test",
  PROJECT: "Project",
  COMMENT: "Comment",
  BUG_REPORT: "Bug Report",
} as const;
export type FileEntityType =
  (typeof FileEntityType)[keyof typeof FileEntityType];
