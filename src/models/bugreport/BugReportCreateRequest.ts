import { BugReportSeverity } from "../../constants/enum/bugReportSeverities";

export interface BugReportCreateRequest {
  projectId: number;
  title: string;
  description: string;
  environment: string;
  severity: BugReportSeverity;
}
