export const BugReportStatus = {
  OPENED: "Opened",
  IN_PROGRESS: "In progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
} as const;
export type BugReportStatus =
  (typeof BugReportStatus)[keyof typeof BugReportStatus];
