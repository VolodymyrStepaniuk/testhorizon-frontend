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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
            {t("notebook.navigation.notebooks")}
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
        <Typography variant="h6">{t("notebook.note.list.title")}</Typography>
        <Button
          variant="contained"
          startIcon={<FiPlus />}
          onClick={onNew}
          size="small"
        >
          {t("notebook.note.list.newButton")}
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      ) : notes.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          {t("notebook.note.list.empty")}
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
        <DialogTitle>{t("notebook.note.list.deleteDialog.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("notebook.note.list.deleteDialog.message")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isDeleting}
          >
            {t("notebook.note.list.deleteDialog.cancel")}
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting
              ? t("notebook.note.list.deleteDialog.deleting")
              : t("notebook.note.list.deleteDialog.delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default NoteList;
