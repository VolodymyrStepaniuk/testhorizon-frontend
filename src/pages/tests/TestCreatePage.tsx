import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Paper,
  CircularProgress,
  Autocomplete,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import { formatEnumWithLowerUnderline } from "../../utils/format.utils";
import { TestType } from "../../models/enum/testTypes";
import { ProjectInfo } from "../../models/info/ProjectInfo";
import { TestCaseInfo } from "../../models/info/TestCaseInfo";
import { API } from "../../services/api.service";
import { TestCreateRequest } from "../../models/test/TestCreateRequest";
import { FileEntityType } from "../../models/enum/fileEntityType";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FileAttachmentUploader from "../../components/universal/file/FileAttachmentUploader";

interface FormData {
  project: ProjectInfo | null;
  testCase: TestCaseInfo | null;
  title: string;
  description: string;
  instructions: string;
  githubUrl: string;
  testType: string;
}

const StyledPaper = styled(Paper)(() => ({
  padding: "2rem",
  marginTop: "2rem",
  marginBottom: "2rem",
}));

const TestCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    project: null,
    testCase: null,
    title: "",
    description: "",
    instructions: "",
    githubUrl: "",
    testType: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [testCases, setTestCases] = useState<TestCaseInfo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const [projectsData, testCasesData] = await Promise.all([
          API.projects.getAll(),
          API.testCases.getAll(),
        ]);

        const projects =
          projectsData.data._embedded?.projects.map((project) => ({
            ...project,
            id: project.id,
            title: project.title,
            ownerId: project.owner.id,
          })) || [];
        setProjects(projects);

        const testCases =
          testCasesData.data._embedded?.testCases.map(
            (testCase: TestCaseInfo) => ({
              ...testCase,
              id: testCase.id,
              title: testCase.title,
            })
          ) || [];
        setTestCases(testCases);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const handleSelectChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    validateField(field, value);
  };

  const isFormValid = () => {
    if (!formData.project || !formData.title || !formData.githubUrl) {
      return false;
    }
    return Object.values(errors).every((error) => !error || error === "");
  };

  const validateField = (name: string, value: any) => {
    const newErrors = { ...errors };

    switch (name) {
      case "project":
        newErrors.project = !value ? t("testPages.create.projectRequired") : "";
        break;
      case "title":
        newErrors.title = !value
          ? t("testPages.create.titleRequired")
          : value.length > 100
          ? t("testPages.create.titleLength")
          : "";
        break;
      case "githubUrl":
        {
          if (!value) {
            newErrors.githubUrl = t("testPages.create.githubUrlRequired");
          } else {
            const urlPattern = /^https?:\/\/github\.com\/.+/i;
            newErrors.githubUrl = !urlPattern.test(value)
              ? t("testPages.create.githubUrlInvalid")
              : "";
          }
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.project) {
      setLoading(false);
      return;
    }

    const testCreateRequest: TestCreateRequest = {
      projectId: formData.project.id,
      testCaseId: formData.testCase?.id,
      title: formData.title,
      description: formData.description,
      instructions: formData.instructions,
      githubUrl: formData.githubUrl,
      type: formData.testType as TestType,
    };

    try {
      const response = await API.tests.create(testCreateRequest);
      if (files.length > 0) {
        await API.files.upload(FileEntityType.TEST, response.data.id, files);
      }

      navigate("/tests");
    } catch (error) {
      console.error("Failed to create test:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      project: null,
      testCase: null,
      title: "",
      description: "",
      instructions: "",
      githubUrl: "",
      testType: "",
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
          {t("testPages.create.title")}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Project */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                {t("testPages.create.projectName")}
              </Typography>
              <Autocomplete
                options={projects}
                getOptionLabel={(option) => option.title}
                value={formData.project}
                onChange={(_, newValue) =>
                  handleSelectChange("project", newValue)
                }
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
                      placeholder={t("testPages.create.selectProject")}
                      error={!!errors.project}
                      helperText={errors.project}
                    />
                  );
                }}
              />
            </Grid>

            {/* Test Case */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                {t("testPages.create.testCase")}
              </Typography>
              <Autocomplete
                options={testCases}
                getOptionLabel={(option) => option.title}
                value={formData.testCase}
                onChange={(_, newValue) =>
                  handleSelectChange("testCase", newValue)
                }
                popupIcon={null}
                isOptionEqualToValue={(option, value) =>
                  option.id === value?.id
                }
                renderOption={(props, option) => (
                  <li {...props} key={`test-case-${option.id}`}>
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
                      placeholder={t("testPages.create.optionalTestCase")}
                    />
                  );
                }}
              />
            </Grid>

            {/* Title */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("testPages.create.testTitle")}
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="title"
                placeholder={t("testPages.create.titlePlaceholder")}
                value={formData.title}
                onChange={handleInputChange}
                error={!!errors.title}
                helperText={errors.title}
                inputProps={{ maxLength: 100 }}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("testPages.create.description")}
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={6}
                name="description"
                placeholder={t("testPages.create.descriptionPlaceholder")}
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Instructions */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("testPages.create.instructions")}
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={8}
                name="instructions"
                placeholder={t("testPages.create.instructionsPlaceholder")}
                value={formData.instructions}
                onChange={handleInputChange}
              />
            </Grid>

            {/* GitHub URL */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("testPages.create.githubUrl")}
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="githubUrl"
                placeholder={t("testPages.create.githubUrlPlaceholder")}
                value={formData.githubUrl}
                onChange={handleInputChange}
                error={!!errors.githubUrl}
                helperText={errors.githubUrl}
              />
            </Grid>

            {/* Test Type */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("testPages.create.testType")}
              </Typography>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="test-type-label">
                  {t("testPages.create.selectTestType")}
                </InputLabel>
                <Select
                  labelId="test-type-label"
                  id="testType"
                  name="testType"
                  value={formData.testType}
                  label={t("testPages.create.selectTestType")}
                  onChange={(e) =>
                    handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  {Object.values(TestType).map((typeVal) => (
                    <MenuItem key={typeVal} value={typeVal}>
                      {formatEnumWithLowerUnderline(typeVal)}
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
                  {t("testPages.create.reset")}
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading || !isFormValid()}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    t("testPages.create.submit")
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

export default TestCreatePage;
