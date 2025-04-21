import { ProjectStatus } from "../enum/projectStatuses";
import { UserInfo } from "../info/UserInfo";
import { Links } from "../Links";

export interface ProjectResponse {
  id: number;
  owner: UserInfo;
  title: string;
  description: string;
  instructions?: string;
  githubUrl: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  _links: Links;
}
