import { BugReportSeverity } from "../../constants/enum/bugReportSeverities";
import { BugReportStatus } from "../../constants/enum/bugReportStatuses";

export interface BugReportUpdateRequest {
  title?: string;
  description?: string;
  environment?: string;
  severity?: BugReportSeverity;
  status?: BugReportStatus;
}
