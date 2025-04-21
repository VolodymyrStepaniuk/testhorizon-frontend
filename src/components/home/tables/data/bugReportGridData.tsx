import { GridColDef } from "@mui/x-data-grid";
import { BugReportSeverity } from "../../../../models/enum/bugReportSeverities";
import { BugReportStatus } from "../../../../models/enum/bugReportStatuses";
import {
  BugReportSeverityChip,
  BugReportStatusChip,
} from "../../../../theme/customization/chips";

function renderSeverity(severity: BugReportSeverity) {
  return <BugReportSeverityChip severity={severity} />;
}

function renderStatus(status: BugReportStatus) {
  return <BugReportStatusChip status={status} />;
}

export const bugReportColumns: GridColDef[] = [
  { field: "pageTitle", headerName: "Title", flex: 1.5, minWidth: 200 },
  {
    field: "projectName",
    headerName: "Project Name",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "reporter",
    headerName: "Reporter",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "severity",
    headerName: "Severity",
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderSeverity(params.value as BugReportSeverity),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.value as BugReportStatus),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
    minWidth: 80,
  },
];
