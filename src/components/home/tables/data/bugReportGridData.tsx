import { GridColDef } from "@mui/x-data-grid";
import { BugReportSeverity } from "../../../../models/enum/bugReportSeverities";
import { BugReportStatus } from "../../../../models/enum/bugReportStatuses";
import {
  BugReportSeverityChip,
  BugReportStatusChip,
} from "../../../../theme/customization/chips";
import { TFunction } from "i18next";

function renderSeverity(severity: BugReportSeverity) {
  return <BugReportSeverityChip severity={severity} />;
}

function renderStatus(status: BugReportStatus) {
  return <BugReportStatusChip status={status} />;
}

export const getBugReportColumns = (t: TFunction): GridColDef[] => {
  return [
    {
      field: "pageTitle",
      headerName: t("home.tables.bugReports.title"),
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: "projectName",
      headerName: t("home.tables.bugReports.projectName"),
      flex: 1,
      minWidth: 80,
    },
    {
      field: "reporter",
      headerName: t("home.tables.bugReports.reporter"),
      flex: 1,
      minWidth: 80,
    },
    {
      field: "severity",
      headerName: t("home.tables.bugReports.severity"),
      flex: 0.5,
      minWidth: 80,
      renderCell: (params) => renderSeverity(params.value as BugReportSeverity),
    },
    {
      field: "status",
      headerName: t("home.tables.bugReports.status"),
      flex: 0.5,
      minWidth: 80,
      renderCell: (params) => renderStatus(params.value as BugReportStatus),
    },
    {
      field: "createdAt",
      headerName: t("home.tables.bugReports.createdAt"),
      flex: 1,
      minWidth: 80,
    },
  ];
};
