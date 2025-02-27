export const TestCasePriority = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
} as const;
export type TestCasePriority =
  (typeof TestCasePriority)[keyof typeof TestCasePriority];
