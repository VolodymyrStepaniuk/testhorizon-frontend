import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import UserDataGrid from "../../../components/user/panel/UserDataGrid";
import CreateUserDialog from "../../../components/user/panel/CreateUserDialog";
import { API } from "../../../services/api.service";
import { UserResponse } from "../../../models/user/UserResponse";
import { AuthorityName } from "../../../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../../../utils/auth.utils";
import NotificationSnackbar from "../../../components/universal/notification/NotificationSnackbar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserAdminPanel: React.FC = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const authorities = getAutoritiesFromToken();
  const currentUserRole = authorities[0] as AuthorityName;
  const isAdmin = currentUserRole === AuthorityName.ADMIN;

  useEffect(() => {
    if (!isAdmin) {
      navigate("/home");
      return;
    }

    fetchUsers();
  }, [isAdmin, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await API.users.getAll({ page: 0, size: 100 });
      if (response.data._embedded?.users) {
        setUsers(response.data._embedded.users);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      showNotification(t("userAdmin.panel.notifications.loadError"), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUserCreated = () => {
    fetchUsers();
    setCreateDialogOpen(false);
    showNotification(
      t("userAdmin.panel.notifications.createSuccess"),
      "success"
    );
  };

  const handleUserUpdated = () => {
    fetchUsers();
    showNotification(
      t("userAdmin.panel.notifications.updateSuccess"),
      "success"
    );
  };

  const handleUserDeleted = () => {
    fetchUsers();
    showNotification(
      t("userAdmin.panel.notifications.deleteSuccess"),
      "success"
    );
  };

  const showNotification = (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: 0 },
        }}
      >
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" component="h1">
              {t("userAdmin.panel.title")}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => setCreateDialogOpen(true)}
            >
              {t("userAdmin.panel.addButton")}
            </Button>
          </Box>

          <UserDataGrid
            users={users}
            loading={loading}
            onUserUpdated={handleUserUpdated}
            onUserDeleted={handleUserDeleted}
          />
        </Paper>

        <CreateUserDialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          onUserCreated={handleUserCreated}
        />

        <NotificationSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
      </Box>
    </Box>
  );
};

export default UserAdminPanel;
