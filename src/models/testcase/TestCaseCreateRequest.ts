import { TestCasePriority } from "../enum/testCasePriorities";

export interface TestCaseCreateRequest {
  projectId: number;
  title: string;
  description?: string;
  preconditions?: string;
  inputData?: string;
  steps: string[];
  priority: TestCasePriority;
}
