import { GridRowsProp } from "@mui/x-data-grid";
import { BugReportResponse } from "../../../../models/bugreport/BugReportResponse";
import { TestResponse } from "../../../../models/test/TestResponse";
import { TestCaseResponse } from "../../../../models/testcase/TestCaseResponse";
import { formatDate } from "../../../../utils/format.utils";

export const mapTestRows = (tests?: TestResponse[]): GridRowsProp =>
  tests?.map((test) => ({
    id: test.id,
    pageTitle: test.title,
    type: test.type,
    githubUrl: test.githubUrl,
    author: `${test.author.firstName} ${test.author.lastName}`,
    projectName: test.project.title,
    createdAt: formatDate(test.createdAt),
  })) || [];

export const mapTestCaseRows = (testCases?: TestCaseResponse[]): GridRowsProp =>
  testCases?.map((testCase) => ({
    id: testCase.id,
    pageTitle: testCase.title,
    projectName: testCase.project.title,
    author: `${testCase.author.firstName} ${testCase.author.lastName}`,
    priority: testCase.priority,
    createdAt: formatDate(testCase.createdAt),
  })) || [];

export const mapBugReportRows = (
  bugReports?: BugReportResponse[]
): GridRowsProp =>
  bugReports?.map((bugReport) => ({
    id: bugReport.id,
    pageTitle: bugReport.title,
    projectName: bugReport.project.title,
    reporter: `${bugReport.reporter.firstName} ${bugReport.reporter.lastName}`,
    severity: bugReport.severity,
    status: bugReport.status,
    createdAt: formatDate(bugReport.createdAt),
  })) || [];
