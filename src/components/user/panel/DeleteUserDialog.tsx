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
      setError("Failed to delete user. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onClose={!isDeleting ? onClose : undefined}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the user "{user.firstName}{" "}
          {user.lastName}" with email "{user.email}"? This action cannot be
          undone.
        </DialogContentText>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
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
          {isDeleting ? "Deleting..." : "Delete User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;
