import { TestType } from "../enum/testTypes";
import { ProjectInfo } from "../info/ProjectInfo";
import { TestCaseInfo } from "../info/TestCaseInfo";
import { UserInfo } from "../info/UserInfo";
import { Links } from "../Links";

export interface TestResponse {
  id: number;
  project: ProjectInfo;
  testCase?: TestCaseInfo;
  author: UserInfo;
  title: string;
  description?: string;
  instructions?: string;
  githubUrl: string;
  type: TestType;
  createdAt: string;
  updatedAt: string;
  _links: Links;
}
