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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { API } from "../../services/api.service";
import { ProjectCreateRequest } from "../../models/project/ProjectCreateRequest";
import { FileEntityType } from "../../models/enum/fileEntityType";
import { useTranslation } from "react-i18next";
import FileAttachmentUploader from "../../components/universal/file/FileAttachmentUploader";

const StyledPaper = styled(Paper)(() => ({
  padding: "2rem",
  marginTop: "2rem",
  marginBottom: "2rem",
}));

const ProjectCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          ? t("projectPages.create.titleRequired")
          : value.length > 100
          ? t("projectPages.create.titleLength")
          : "";
        break;
      case "githubUrl":
        newErrors.githubUrl = !value
          ? t("projectPages.create.urlRequired")
          : !isValidUrl(value)
          ? t("projectPages.create.urlInvalid")
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
          {t("projectPages.create.title")}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("projectPages.create.projectTitle")}
              </Typography>
              <TextField
                fullWidth
                required
                name="title"
                placeholder={t("projectPages.create.titlePlaceholder")}
                value={formData.title}
                onChange={handleInputChange}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("projectPages.create.description")}
              </Typography>
              <TextField
                fullWidth
                name="description"
                placeholder={t("projectPages.create.descriptionPlaceholder")}
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Instructions */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("projectPages.create.instructions")}
              </Typography>
              <TextField
                fullWidth
                name="instructions"
                placeholder={t("projectPages.create.instructionsPlaceholder")}
                multiline
                rows={4}
                value={formData.instructions || ""}
                onChange={handleInputChange}
              />
            </Grid>

            {/* GitHub URL */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("projectPages.create.githubUrl")}
              </Typography>
              <TextField
                fullWidth
                required
                name="githubUrl"
                placeholder={t("projectPages.create.urlPlaceholder")}
                value={formData.githubUrl}
                onChange={handleInputChange}
                error={!!errors.githubUrl}
                helperText={errors.githubUrl}
              />
            </Grid>

            {/* File Upload */}
            <FileAttachmentUploader
              files={files}
              onFileUpload={handleFileUpload}
              onFileRemove={removeFile}
            />

            {/* Buttons */}
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  disabled={loading}
                >
                  {t("projectPages.create.reset")}
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading || !isFormValid()}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    t("projectPages.create.submit")
                  )}
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
