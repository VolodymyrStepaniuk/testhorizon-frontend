export const BugReportSeverity = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
} as const;
export type BugReportSeverity =
  (typeof BugReportSeverity)[keyof typeof BugReportSeverity];
