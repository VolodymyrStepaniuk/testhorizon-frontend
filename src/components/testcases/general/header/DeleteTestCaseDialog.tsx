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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await API.testCases.delete(testCaseId);
      setSnackbar({
        open: true,
        message: "Test case deleted successfully",
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
        message: "Failed to delete test case. Please try again.",
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
        <DialogTitle>Delete Test Case</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this test case? This action cannot
            be undone and will remove all associated data.
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

export default DeleteTestCaseDialog;
