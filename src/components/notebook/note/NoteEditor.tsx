import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Paper,
  Divider,
  Breadcrumbs,
  Card,
} from "@mui/material";
import { FiSave, FiHome } from "react-icons/fi";
import { NoteCreateRequest } from "../../../models/notebook/note/NoteCreateRequest";
import { NoteResponse } from "../../../models/notebook/note/NoteResponse";
import { NoteUpdateRequest } from "../../../models/notebook/note/NoteUpdateRequest";
import { API } from "../../../services/api.service";

interface Props {
  notebook: { id: number; title: string };
  note: NoteResponse;
  onSaved: (n: NoteResponse) => void;
  onCancel: () => void;
  onHome: () => void; // Add new prop for home navigation
}

const NoteEditor: React.FC<Props> = ({
  notebook,
  note,
  onSaved,
  onCancel,
  onHome,
}) => {
  const isNew = note.id === 0;
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content || "");
  }, [note]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isNew) {
        const req: NoteCreateRequest = { title, content };
        const res = await API.notes.create(notebook.id, req);
        onSaved(res.data);
      } else {
        const req: NoteUpdateRequest = { title, content };
        const res = await API.notes.update(note.id, req);
        onSaved(res.data);
      }
    } finally {
      setSaving(false);
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
            onClick={onHome}
            sx={{ textTransform: "none" }}
          >
            Notebooks
          </Button>
          <Typography color="text.secondary" variant="body2">
            {notebook.title}
          </Typography>
          <Typography color="text.primary" variant="body2">
            {isNew ? "New Note" : "Edit Note"}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Card
        sx={{
          p: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: 1,
        }}
      >
        <TextField
          label="Title"
          placeholder="Enter a title for your note"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
            },
          }}
        />

        <Divider sx={{ my: 1 }} />

        <TextField
          label="Content"
          placeholder="Write your note content here..."
          fullWidth
          multiline
          minRows={10}
          maxRows={20}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          sx={{
            flex: 1,
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>

          <Button
            variant="contained"
            startIcon={
              saving ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <FiSave />
              )
            }
            onClick={handleSave}
            disabled={!title.trim() || saving}
          >
            {saving ? "Saving..." : "Save Note"}
          </Button>
        </Box>
      </Card>
    </Paper>
  );
};

export default NoteEditor;
