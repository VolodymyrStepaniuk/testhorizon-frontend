import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import NotificationSnackbar from "../../../universal/notification/NotificationSnackbar";
import { API } from "../../../../services/api.service";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DeleteProjectDialogProps {
  open: boolean;
  onClose: () => void;
  projectId: number;
  projectTitle: string;
}

const DeleteProjectDialog: React.FC<DeleteProjectDialogProps> = ({
  open,
  onClose,
  projectId,
  projectTitle,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await API.projects.delete(projectId);
      setSnackbar({
        open: true,
        message: t("projects.delete.success"),
        severity: "success",
      });
      setIsDeleting(false);
      onClose();
      setTimeout(() => {
        navigate("/projects");
      }, 2000);
    } catch (err) {
      console.error("Error deleting project:", err);
      setSnackbar({
        open: true,
        message: t("projects.delete.error"),
        severity: "error",
      });
      setIsDeleting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={!isDeleting ? onClose : undefined}>
        <DialogTitle>{t("projects.delete.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("projects.delete.confirmation", { projectTitle })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isDeleting}>
            {t("projects.delete.cancel")}
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
            endIcon={isDeleting ? <CircularProgress size={20} /> : null}
          >
            {isDeleting
              ? t("projects.delete.deleting")
              : t("projects.delete.delete")}
          </Button>
        </DialogActions>
      </Dialog>
      <NotificationSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

export default DeleteProjectDialog;
