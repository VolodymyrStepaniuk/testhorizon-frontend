import { GridColDef } from "@mui/x-data-grid";
import { TestCasePriority } from "../../../../models/enum/testCasePriorities";
import { TestCasePriorityChip } from "../../../../theme/customization/chips";

function renderPriority(priority: TestCasePriority) {
  return <TestCasePriorityChip priority={priority} />;
}

export const testCaseColumns: GridColDef[] = [
  { field: "pageTitle", headerName: "Title", flex: 1.5, minWidth: 200 },
  {
    field: "author",
    headerName: "Author",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "projectName",
    headerName: "Project Name",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "priority",
    headerName: "Priority",
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderPriority(params.value as TestCasePriority),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
    minWidth: 80,
  },
];
