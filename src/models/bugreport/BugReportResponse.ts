import { BugReportSeverity } from "../../constants/enum/bugReportSeverities";
import { BugReportStatus } from "../../constants/enum/bugReportStatuses";
import { Links } from "../Links";

export interface BugReportResponse {
  id: number;
  projectId: number;
  reporterId: number;
  title: string;
  description: string;
  environment: string;
  severity: BugReportSeverity;
  status: BugReportStatus;
  createdAt: string;
  updatedAt: string;
  _links: Links;
}
