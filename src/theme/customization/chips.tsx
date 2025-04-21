import { Chip } from "@mui/material";
import { ProjectStatus } from "../../models/enum/projectStatuses";
import { TestCasePriority } from "../../models/enum/testCasePriorities";
import { TestType } from "../../models/enum/testTypes";
import { BugReportSeverity } from "../../models/enum/bugReportSeverities";
import { BugReportStatus } from "../../models/enum/bugReportStatuses";

export const ProjectStatusChip = ({ status }: { status: ProjectStatus }) => {
  const statusMap = {
    [ProjectStatus.ACTIVE]: { color: "success", label: "Active" },
    [ProjectStatus.PAUSED]: { color: "warning", label: "On Hold" },
    [ProjectStatus.INACTIVE]: { color: "primary", label: "Completed" },
  };

  const statusInfo = statusMap[status] || { color: "default", label: status };

  return (
    <Chip
      label={statusInfo.label}
      color={
        statusInfo.color as
          | "success"
          | "warning"
          | "primary"
          | "error"
          | "default"
      }
      size="small"
    />
  );
};

export const TestCasePriorityChip = ({
  priority,
}: {
  priority: TestCasePriority;
}) => {
  const colorMap = {
    [TestCasePriority.HIGH]: "#f44336",
    [TestCasePriority.MEDIUM]: "#ff9800",
    [TestCasePriority.LOW]: "#4caf50",
  };

  const priorityMap = {
    [TestCasePriority.HIGH]: "High",
    [TestCasePriority.MEDIUM]: "Medium",
    [TestCasePriority.LOW]: "Low",
  };

  const backgroundColor = colorMap[priority] || "#9e9e9e";
  const label = priorityMap[priority] || priority;

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        backgroundColor,
        color: "#ffffff",
        fontWeight: "bold",
      }}
    />
  );
};

export const TestTypeChip = ({ testtype }: { testtype: TestType }) => {
  const colorMap = {
    [TestType.UNIT]: "#3f51b5",
    [TestType.INTEGRATION]: "#009688",
    [TestType.FUNCTIONAL]: "#ff9800",
    [TestType.END_TO_END]: "#f44336",
    [TestType.ACCEPTANCE]: "#4caf50",
    [TestType.PERFORMANCE]: "#9c27b0",
    [TestType.SMOKE]: "#607d8b",
  };

  const typeMap = {
    [TestType.UNIT]: "Unit",
    [TestType.INTEGRATION]: "Integration",
    [TestType.FUNCTIONAL]: "Functional",
    [TestType.END_TO_END]: "End-to-End",
    [TestType.ACCEPTANCE]: "Acceptance",
    [TestType.PERFORMANCE]: "Performance",
    [TestType.SMOKE]: "Smoke",
  };

  const backgroundColor = colorMap[testtype] || "#9e9e9e";
  const label = typeMap[testtype] || testtype;

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        backgroundColor,
        color: "#ffffff",
        fontWeight: "bold",
      }}
    />
  );
};

export const BugReportSeverityChip = ({
  severity,
}: {
  severity: BugReportSeverity;
}) => {
  const colorMap = {
    [BugReportSeverity.LOW]: "#4caf50",
    [BugReportSeverity.MEDIUM]: "#ff9800",
    [BugReportSeverity.HIGH]: "#f44336",
    [BugReportSeverity.CRITICAL]: "#9c27b0",
  };

  const severityMap = {
    [BugReportSeverity.LOW]: "Low",
    [BugReportSeverity.MEDIUM]: "Medium",
    [BugReportSeverity.HIGH]: "High",
    [BugReportSeverity.CRITICAL]: "Critical",
  };

  const backgroundColor = colorMap[severity] || "#9e9e9e";
  const label = severityMap[severity] || severity;

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        backgroundColor,
        color: "#ffffff",
        fontWeight: "bold",
      }}
    />
  );
};

export const BugReportStatusChip = ({
  status,
}: {
  status: BugReportStatus;
}) => {
  const colorMap = {
    [BugReportStatus.OPENED]: "#3f51b5",
    [BugReportStatus.IN_PROGRESS]: "#ff9800",
    [BugReportStatus.RESOLVED]: "#4caf50",
    [BugReportStatus.CLOSED]: "#9e9e9e",
  };

  const statusMap = {
    [BugReportStatus.OPENED]: "Opened",
    [BugReportStatus.IN_PROGRESS]: "In Progress",
    [BugReportStatus.RESOLVED]: "Resolved",
    [BugReportStatus.CLOSED]: "Closed",
  };

  const backgroundColor = colorMap[status] || "#607d8b";
  const label = statusMap[status] || status;

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        backgroundColor,
        color: "#ffffff",
        fontWeight: "bold",
        marginLeft: "8px",
      }}
    />
  );
};
