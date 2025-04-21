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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await API.bugReports.delete(bugReportId);
      setSnackbar({
        open: true,
        message: "Bug report deleted successfully",
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
        message: "Failed to delete bug report. Please try again.",
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
        <DialogTitle>Delete Bug Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the bug report "{bugReportTitle}"?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
            endIcon={isDeleting ? <CircularProgress size={20} /> : null}
          >
            {isDeleting ? "Deleting..." : "Delete"}
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
