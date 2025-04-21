import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  Breadcrumbs,
  Card,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { FiEdit, FiHome, FiArrowLeft, FiTrash } from "react-icons/fi";
import { NoteResponse } from "../../../models/notebook/note/NoteResponse";
import { formatDate } from "../../../utils/format.utils";

interface Props {
  notebook: { id: number; title: string };
  note: NoteResponse;
  onBack: () => void;
  onEdit: () => void;
  onHome: () => void;
  onDelete: (id: number) => void;
}

const NoteViewer: React.FC<Props> = ({
  notebook,
  note,
  onBack,
  onEdit,
  onHome,
  onDelete,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      onDelete(note.id);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Format content with line breaks
  const formattedContent = note.content?.split("\n").map((line, i) => (
    <React.Fragment key={i}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            size="small"
            startIcon={<FiHome />}
            onClick={onHome}
            sx={{ textTransform: "none" }}
          >
            Notebooks
          </Button>
          <Typography color="text.primary" variant="body2">
            {notebook.title}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Card
        sx={{
          p: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: 0,
          borderBottomLeftRadius: 1,
          borderBottomRightRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              wordBreak: "break-word",
              flex: 1,
              lineHeight: 1.2,
            }}
          >
            {note.title}
          </Typography>

          <Box>
            <IconButton
              onClick={onEdit}
              size="small"
              sx={{ ml: 1 }}
              title="Edit note"
            >
              <FiEdit />
            </IconButton>
            <IconButton
              onClick={handleDeleteClick}
              size="small"
              color="error"
              sx={{ ml: 0.5 }}
              title="Delete note"
              disabled={isDeleting}
            >
              <FiTrash />
            </IconButton>
          </Box>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mt: 0,
            lineHeight: 1,
          }}
        >
          Last updated: {formatDate(note.updatedAt)}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 2,
            bgcolor: "background.default",
            borderRadius: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.7,
            }}
          >
            {formattedContent || "No content"}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            variant="outlined"
            startIcon={<FiArrowLeft />}
            onClick={onBack}
            size="small"
          >
            Back to notes
          </Button>
        </Box>
      </Card>

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

export default NoteViewer;
