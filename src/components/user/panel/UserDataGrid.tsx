import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { UserResponse } from "../../../models/user/UserResponse";
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import { useAuth } from "../../../contexts/AuthContext";
import { formatDate } from "../../../utils/format.utils";
import { useTranslation } from "react-i18next";

interface UserDataGridProps {
  users: UserResponse[];
  loading: boolean;
  onUserUpdated: () => void;
  onUserDeleted: () => void;
}

const UserDataGrid: React.FC<UserDataGridProps> = ({
  users,
  loading,
  onUserUpdated,
  onUserDeleted,
}) => {
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const { user: currentUser } = useAuth();
  const { t } = useTranslation();

  const handleEditClick = (user: UserResponse) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (user: UserResponse) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("userAdmin.dataGrid.id"),
      flex: 0.5,
    },
    {
      field: "firstName",
      headerName: t("userAdmin.dataGrid.firstName"),
      flex: 1,
      renderCell: (params: GridRenderCellParams) => params.row?.firstName ?? "",
    },
    {
      field: "lastName",
      headerName: t("userAdmin.dataGrid.lastName"),
      flex: 1,
      renderCell: (params: GridRenderCellParams) => params.row?.lastName ?? "",
    },
    {
      field: "userRole",
      headerName: t("userAdmin.dataGrid.userRole"),
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const authorities = params.row?.authorities ?? [];
        return authorities.length > 0
          ? t(`enums.user.authority.${authorities[0]}`)
          : t("userAdmin.dataGrid.noRole");
      },
    },
    {
      field: "email",
      headerName: t("userAdmin.dataGrid.email"),
      flex: 1.5,
    },
    {
      field: "totalRating",
      headerName: t("userAdmin.dataGrid.rating"),
      flex: 0.75,
      renderCell: (params: GridRenderCellParams) => {
        const rating = params.row?.totalRating ?? 0;
        return rating >= 0 ? `+${rating}` : `${rating}`;
      },
    },
    {
      field: "createdAt",
      headerName: t("userAdmin.dataGrid.createdAt"),
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        params.row?.createdAt ? formatDate(params.row.createdAt) : "",
    },
    {
      field: "updatedAt",
      headerName: t("userAdmin.dataGrid.updatedAt"),
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        params.row?.updatedAt ? formatDate(params.row.updatedAt) : "",
    },
    {
      field: "actions",
      headerName: t("userAdmin.dataGrid.actions"),
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        if (!params?.row) return null;
        const isCurrentUser = currentUser
          ? params.row.id === currentUser.id
          : false;
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              gap: "12px",
            }}
          >
            <Tooltip title={t("userAdmin.dataGrid.editTooltip")}>
              <IconButton
                size="small"
                onClick={() => handleEditClick(params.row)}
                disabled={isCurrentUser}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("userAdmin.dataGrid.deleteTooltip")}>
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDeleteClick(params.row)}
                disabled={isCurrentUser}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Box>
        <DataGrid
          rows={users || []}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          localeText={{
            MuiTablePagination: {
              labelRowsPerPage: t("dataGrid.rowsPerPage"),
              labelDisplayedRows: ({ from, to, count }) =>
                t("dataGrid.pageStatus", { from, to, count }),
            },
          }}
        />
      </Box>
      {selectedUser && (
        <>
          <EditUserDialog
            open={isEditDialogOpen}
            user={selectedUser}
            onClose={() => setIsEditDialogOpen(false)}
            onUserUpdated={() => {
              setIsEditDialogOpen(false);
              onUserUpdated();
            }}
          />
          <DeleteUserDialog
            open={isDeleteDialogOpen}
            user={selectedUser}
            onClose={() => setIsDeleteDialogOpen(false)}
            onUserDeleted={() => {
              setIsDeleteDialogOpen(false);
              onUserDeleted();
            }}
          />
        </>
      )}
    </>
  );
};

export default UserDataGrid;
