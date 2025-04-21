export const TestType = {
  UNIT: "UNIT",
  INTEGRATION: "INTEGRATION",
  FUNCTIONAL: "FUNCTIONAL",
  END_TO_END: "END_TO_END",
  ACCEPTANCE: "ACCEPTANCE",
  PERFORMANCE: "PERFORMANCE",
  SMOKE: "SMOKE",
} as const;
export type TestType = (typeof TestType)[keyof typeof TestType];
