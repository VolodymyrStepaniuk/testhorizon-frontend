import { GridColDef } from "@mui/x-data-grid";
import { TestType } from "../../../../models/enum/testTypes";
import { TestTypeChip } from "../../../../theme/customization/chips";
import { TFunction } from "i18next";

function renderType(type: TestType) {
  return <TestTypeChip testtype={type} />;
}

export const getTestColumns = (t: TFunction): GridColDef[] => {
  return [
    {
      field: "pageTitle",
      headerName: t("home.tables.tests.title"),
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: "type",
      headerName: t("home.tables.tests.type"),
      flex: 0.5,
      minWidth: 80,
      renderCell: (params) => renderType(params.value as any),
    },
    {
      field: "githubUrl",
      headerName: t("home.tables.tests.githubUrl"),
      flex: 1.5,
      minWidth: 80,
    },
    {
      field: "author",
      headerName: t("home.tables.tests.author"),
      flex: 1,
      minWidth: 80,
    },
    {
      field: "projectName",
      headerName: t("home.tables.tests.projectName"),
      flex: 1,
      minWidth: 80,
    },
    {
      field: "createdAt",
      headerName: t("home.tables.tests.createdAt"),
      flex: 1,
      minWidth: 80,
    },
  ];
};
