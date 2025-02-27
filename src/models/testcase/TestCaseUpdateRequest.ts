import { TestCasePriority } from "../../constants/enum/testCasePriorities";

export interface TestCaseUpdateRequest {
  title?: string;
  description?: string;
  preconditions?: string;
  inputData?: string;
  steps?: string[];
  priority?: TestCasePriority;
}
