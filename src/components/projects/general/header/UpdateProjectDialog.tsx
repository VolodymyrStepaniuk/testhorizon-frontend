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
import { formatEnumWithoutLowerUnderline } from "../../../../utils/format.utils";

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
      setError("Failed to update project. Please try again.");
      console.error("Error updating project:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Project</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              name="title"
              label="Project Title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
            />

            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formData.status}
                onChange={handleSelectChange}
                label="Status"
                required
              >
                {Object.values(ProjectStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {formatEnumWithoutLowerUnderline(status)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              name="instructions"
              label="Instructions"
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
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? "Updating..." : "Update Project"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateProjectDialog;
