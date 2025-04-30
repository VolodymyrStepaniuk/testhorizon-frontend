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
import { API } from "../../../../services/api.service";
import { useNavigate } from "react-router-dom";
import NotificationSnackbar from "../../../universal/notification/NotificationSnackbar";
import { useTranslation } from "react-i18next";

interface DeleteBugReportDialogProps {
  open: boolean;
  onClose: () => void;
  bugReportId: number;
  bugReportTitle: string;
}

const DeleteBugReportDialog: React.FC<DeleteBugReportDialogProps> = ({
  open,
  onClose,
  bugReportId,
  bugReportTitle,
}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await API.bugReports.delete(bugReportId);
      setSnackbar({
        open: true,
        message: t("bugReports.delete.success"),
        severity: "success",
      });
      setIsDeleting(false);
      onClose();
      setTimeout(() => {
        navigate("/bug-reports");
      }, 2000);
    } catch (err) {
      console.error("Error deleting bug report:", err);
      setSnackbar({
        open: true,
        message: t("bugReports.delete.error"),
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
        <DialogTitle>{t("bugReports.delete.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("bugReports.delete.confirmation", { title: bugReportTitle })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isDeleting}>
            {t("bugReports.delete.cancel")}
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
            endIcon={isDeleting ? <CircularProgress size={20} /> : null}
          >
            {isDeleting
              ? t("bugReports.delete.deleting")
              : t("bugReports.delete.delete")}
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

export default DeleteBugReportDialog;
