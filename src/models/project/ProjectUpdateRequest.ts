import { ProjectStatus } from "../enum/projectStatuses";

export interface ProjectUpdateRequest {
  title?: string;
  description?: string;
  status?: ProjectStatus;
  instructions?: string;
}
