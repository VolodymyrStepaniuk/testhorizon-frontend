import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { API } from "../../../../services/api.service";
import { ProjectResponse } from "../../../../models/project/ProjectResponse";
import { ProjectUpdateRequest } from "../../../../models/project/ProjectUpdateRequest";
import { ProjectStatus } from "../../../../models/enum/projectStatuses";
import { useTranslation } from "react-i18next";
import { translateEnum } from "../../../../utils/i18n.utils";

interface UpdateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  project: ProjectResponse;
  onProjectUpdated: (updatedProject: ProjectResponse) => void;
}

const UpdateProjectDialog: React.FC<UpdateProjectDialogProps> = ({
  open,
  onClose,
  project,
  onProjectUpdated,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ProjectUpdateRequest>({
    title: project.title,
    description: project.description,
    status: project.status,
    instructions: project.instructions || "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<ProjectStatus>): void => {
    setFormData({
      ...formData,
      status: e.target.value as ProjectStatus,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await API.projects.update(project.id, formData);
      setIsSubmitting(false);
      onProjectUpdated(response.data);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(t("projects.update.error"));
      console.error("Error updating project:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{t("projects.update.title")}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              name="title"
              label={t("projects.update.projectTitle")}
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
            />

            <TextField
              name="description"
              label={t("projects.update.description")}
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="status-label">
                {t("projects.update.status")}
              </InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formData.status}
                onChange={handleSelectChange}
                label={t("projects.update.status")}
                required
              >
                {Object.values(ProjectStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {translateEnum("enums.project.status", status)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              name="instructions"
              label={t("projects.update.instructions")}
              value={formData.instructions}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
            />

            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            {t("projects.update.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting
              ? t("projects.update.updating")
              : t("projects.update.update")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateProjectDialog;
