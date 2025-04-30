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

interface DeletePostDialogProps {
  open: boolean;
  onClose: () => void;
  postId: number;
  postTitle: string;
}

const DeletePostDialog: React.FC<DeletePostDialogProps> = ({
  open,
  onClose,
  postId,
  postTitle,
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
      await API.posts.delete(postId);
      setSnackbar({
        open: true,
        message: t("blog.delete.success"),
        severity: "success",
      });
      setIsDeleting(false);
      onClose();
      setTimeout(() => {
        navigate("/blog");
      }, 500);
    } catch (err) {
      console.error("Error deleting post:", err);
      setSnackbar({
        open: true,
        message: t("blog.delete.error"),
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
        <DialogTitle>{t("blog.delete.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("blog.delete.confirmation", { postTitle })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isDeleting}>
            {t("blog.delete.cancel")}
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
            endIcon={isDeleting ? <CircularProgress size={20} /> : null}
          >
            {isDeleting ? t("blog.delete.deleting") : t("blog.delete.delete")}
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

export default DeletePostDialog;
