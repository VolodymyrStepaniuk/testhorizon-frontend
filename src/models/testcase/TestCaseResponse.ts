import { TestCasePriority } from "../../constants/enum/testCasePriorities";
import { Links } from "../Links";

export interface TestCaseResponse {
  id: number;
  projectId: number;
  authorId: number;
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
