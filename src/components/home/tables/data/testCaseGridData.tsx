import { GridColDef } from "@mui/x-data-grid";
import { TestCasePriority } from "../../../../models/enum/testCasePriorities";
import { TestCasePriorityChip } from "../../../../theme/customization/chips";
import { TFunction } from "i18next";

function renderPriority(priority: TestCasePriority) {
  return <TestCasePriorityChip priority={priority} />;
}

export const getTestCaseColumns = (t: TFunction): GridColDef[] => {
  return [
    {
      field: "pageTitle",
      headerName: t("home.tables.testCases.title"),
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: "author",
      headerName: t("home.tables.testCases.author"),
      flex: 1,
      minWidth: 80,
    },
    {
      field: "projectName",
      headerName: t("home.tables.testCases.projectName"),
      flex: 1,
      minWidth: 80,
    },
    {
      field: "priority",
      headerName: t("home.tables.testCases.priority"),
      flex: 0.5,
      minWidth: 80,
      renderCell: (params) => renderPriority(params.value as TestCasePriority),
    },
    {
      field: "createdAt",
      headerName: t("home.tables.testCases.createdAt"),
      flex: 1,
      minWidth: 80,
    },
  ];
};
