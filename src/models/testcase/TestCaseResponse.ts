import { TestCasePriority } from "../enum/testCasePriorities";
import { ProjectInfo } from "../info/ProjectInfo";
import { UserInfo } from "../info/UserInfo";
import { Links } from "../Links";

export interface TestCaseResponse {
  id: number;
  project: ProjectInfo;
  author: UserInfo;
  title: string;
  description: string;
  preconditions: string;
  inputData: string;
  steps: string[];
  priority: TestCasePriority;
  createdAt: string;
  updatedAt: string;
  _links: Links;
}
