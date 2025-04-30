import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  Divider,
  Alert,
  DialogContentText,
} from "@mui/material";
import { FiPlus } from "react-icons/fi";
import NotebookItem from "./NotebookItem";
import { NotebookResponse } from "../../models/notebook/NotebookResponse";
import { useTranslation } from "react-i18next";

interface Props {
  notebooks: NotebookResponse[];
  loading: boolean;
  onSelect: (nb: NotebookResponse) => void;
  onNew: () => void;
  onEdit: (nb: NotebookResponse) => void;
  onDelete: (id: number) => void;
}

const NotebookList: React.FC<Props> = ({
  notebooks,
  loading,
  onSelect,
  onNew,
  onEdit,
  onDelete,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [targetNotebook, setTargetNotebook] = useState<NotebookResponse | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const { t } = useTranslation();

  const handleDeleteClick = (id: number) => {
    const notebook = notebooks.find((nb) => nb.id === id);
    if (notebook) {
      setTargetNotebook(notebook);
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!targetNotebook) return;

    setIsDeleting(true);
    try {
      await onDelete(targetNotebook.id);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete notebook:", error);
    } finally {
      setIsDeleting(false);
      setTargetNotebook(null);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
      }}
    >
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{t("notebook.list.title")}</Typography>
        <Button
          variant="contained"
          startIcon={<FiPlus />}
          onClick={onNew}
          size="small"
        >
          {t("notebook.list.newButton")}
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      ) : notebooks.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          {t("notebook.list.empty")}
        </Alert>
      ) : (
        <Box
          sx={{
            overflowY: "auto",
            flex: 1,
            pr: 1,
            "& > div": {
              position: "relative",
              zIndex: 1,
              "&:hover": {
                zIndex: 2,
              },
            },
          }}
        >
          {notebooks.map((nb) => (
            <NotebookItem
              key={nb.id}
              notebook={nb}
              onSelect={onSelect}
              onDelete={() => handleDeleteClick(nb.id)}
              onEdit={() => onEdit(nb)}
            />
          ))}
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => !isDeleting && setDeleteDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: 1 } }}
      >
        <DialogTitle>{t("notebook.list.deleteDialog.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {targetNotebook &&
              t("notebook.list.deleteDialog.message", {
                title: targetNotebook.title,
              })}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isDeleting}
          >
            {t("notebook.list.deleteDialog.cancel")}
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting
              ? t("notebook.list.deleteDialog.deleting")
              : t("notebook.list.deleteDialog.delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default NotebookList;
