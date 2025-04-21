import React, { useState, useEffect, useCallback } from "react";
import { Box, Fab, Paper } from "@mui/material";
import { FiBook } from "react-icons/fi";
import { NotebookResponse } from "../../models/notebook/NotebookResponse";
import { API } from "../../services/api.service";
import { NoteResponse } from "../../models/notebook/note/NoteResponse";
import NoteEditor from "./note/NoteEditor";
import NoteViewer from "./note/NoteViewer";
import NoteList from "./note/NoteList";
import NotebookList from "./NotebookList";
import NotebookHeader from "./NotebookHeader";
import NotebookEditor from "./NotebookEditor";

const PANEL_WIDTH = 400;
const PANEL_HEIGHT = 600;

type NotebookView =
  | { type: "list" }
  | { type: "create" }
  | { type: "edit"; notebook: NotebookResponse };

type NoteView =
  | { type: "list" }
  | { type: "view"; note: NoteResponse }
  | { type: "edit"; note: NoteResponse };

const NotebookWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [notebooks, setNotebooks] = useState<NotebookResponse[]>([]);
  const [loadingNotebooks, setLoadingNotebooks] = useState(false);
  const [selectedNotebook, setSelectedNotebook] =
    useState<NotebookResponse | null>(null);
  const [notebookView, setNotebookView] = useState<NotebookView>({
    type: "list",
  });
  const [noteView, setNoteView] = useState<NoteView>({ type: "list" });
  const [notes, setNotes] = useState<NoteResponse[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(false);

  // Load notebooks when panel opens
  useEffect(() => {
    if (!open) return;
    setLoadingNotebooks(true);
    API.notebooks
      .getAll({ page: 0, size: 100 })
      .then((res) => {
        setNotebooks(res.data._embedded?.notebooks || []);
      })
      .catch((error) => {
        console.error("Failed to fetch notebooks:", error);
      })
      .finally(() => {
        setLoadingNotebooks(false);
      });
  }, [open]);

  // Load notes when a notebook is selected
  useEffect(() => {
    if (!selectedNotebook) return;
    setLoadingNotes(true);
    API.notes
      .getAll({ page: 0, size: 100, notebookId: selectedNotebook.id })
      .then((res) => {
        setNotes(res.data._embedded?.notes || []);
      })
      .catch((error) => {
        console.error("Failed to fetch notes:", error);
      })
      .finally(() => {
        setLoadingNotes(false);
      });
  }, [selectedNotebook]);

  // Create empty note for editing
  const handleNoteCreation = useCallback(() => {
    if (!selectedNotebook) return;

    setNoteView({
      type: "edit",
      note: {
        id: 0,
        notebookId: selectedNotebook.id,
        title: "",
        content: "",
        createdAt: "",
        updatedAt: "",
        _links: {} as any,
      },
    });
  }, [selectedNotebook]);

  // Handle note CRUD operations
  const handleNoteUpdated = useCallback((updatedNote: NoteResponse) => {
    setNotes((prev) => {
      const idx = prev.findIndex((x) => x.id === updatedNote.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updatedNote;
        return copy;
      }
      return [updatedNote, ...prev];
    });

    setNoteView({ type: "view", note: updatedNote });
  }, []);

  const handleNoteDelete = useCallback(async (id: number) => {
    try {
      await API.notes.delete(id);
    } catch (error) {
      console.error("Failed to delete note:", error);
      // Even on 404, proceed with UI update
    } finally {
      setNotes((prev) => prev.filter((n) => n.id !== id));
      setNoteView({ type: "list" });
    }
  }, []);

  // Handle notebook CRUD operations
  const handleNotebookDelete = useCallback(
    async (id: number) => {
      try {
        await API.notebooks.delete(id);
      } catch (error) {
        console.error("Failed to delete notebook:", error);
        // Even on 404, proceed with UI update
      } finally {
        setNotebooks((prev) => prev.filter((nb) => nb.id !== id));

        if (selectedNotebook?.id === id) {
          setSelectedNotebook(null);
          setNotes([]);
        }
      }
    },
    [selectedNotebook]
  );

  const handleNotebookSaved = useCallback(
    (notebook: NotebookResponse) => {
      if (notebookView.type === "edit") {
        // Update existing notebook
        setNotebooks((prev) => {
          const index = prev.findIndex((nb) => nb.id === notebook.id);
          if (index >= 0) {
            const updated = [...prev];
            updated[index] = notebook;
            return updated;
          }
          return prev;
        });

        if (selectedNotebook?.id === notebook.id) {
          setSelectedNotebook(notebook);
        }
      } else {
        // Add new notebook
        setNotebooks((prev) => [notebook, ...prev]);
      }

      setNotebookView({ type: "list" });
    },
    [notebookView, selectedNotebook]
  );

  // Reset to home view
  const handleHomeClick = useCallback(() => {
    setSelectedNotebook(null);
    setNotes([]);
    setNoteView({ type: "list" });
    setNotebookView({ type: "list" });
  }, []);

  // Render the appropriate content based on state
  const renderContent = () => {
    // Not viewing a notebook yet
    if (!selectedNotebook) {
      switch (notebookView.type) {
        case "create":
          return (
            <NotebookEditor
              onSaved={handleNotebookSaved}
              onCancel={() => setNotebookView({ type: "list" })}
            />
          );
        case "edit":
          return (
            <NotebookEditor
              notebook={notebookView.notebook}
              onSaved={handleNotebookSaved}
              onCancel={() => setNotebookView({ type: "list" })}
            />
          );
        default:
          return (
            <NotebookList
              notebooks={notebooks}
              loading={loadingNotebooks}
              onSelect={setSelectedNotebook}
              onNew={() => setNotebookView({ type: "create" })}
              onEdit={(nb) => setNotebookView({ type: "edit", notebook: nb })}
              onDelete={handleNotebookDelete}
            />
          );
      }
    }

    // Viewing a notebook
    switch (noteView.type) {
      case "edit":
        return (
          <NoteEditor
            notebook={selectedNotebook}
            note={noteView.note}
            onSaved={handleNoteUpdated}
            onCancel={() => {
              if (noteView.note.id !== 0) {
                setNoteView({ type: "view", note: noteView.note });
              } else {
                setNoteView({ type: "list" });
              }
            }}
            onHome={handleHomeClick}
          />
        );
      case "view":
        return (
          <NoteViewer
            notebook={selectedNotebook}
            note={noteView.note}
            onBack={() => setNoteView({ type: "list" })}
            onEdit={() => setNoteView({ type: "edit", note: noteView.note })}
            onHome={handleHomeClick}
            onDelete={handleNoteDelete}
          />
        );
      default:
        return (
          <NoteList
            notebook={selectedNotebook}
            notes={notes}
            loading={loadingNotes}
            onBack={handleHomeClick}
            onNew={handleNoteCreation}
            onView={(note) => setNoteView({ type: "view", note })}
            onEdit={(note) => {
              setNoteView({ type: "edit", note });
            }}
            onDeleted={handleNoteDelete}
          />
        );
    }
  };

  return (
    <>
      <Fab
        color="primary"
        onClick={() => setOpen((o) => !o)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1300,
          boxShadow: 3,
          borderRadius: 1,
        }}
        size="medium"
      >
        <FiBook size={24} />
      </Fab>

      {open && (
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: PANEL_WIDTH,
            height: PANEL_HEIGHT,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1300,
            borderRadius: 1,
          }}
        >
          <NotebookHeader onClose={() => setOpen(false)} />
          <Box sx={{ flex: 1, overflow: "hidden" }}>{renderContent()}</Box>
        </Paper>
      )}
    </>
  );
};

export default NotebookWidget;
