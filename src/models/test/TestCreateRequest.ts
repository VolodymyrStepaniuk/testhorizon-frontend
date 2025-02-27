import { TestType } from "../../constants/enum/testTypes";

export interface TestCreateRequest {
  projectId: number;
  testCaseId?: number;
  title: string;
  description?: string;
  instructions?: string;
  githubUrl: string;
  type: TestType;
}
