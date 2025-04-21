import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { UserResponse } from "../../../models/user/UserResponse";
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import { useAuth } from "../../../contexts/AuthContext";
import { formatDate } from "../../../utils/format.utils";

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
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => params.row?.firstName ?? "",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => params.row?.lastName ?? "",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
    },
    {
      field: "totalRating",
      headerName: "Rating",
      flex: 0.75,
      renderCell: (params: GridRenderCellParams) => {
        const rating = params.row?.totalRating ?? 0;
        return rating >= 0 ? `+${rating}` : `${rating}`;
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        params.row?.createdAt ? formatDate(params.row.createdAt) : "",
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        params.row?.updatedAt ? formatDate(params.row.updatedAt) : "",
    },
    {
      field: "actions",
      headerName: "Actions",
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
            <Tooltip title="Edit User">
              <IconButton
                size="small"
                onClick={() => handleEditClick(params.row)}
                disabled={isCurrentUser}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete User">
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
