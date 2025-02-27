export const CommentEntityType = {
  BUG_REPORT: "Bug report",
  PROJECT: "Project",
  TEST_CASE: "Test case",
  TEST: "Test",
} as const;
export type CommentEntityType =
  (typeof CommentEntityType)[keyof typeof CommentEntityType];
