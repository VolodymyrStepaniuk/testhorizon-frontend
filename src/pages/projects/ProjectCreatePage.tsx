import React, { useState, FormEvent } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { API } from "../../services/api.service";
import { ProjectCreateRequest } from "../../models/project/ProjectCreateRequest";
import { FileEntityType } from "../../models/enum/fileEntityType";

const StyledPaper = styled(Paper)(() => ({
  padding: "2rem",
  marginTop: "2rem",
  marginBottom: "2rem",
}));

const UploadBox = styled(Box)(() => ({
  border: "2px dashed #ccc",
  borderRadius: "8px",
  padding: "2rem",
  textAlign: "center",
  cursor: "pointer",
  transition: "border 0.3s ease",
  "&:hover": {
    border: "2px dashed #1976d2",
  },
}));

const ProjectCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectCreateRequest>({
    title: "",
    description: "",
    instructions: "",
    githubUrl: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name: string, value: any) => {
    const newErrors = { ...errors };

    switch (name) {
      case "title":
        newErrors.title = !value
          ? "Title is required"
          : value.length > 100
          ? "Title must be less than 100 characters"
          : "";
        break;
      case "githubUrl":
        newErrors.githubUrl = !value
          ? "GitHub URL is required"
          : !isValidUrl(value)
          ? "Please enter a valid URL"
          : "";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isFormValid = () => {
    if (!formData.title || !formData.githubUrl) {
      return false;
    }
    return Object.values(errors).every((error) => !error || error === "");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    setLoading(true);

    try {
      const response = await API.projects.create(formData);

      if (files.length > 0) {
        await API.files.upload(FileEntityType.PROJECT, response.data.id, files);
      }

      navigate("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      instructions: "",
      githubUrl: "",
    });
    setFiles([]);
    setErrors({});
  };

  return (
    <Container maxWidth="lg">
      <StyledPaper>
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          Create New Project
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Title
              </Typography>
              <TextField
                fullWidth
                required
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleInputChange}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Description
              </Typography>
              <TextField
                fullWidth
                name="description"
                placeholder="Project Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Instructions */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Instructions
              </Typography>
              <TextField
                fullWidth
                name="instructions"
                placeholder="Project Instructions"
                multiline
                rows={4}
                value={formData.instructions || ""}
                onChange={handleInputChange}
              />
            </Grid>

            {/* GitHub URL */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                GitHub URL
              </Typography>
              <TextField
                fullWidth
                required
                name="githubUrl"
                placeholder="https://github.com/username/repository"
                value={formData.githubUrl}
                onChange={handleInputChange}
                error={!!errors.githubUrl}
                helperText={errors.githubUrl}
              />
            </Grid>

            {/* File Upload */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Upload Files
              </Typography>
              <label htmlFor="file-upload">
                <UploadBox>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                  <FiUpload size={24} style={{ marginBottom: "1rem" }} />
                  <Typography>
                    Drag and drop files here or click to upload
                  </Typography>
                </UploadBox>
              </label>
              {files.length > 0 && (
                <Box mt={2}>
                  {files.map((file, index) => (
                    <Alert
                      key={index}
                      icon={false}
                      sx={{ mb: 1 }}
                      action={
                        <IconButton
                          size="small"
                          onClick={() => removeFile(index)}
                        >
                          <FiTrash2 />
                        </IconButton>
                      }
                    >
                      {file.name}
                    </Alert>
                  ))}
                </Box>
              )}
            </Grid>

            {/* Buttons */}
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  disabled={loading}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading || !isFormValid()}
                >
                  {loading ? <CircularProgress size={24} /> : "Create Project"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default ProjectCreatePage;
