export const CommentEntityType = {
  BUG_REPORT: "BUG_REPORT",
  PROJECT: "PROJECT",
  TEST_CASE: "TEST_CASE",
  TEST: "TEST",
  POST: "POST",
} as const;
export type CommentEntityType =
  (typeof CommentEntityType)[keyof typeof CommentEntityType];
