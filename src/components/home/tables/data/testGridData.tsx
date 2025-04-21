import { GridColDef } from "@mui/x-data-grid";
import { TestType } from "../../../../models/enum/testTypes";
import { TestTypeChip } from "../../../../theme/customization/chips";

function renderType(type: TestType) {
  return <TestTypeChip testtype={type} />;
}

export const testColumns: GridColDef[] = [
  { field: "pageTitle", headerName: "Title", flex: 1.5, minWidth: 200 },
  {
    field: "type",
    headerName: "Type",
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderType(params.value as any),
  },
  {
    field: "githubUrl",
    headerName: "Github URL",
    flex: 1.5,
    minWidth: 80,
  },
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
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
    minWidth: 80,
  },
];
