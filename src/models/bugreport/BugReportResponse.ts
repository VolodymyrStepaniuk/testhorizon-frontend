import { BugReportSeverity } from "../enum/bugReportSeverities";
import { BugReportStatus } from "../enum/bugReportStatuses";
import { ProjectInfo } from "../info/ProjectInfo";
import { UserInfo } from "../info/UserInfo";
import { Links } from "../Links";

export interface BugReportResponse {
  id: number;
  project: ProjectInfo;
  reporter: UserInfo;
  title: string;
  description: string;
  environment: string;
  severity: BugReportSeverity;
  status: BugReportStatus;
  createdAt: string;
  updatedAt: string;
  _links: Links;
}
