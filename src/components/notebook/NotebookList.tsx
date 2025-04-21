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
        <Typography variant="h6">My Notebooks</Typography>
        <Button
          variant="contained"
          startIcon={<FiPlus />}
          onClick={onNew}
          size="small"
        >
          New Notebook
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      ) : notebooks.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No notebooks found. Create your first notebook to get started!
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
        <DialogTitle>Delete Notebook</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {targetNotebook &&
              `Are you sure you want to delete the notebook "${targetNotebook.title}"? This will also delete all notes inside this notebook. This action cannot be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default NotebookList;
