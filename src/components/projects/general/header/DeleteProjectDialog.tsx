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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await API.projects.delete(projectId);
      setSnackbar({
        open: true,
        message: "Project deleted successfully",
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
        message: "Failed to delete project. Please try again.",
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
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the project "{projectTitle}"? This
            action cannot be undone.
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

export default DeleteProjectDialog;
