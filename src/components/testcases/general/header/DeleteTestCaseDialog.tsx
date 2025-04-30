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

interface DeleteTestCaseDialogProps {
  open: boolean;
  onClose: () => void;
  testCaseId: number;
}

const DeleteTestCaseDialog: React.FC<DeleteTestCaseDialogProps> = ({
  open,
  onClose,
  testCaseId,
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
      await API.testCases.delete(testCaseId);
      setSnackbar({
        open: true,
        message: t("testCases.header.delete.success"),
        severity: "success",
      });
      setIsDeleting(false);
      onClose();
      setTimeout(() => {
        navigate("/test-cases");
      }, 2000);
    } catch (error) {
      console.error("Error deleting test case:", error);
      setSnackbar({
        open: true,
        message: t("testCases.header.delete.error"),
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
        <DialogTitle>{t("testCases.header.delete.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("testCases.header.delete.confirmation")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isDeleting}>
            {t("testCases.header.delete.cancel")}
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
            endIcon={isDeleting ? <CircularProgress size={20} /> : null}
          >
            {isDeleting
              ? t("testCases.header.delete.deleting")
              : t("testCases.header.delete.delete")}
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

export default DeleteTestCaseDialog;
