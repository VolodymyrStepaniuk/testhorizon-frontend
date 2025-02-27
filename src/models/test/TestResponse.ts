import { TestType } from "../../constants/enum/testTypes";
import { Links } from "../Links";

export interface TestResponse {
  id: number;
  projectId: number;
  testCaseId?: number;
  authorId: number;
  title: string;
  description?: string;
  instructions?: string;
  githubUrl: string;
  type: TestType;
  createdAt: string;
  updatedAt: string;
  _links: Links;
}
