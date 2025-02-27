export const TestType = {
  UNIT: "Unit",
  INTEGRATION: "Integration",
  FUNCTIONAL: "Functional",
  END_TO_END: "End-to-end",
  ACCEPTANCE: "Acceptance",
  PERFORMANCE: "Performance",
  SMOKE: "Smoke",
} as const;
export type TestType = (typeof TestType)[keyof typeof TestType];
