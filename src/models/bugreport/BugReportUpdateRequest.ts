import { BugReportSeverity } from "../enum/bugReportSeverities";
import { BugReportStatus } from "../enum/bugReportStatuses";

export interface BugReportUpdateRequest {
  title?: string;
  description?: string;
  environment?: string;
  severity?: BugReportSeverity;
  status?: BugReportStatus;
}
