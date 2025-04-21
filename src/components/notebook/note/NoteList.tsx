import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Divider,
  Button,
  Alert,
  Breadcrumbs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { FiPlus, FiHome } from "react-icons/fi";
import NoteItem from "./NoteItem";
import { NoteResponse } from "../../../models/notebook/note/NoteResponse";

interface Props {
  notebook: { id: number; title: string };
  notes: NoteResponse[];
  loading: boolean;
  onBack: () => void;
  onNew: () => void;
  onView: (note: NoteResponse) => void;
  onEdit: (note: NoteResponse) => void;
  onDeleted: (id: number) => void;
}

const NoteList: React.FC<Props> = ({
  notebook,
  notes,
  loading,
  onBack,
  onNew,
  onView,
  onEdit,
  onDeleted,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (id: number) => {
    setDeletingNoteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingNoteId === null) return;

    setIsDeleting(true);
    try {
      onDeleted(deletingNoteId);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete note:", error);
    } finally {
      setIsDeleting(false);
      setDeletingNoteId(null);
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
      <Box sx={{ mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            size="small"
            startIcon={<FiHome />}
            onClick={onBack}
            sx={{ textTransform: "none" }}
          >
            Notebooks
          </Button>
          <Typography color="text.primary" variant="body2">
            {notebook.title}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Notes</Typography>
        <Button
          variant="contained"
          startIcon={<FiPlus />}
          onClick={onNew}
          size="small"
        >
          New Note
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      ) : notes.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No notes in this notebook yet. Create your first note!
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
          {notes.map((n) => (
            <NoteItem
              key={n.id}
              note={n}
              onView={onView}
              onEdit={() => onEdit(n)}
              onDelete={() => handleDeleteClick(n.id)}
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
        <DialogTitle>Delete Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this note? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
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

export default NoteList;
