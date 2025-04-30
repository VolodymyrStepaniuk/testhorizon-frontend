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
import { NotebookCreateRequest } from "../../models/notebook/NotebookCreateRequest";
import { NotebookResponse } from "../../models/notebook/NotebookResponse";
import { API } from "../../services/api.service";
import { useTranslation } from "react-i18next";

interface Props {
  notebook?: NotebookResponse;
  onSaved: (nb: NotebookResponse) => void;
  onCancel: () => void;
  onHome?: () => void;
}

const NotebookEditor: React.FC<Props> = ({
  notebook,
  onSaved,
  onCancel,
  onHome,
}) => {
  const isNew = !notebook || notebook.id === 0;
  const [title, setTitle] = useState(notebook?.title || "");
  const [description, setDescription] = useState(notebook?.description || "");
  const [saving, setSaving] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (notebook) {
      setTitle(notebook.title);
      setDescription(notebook.description || "");
    }
  }, [notebook]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isNew) {
        const req: NotebookCreateRequest = { title, description };
        const res = await API.notebooks.create(req);
        onSaved(res.data);
      } else if (notebook) {
        const req = { title, description };
        const res = await API.notebooks.update(notebook.id, req);
        onSaved(res.data);
      }
    } catch (error) {
      console.error("Failed to save notebook:", error);
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
          {onHome && (
            <Button
              size="small"
              startIcon={<FiHome />}
              onClick={onHome}
              sx={{ textTransform: "none" }}
            >
              {t("notebook.navigation.notebooks")}
            </Button>
          )}
          <Typography color="text.primary" variant="body2">
            {isNew
              ? t("notebook.editor.createTitle")
              : t("notebook.editor.editTitle")}
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
          label={t("notebook.editor.titleLabel")}
          placeholder={t("notebook.editor.titlePlaceholder")}
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
          label={t("notebook.editor.descriptionLabel")}
          placeholder={t("notebook.editor.descriptionPlaceholder")}
          fullWidth
          multiline
          minRows={4}
          maxRows={8}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
            {t("notebook.editor.cancel")}
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
            {saving ? t("notebook.editor.saving") : t("notebook.editor.save")}
          </Button>
        </Box>
      </Card>
    </Paper>
  );
};

export default NotebookEditor;
