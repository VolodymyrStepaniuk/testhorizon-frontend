import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { UserResponse } from "../../../models/user/UserResponse";
import { API } from "../../../services/api.service";
import { useTranslation } from "react-i18next";

interface DeleteUserDialogProps {
  open: boolean;
  user: UserResponse;
  onClose: () => void;
  onUserDeleted: () => void;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  open,
  user,
  onClose,
  onUserDeleted,
}) => {
  const { t } = useTranslation();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await API.users.delete(user.id);
      onUserDeleted();
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(t("userAdmin.deleteDialog.error"));
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onClose={!isDeleting ? onClose : undefined}>
      <DialogTitle>{t("userAdmin.deleteDialog.title")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("userAdmin.deleteDialog.confirmMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          })}
        </DialogContentText>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>
          {t("userAdmin.deleteDialog.cancel")}
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={isDeleting}
          endIcon={isDeleting ? <CircularProgress size={20} /> : null}
        >
          {isDeleting
            ? t("userAdmin.deleteDialog.deletingButton")
            : t("userAdmin.deleteDialog.deleteButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;
