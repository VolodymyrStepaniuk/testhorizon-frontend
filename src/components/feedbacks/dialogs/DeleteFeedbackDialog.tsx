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
import { API } from "../../../services/api.service";
import NotificationSnackbar from "../../universal/notification/NotificationSnackbar";
import { useTranslation } from "react-i18next";

interface DeleteFeedbackDialogProps {
  open: boolean;
  onClose: () => void;
  feedbackId: number;
  onFeedbackDeleted: () => void;
}

const DeleteFeedbackDialog: React.FC<DeleteFeedbackDialogProps> = ({
  open,
  onClose,
  feedbackId,
  onFeedbackDeleted,
}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({ open: false, message: "", severity: "success" });
  const { t } = useTranslation();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await API.feedbacks.delete(feedbackId);
      setSnackbar({
        open: true,
        message: t("feedbacks.dialogs.delete.success"),
        severity: "success",
      });
      setIsDeleting(false);
      onClose();
      onFeedbackDeleted();
    } catch (err) {
      console.error("Error deleting feedback:", err);
      setSnackbar({
        open: true,
        message: t("feedbacks.dialogs.delete.error"),
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
        <DialogTitle>{t("feedbacks.dialogs.delete.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("feedbacks.dialogs.delete.message")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isDeleting}>
            {t("feedbacks.dialogs.delete.cancel")}
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
            endIcon={isDeleting ? <CircularProgress size={20} /> : null}
          >
            {isDeleting
              ? t("feedbacks.dialogs.delete.deleting")
              : t("feedbacks.dialogs.delete.delete")}
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

export default DeleteFeedbackDialog;
