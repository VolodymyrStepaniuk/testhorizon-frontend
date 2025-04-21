export const BugReportSeverity = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;
export type BugReportSeverity =
  (typeof BugReportSeverity)[keyof typeof BugReportSeverity];
