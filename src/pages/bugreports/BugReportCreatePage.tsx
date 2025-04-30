import React, { useState, FormEvent, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { BugReportCreateRequest } from "../../models/bugreport/BugReportCreateRequest";
import { BugReportSeverity } from "../../models/enum/bugReportSeverities";
import { API } from "../../services/api.service";
import { ProjectInfo } from "../../models/info/ProjectInfo";
import { FileEntityType } from "../../models/enum/fileEntityType";
import { useTranslation } from "react-i18next";
import { translateEnum } from "../../utils/i18n.utils";
import FileAttachmentUploader from "../../components/universal/file/FileAttachmentUploader";

const StyledPaper = styled(Paper)(() => ({
  padding: "2rem",
  marginTop: "2rem",
  marginBottom: "2rem",
}));

const BugReportCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<BugReportCreateRequest>({
    projectId: 0,
    title: "",
    description: "",
    environment: "",
    severity: BugReportSeverity.MEDIUM,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(
    null
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const projectsData = await API.projects.getAll();

        const projects =
          projectsData.data._embedded?.projects.map((project) => ({
            ...project,
            id: project.id,
            title: project.title,
            ownerId: project.owner.id,
          })) || [];
        setProjects(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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

  const handleProjectChange = (_: any, project: ProjectInfo | null) => {
    setSelectedProject(project);
    setFormData({
      ...formData,
      projectId: project?.id || 0,
    });
    validateField("projectId", project?.id || 0);
  };

  const validateField = (name: string, value: any) => {
    const newErrors = { ...errors };

    switch (name) {
      case "title":
        newErrors.title = !value
          ? t("bugReportPages.create.titleRequired")
          : value.length > 100
          ? t("bugReportPages.create.titleLength")
          : "";
        break;
      case "projectId":
        newErrors.projectId =
          !value || value === 0
            ? t("bugReportPages.create.projectRequired")
            : "";
        break;
      case "description":
        newErrors.description = !value
          ? t("bugReportPages.create.descriptionRequired")
          : "";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const isFormValid = () => {
    if (
      !formData.projectId ||
      !formData.title ||
      !formData.description ||
      !formData.environment
    ) {
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
      const response = await API.bugReports.create(formData);

      if (files.length > 0) {
        await API.files.upload(
          FileEntityType.BUG_REPORT,
          response.data.id,
          files
        );
      }

      navigate("/bug-reports");
    } catch (error) {
      console.error("Error creating bug report:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      projectId: 0,
      title: "",
      description: "",
      environment: "",
      severity: BugReportSeverity.MEDIUM,
    });
    setFiles([]);
    setErrors({});
    setSelectedProject(null);
  };

  return (
    <Container maxWidth="lg">
      <StyledPaper>
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          {t("bugReportPages.create.title")}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("bugReportPages.create.projectName")}
              </Typography>
              <Autocomplete
                options={projects}
                getOptionLabel={(option) => option.title}
                value={selectedProject}
                onChange={handleProjectChange}
                popupIcon={null}
                isOptionEqualToValue={(option, value) =>
                  option.id === value?.id
                }
                renderOption={(props, option) => (
                  <li {...props} key={`project-${option.id}`}>
                    {option.title}
                  </li>
                )}
                renderInput={(params) => {
                  const newParams = {
                    ...params,
                    InputProps: {
                      ...params.InputProps,
                      endAdornment: null,
                    },
                  };
                  return (
                    <TextField
                      {...newParams}
                      variant="outlined"
                      placeholder={t("bugReportPages.create.selectProject")}
                      error={!!errors.projectId}
                      helperText={errors.projectId}
                    />
                  );
                }}
              />
            </Grid>

            {/* Title */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("bugReportPages.create.bugTitle")}
              </Typography>
              <TextField
                fullWidth
                required
                name="title"
                placeholder={t("bugReportPages.create.bugTitlePlaceholder")}
                value={formData.title}
                onChange={handleInputChange}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("bugReportPages.create.description")}
              </Typography>
              <TextField
                fullWidth
                required
                name="description"
                placeholder={t("bugReportPages.create.descriptionPlaceholder")}
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>

            {/* Environment */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("bugReportPages.create.environment")}
              </Typography>
              <TextField
                fullWidth
                required
                name="environment"
                placeholder={t("bugReportPages.create.environmentPlaceholder")}
                multiline
                rows={4}
                value={formData.environment}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Severity */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("bugReportPages.create.severity")}
              </Typography>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={formData.severity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      severity: e.target.value as BugReportSeverity,
                    })
                  }
                >
                  {Object.values(BugReportSeverity).map((severity) => (
                    <MenuItem key={severity} value={severity}>
                      {translateEnum("enums.bugReport.severity", severity)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  {t("bugReportPages.create.reset")}
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading || !isFormValid()}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    t("bugReportPages.create.submit")
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

export default BugReportCreatePage;
