import { CommentEntityType } from "../constants/enum/commentEntityTypes";
import { ProjectStatus } from "../constants/enum/projectStatuses";
import { TestCasePriority } from "../constants/enum/testCasePriorities";
import { TestType } from "../constants/enum/testTypes";
import { BugReportSeverity } from "../constants/enum/bugReportSeverities";
import { BugReportStatus } from "../constants/enum/bugReportStatuses";

export const UNIVERSAL_VALIDATION = {
  password: {
    minLength: 8,
    maxLength: 20,
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
  },
  description: {
    minLength: 1,
    maxLength: 512,
  },
  email: {
    pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    minLength: 5,
    maxLength: 255,
  },
  githubUrl: {
    pattern: /^https:\/\/github.com\/[a-zA-Z0-9_.-]+$/,
    minLength: 1,
    maxLength: 255,
  },
  id: {
    min: 1,
    max: Number.MAX_SAFE_INTEGER,
  },
  instructions: {
    minLength: 1,
    maxLength: 512,
  },
  title: {
    minLength: 1,
    maxLength: 255,
  },
  url: {
    minLength: 1,
    maxLength: 2048,
  },
};

export const AUTH_VALIDATION = {
  code: {
    minLength: 6,
    maxLength: 6,
    pattern: /^\d{6}$/,
  },
  token: {
    minLength: 1,
  },
};

export const USER_VALIDATION = {
  firstName: {
    minLength: 1,
    maxLength: 255,
    pattern: /^[A-Za-z\s-]+$/,
  },
  lastName: {
    minLength: 1,
    maxLength: 255,
    pattern: /^[A-Za-z\s-]+$/,
  },
  rating: {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
  },
};

export const TESTCASE_VALIDATION = {
  preconditions: {
    minLength: 1,
    maxLength: 512,
  },
  inputData: {
    minLength: 1,
    maxLength: 512,
  },
  steps: {
    required: true,
    minLength: 1,
    validate: (steps: string[]) =>
      steps.length >= 1 &&
      steps.every((step) => step.length >= 1 && step.length <= 255),
  },
  priority: {
    required: true,
    enum: [Object.values(TestCasePriority)],
  },
};

export const TEST_VALIDATION = {
  type: {
    required: true,
    enum: [Object.values(TestType)],
  },
};

export const RATING_VALIDATION = {
  rating: { min: 1, max: 10 },
  comment: {
    minLength: 1,
    maxLength: 255,
  },
};

export const PROJECT_VALIDATION = {
  status: {
    required: true,
    enum: [Object.values(ProjectStatus)],
  },
};

export const COMMENT_VALIDATION = {
  commentContent: {
    minLength: 1,
    maxLength: 255,
  },
  entityType: {
    required: true,
    enum: [Object.values(CommentEntityType)],
  },
};

export const BUGREPORT_VALIDATION = {
  enviroment: {
    minLength: 1,
    maxLength: 255,
  },
  severity: {
    required: true,
    enum: [Object.values(BugReportSeverity)],
  },
  status: {
    required: true,
    enum: [Object.values(BugReportStatus)],
  },
};
