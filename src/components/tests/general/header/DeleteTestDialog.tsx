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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await API.tests.delete(testId);
      setSnackbar({
        open: true,
        message: "Test deleted successfully",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/tests");
      }, 2000);
    } catch (error) {
      console.error("Error deleting test:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete test",
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
        <DialogTitle>Delete Test</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this test? This action cannot be
            undone.
          </Typography>
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
            startIcon={isDeleting ? <CircularProgress size={20} /> : null}
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

export default DeleteTestDialog;
