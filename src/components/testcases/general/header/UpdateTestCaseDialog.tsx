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
import { TestCaseResponse } from "../../../../models/testcase/TestCaseResponse";
import { TestCaseUpdateRequest } from "../../../../models/testcase/TestCaseUpdateRequest";
import { API } from "../../../../services/api.service";
import { TestCasePriority } from "../../../../models/enum/testCasePriorities";
import { useTranslation } from "react-i18next";
import { translateEnum } from "../../../../utils/i18n.utils";

interface UpdateTestCaseDialogProps {
  open: boolean;
  onClose: () => void;
  testCase: TestCaseResponse;
  onTestCaseUpdated: (updatedTestCase: TestCaseResponse) => void;
}

const UpdateTestCaseDialog: React.FC<UpdateTestCaseDialogProps> = ({
  open,
  onClose,
  testCase,
  onTestCaseUpdated,
}) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<TestCaseUpdateRequest>({
    title: testCase.title,
    description: testCase.description || "",
    preconditions: testCase.preconditions || "",
    inputData: testCase.inputData || "",
    steps: testCase.steps || [],
    priority: testCase.priority,
  });

  const [stepsText, setStepsText] = useState(
    testCase.steps ? testCase.steps.join("\n") : ""
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "steps") {
      setStepsText(value);
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<TestCasePriority>): void => {
    setFormData({
      ...formData,
      priority: e.target.value as TestCasePriority,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Convert steps from text to array
    const steps = stepsText.split("\n").filter((step) => step.trim() !== "");
    const updatedFormData = { ...formData, steps };

    try {
      const response = await API.testCases.update(testCase.id, updatedFormData);
      setIsSubmitting(false);
      onTestCaseUpdated(response.data);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(t("testCases.header.update.error"));
      console.error("Error updating test case:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{t("testCases.header.update.title")}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              name="title"
              label={t("testCases.header.update.testCaseTitle")}
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
            />

            <TextField
              name="description"
              label={t("testCases.header.update.description")}
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
            />

            <TextField
              name="preconditions"
              label={t("testCases.header.update.preconditions")}
              value={formData.preconditions}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
            />

            <TextField
              name="inputData"
              label={t("testCases.header.update.inputData")}
              value={formData.inputData}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
            />

            <TextField
              name="steps"
              label={t("testCases.header.update.steps")}
              value={stepsText}
              onChange={(e) => setStepsText(e.target.value)}
              multiline
              rows={5}
              fullWidth
              helperText={t("testCases.header.update.stepsHelp")}
            />

            <FormControl fullWidth>
              <InputLabel id="priority-label">
                {t("testCases.header.update.priority")}
              </InputLabel>
              <Select
                labelId="priority-label"
                name="priority"
                value={formData.priority}
                onChange={handleSelectChange}
                label={t("testCases.header.update.priority")}
                required
              >
                {Object.values(TestCasePriority).map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {translateEnum("enums.testCase.priority", priority)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            {t("testCases.header.update.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting
              ? t("testCases.header.update.updating")
              : t("testCases.header.update.update")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateTestCaseDialog;
