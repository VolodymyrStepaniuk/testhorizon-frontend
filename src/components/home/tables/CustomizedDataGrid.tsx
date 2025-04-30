import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

interface CustomizedDataGridProps {
  rows: readonly GridValidRowModel[];
  columns: GridColDef[];
  isLoading?: boolean;
}

const CustomizedDataGrid = ({
  rows,
  columns,
  isLoading,
}: CustomizedDataGridProps) => {
  const { t } = useTranslation();

  return (
    <DataGrid
      checkboxSelection
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      loading={isLoading}
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      localeText={{
        MuiTablePagination: {
          labelRowsPerPage: t("dataGrid.rowsPerPage"),
          labelDisplayedRows: ({ from, to, count }) =>
            t("dataGrid.pageStatus", { from, to, count }),
        },
        footerRowSelected: (count) => t("dataGrid.rowsSelected", { count }),
      }}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
};

export default CustomizedDataGrid;
