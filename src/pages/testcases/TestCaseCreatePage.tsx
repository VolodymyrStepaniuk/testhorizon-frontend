import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
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
import { TestCaseCreateRequest } from "../../models/testcase/TestCaseCreateRequest";
import { TestCasePriority } from "../../models/enum/testCasePriorities";
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

const TestCaseCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TestCaseCreateRequest>({
    projectId: 0,
    title: "",
    description: "",
    preconditions: "",
    inputData: "",
    priority: TestCasePriority.MEDIUM,
    steps: [""],
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

  const handleStepsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      steps: e.target.value.split("\n"),
    });
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
      default:
        break;
    }
    setErrors(newErrors);
  };

  const isFormValid = () => {
    if (!formData.projectId || !formData.title || formData.steps.length === 0) {
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
      const response = await API.testCases.create(formData);

      if (files.length > 0) {
        await API.files.upload(
          FileEntityType.TEST_CASE,
          response.data.id,
          files
        );
      }

      navigate("/test-cases");
    } catch (error) {
      console.error("Error creating test case:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      projectId: 0,
      title: "",
      description: "",
      preconditions: "",
      inputData: "",
      priority: TestCasePriority.MEDIUM,
      steps: [""],
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
          Create new Test Case
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Project */}
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
                placeholder="Test Case Title"
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
                placeholder="Test Case Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Preconditions */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Preconditions
              </Typography>
              <TextField
                fullWidth
                name="preconditions"
                placeholder="Test Case Preconditions"
                multiline
                rows={4}
                value={formData.preconditions}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Input Data */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Input Data
              </Typography>
              <TextField
                fullWidth
                name="inputData"
                placeholder="Test Case Input Data"
                multiline
                rows={4}
                value={formData.inputData}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Steps */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Test Steps (one step per line)
              </Typography>
              <TextField
                fullWidth
                placeholder="Test Steps"
                multiline
                rows={6}
                value={formData.steps.join("\n")}
                onChange={handleStepsChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.shiftKey) {
                    e.preventDefault();

                    const target = e.target as HTMLTextAreaElement;
                    const value = target.value;
                    const selectionStart = target.selectionStart;

                    const newValue =
                      value.substring(0, selectionStart) +
                      "\n" +
                      value.substring(target.selectionEnd);

                    setFormData({
                      ...formData,
                      steps: newValue.split("\n"),
                    });

                    setTimeout(() => {
                      const newPosition = selectionStart + 1;
                      target.setSelectionRange(newPosition, newPosition);
                    }, 0);
                  }
                }}
              />
            </Grid>

            {/* Priority */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Priority
              </Typography>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as TestCasePriority,
                    })
                  }
                >
                  {Object.values(TestCasePriority).map((priority) => (
                    <MenuItem key={priority} value={priority}>
                      {formatEnumWithoutLowerUnderline(priority)}
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
                    "Create Test Case"
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

export default TestCaseCreatePage;
