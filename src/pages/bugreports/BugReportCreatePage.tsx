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
  Alert,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { BugReportCreateRequest } from "../../models/bugreport/BugReportCreateRequest";
import { BugReportSeverity } from "../../models/enum/bugReportSeverities";
import { API } from "../../services/api.service";
import { ProjectInfo } from "../../models/info/ProjectInfo";
import { FileEntityType } from "../../models/enum/fileEntityType";
import { formatEnumWithoutLowerUnderline } from "../../utils/format.utils";

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

const BugReportCreatePage: React.FC = () => {
  const navigate = useNavigate();
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
          ? "Title is required"
          : value.length > 100
          ? "Title must be less than 100 characters"
          : "";
        break;
      case "projectId":
        newErrors.projectId =
          !value || value === 0 ? "Project is required" : "";
        break;
      case "description":
        newErrors.description = !value ? "Description is required" : "";
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
          Create Bug Report
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Project Name
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
                      placeholder="Select a project"
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
                Title
              </Typography>
              <TextField
                fullWidth
                required
                name="title"
                placeholder="Bug Report Title"
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
                required
                name="description"
                placeholder="Detailed Bug Description"
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
                Environment
              </Typography>
              <TextField
                fullWidth
                required
                name="environment"
                placeholder="Environment Details (OS, Browser, Version, etc.)"
                multiline
                rows={4}
                value={formData.environment}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Severity */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Severity
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
                      {formatEnumWithoutLowerUnderline(severity)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* File Upload */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Upload Files
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Attach screenshots, logs, or other relevant files
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
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Submit Bug Report"
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
