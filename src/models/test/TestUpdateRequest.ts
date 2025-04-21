import { TestType } from "../enum/testTypes";

export interface TestUpdateRequest {
  testCaseId?: number;
  title?: string;
  description?: string;
  instructions?: string;
  githubUrl?: string;
  type?: TestType;
}
