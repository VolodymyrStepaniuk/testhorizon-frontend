export const BugReportStatus = {
  OPENED: "OPENED",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
  CLOSED: "CLOSED",
} as const;
export type BugReportStatus =
  (typeof BugReportStatus)[keyof typeof BugReportStatus];
