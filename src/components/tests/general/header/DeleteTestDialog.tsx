import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { API } from "../../../../services/api.service";
import { useNavigate } from "react-router-dom";
import NotificationSnackbar from "../../../universal/notification/NotificationSnackbar";
import { useTranslation } from "react-i18next";

interface DeleteTestDialogProps {
  open: boolean;
  onClose: () => void;
  testId: number;
}

const DeleteTestDialog: React.FC<DeleteTestDialogProps> = ({
  open,
  onClose,
  testId,
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
      await API.tests.delete(testId);
      setSnackbar({
        open: true,
        message: t("tests.header.delete.success"),
        severity: "success",
      });
      setTimeout(() => {
        navigate("/tests");
      }, 2000);
    } catch (error) {
      console.error("Error deleting test:", error);
      setSnackbar({
        open: true,
        message: t("tests.header.delete.error"),
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
        <DialogTitle>{t("tests.header.delete.title")}</DialogTitle>
        <DialogContent>
          <Typography>{t("tests.header.delete.confirmation")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isDeleting}>
            {t("tests.header.delete.cancel")}
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={20} /> : null}
          >
            {isDeleting
              ? t("tests.header.delete.deleting")
              : t("tests.header.delete.delete")}
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

export default DeleteTestDialog;
