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
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { TestCaseCreateRequest } from "../../models/testcase/TestCaseCreateRequest";
import { TestCasePriority } from "../../models/enum/testCasePriorities";
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

const TestCaseCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          ? t("testCasePages.create.titleRequired")
          : value.length > 100
          ? t("testCasePages.create.titleLength")
          : "";
        break;
      case "projectId":
        newErrors.projectId =
          !value || value === 0
            ? t("testCasePages.create.projectRequired")
            : "";
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
          {t("testCasePages.create.title")}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Project */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("testCasePages.create.projectName")}
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
                      placeholder={t("testCasePages.create.selectProject")}
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
                {t("testCasePages.create.testCaseTitle")}
              </Typography>
              <TextField
                fullWidth
                required
                name="title"
                placeholder={t("testCasePages.create.titlePlaceholder")}
                value={formData.title}
                onChange={handleInputChange}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("testCasePages.create.description")}
              </Typography>
              <TextField
                fullWidth
                name="description"
                placeholder={t("testCasePages.create.descriptionPlaceholder")}
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Preconditions */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("testCasePages.create.preconditions")}
              </Typography>
              <TextField
                fullWidth
                name="preconditions"
                placeholder={t("testCasePages.create.preconditionsPlaceholder")}
                multiline
                rows={4}
                value={formData.preconditions}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Input Data */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("testCasePages.create.inputData")}
              </Typography>
              <TextField
                fullWidth
                name="inputData"
                placeholder={t("testCasePages.create.inputDataPlaceholder")}
                multiline
                rows={4}
                value={formData.inputData}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Steps */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("testCasePages.create.steps")}
              </Typography>
              <TextField
                fullWidth
                placeholder={t("testCasePages.create.stepsPlaceholder")}
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
                {t("testCasePages.create.priority")}
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
                      {translateEnum("enums.testCase.priority", priority)}
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
                  {t("testCasePages.create.reset")}
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading || !isFormValid()}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    t("testCasePages.create.submit")
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
