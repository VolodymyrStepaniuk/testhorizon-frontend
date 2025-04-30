import { Chip } from "@mui/material";
import { ProjectStatus } from "../../models/enum/projectStatuses";
import { TestCasePriority } from "../../models/enum/testCasePriorities";
import { TestType } from "../../models/enum/testTypes";
import { BugReportSeverity } from "../../models/enum/bugReportSeverities";
import { BugReportStatus } from "../../models/enum/bugReportStatuses";
import { translateEnum } from "../../utils/i18n.utils";
import { useTranslation } from "react-i18next";
import { formatEnumWithLowerUnderline } from "../../utils/format.utils";

export const ProjectStatusChip = ({ status }: { status: ProjectStatus }) => {
  const { t } = useTranslation();

  const statusMap = {
    [ProjectStatus.ACTIVE]: { color: "success" },
    [ProjectStatus.PAUSED]: { color: "warning" },
    [ProjectStatus.INACTIVE]: { color: "primary" },
  };

  const statusInfo = statusMap[status] || { color: "default" };
  const label = translateEnum("enums.project.status", status);

  return (
    <Chip
      label={label}
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

  const backgroundColor = colorMap[priority] || "#9e9e9e";
  const label = translateEnum("enums.testCase.priority", priority);

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

  const backgroundColor = colorMap[testtype] || "#9e9e9e";
  const label = translateEnum("test.type", testtype);

  return (
    <Chip
      label={formatEnumWithLowerUnderline(label)}
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

  const backgroundColor = colorMap[severity] || "#9e9e9e";
  const label = translateEnum("enums.bugReport.severity", severity);

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

  const backgroundColor = colorMap[status] || "#607d8b";
  const label = translateEnum("enums.bugReport.status", status);

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
