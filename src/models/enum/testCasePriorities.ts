export const TestCasePriority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;
export type TestCasePriority =
  (typeof TestCasePriority)[keyof typeof TestCasePriority];
