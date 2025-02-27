import { ProjectStatus } from "../../constants/enum/projectStatuses";
import { Links } from "../Links";

export interface ProjectResponse {
  id: number;
  ownerId: number;
  title: string;
  description: string;
  instructions?: string;
  githubUrl: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  _links: Links;
}
