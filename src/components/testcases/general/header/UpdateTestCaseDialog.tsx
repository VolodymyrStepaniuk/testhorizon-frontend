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
import { formatEnumWithLowerUnderline } from "../../../../utils/format.utils";

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
      setError("Failed to update test case. Please try again.");
      console.error("Error updating test case:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Test Case</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              name="title"
              label="Test Case Title"
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
              rows={3}
              fullWidth
            />

            <TextField
              name="preconditions"
              label="Preconditions"
              value={formData.preconditions}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
            />

            <TextField
              name="inputData"
              label="Input Data"
              value={formData.inputData}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
            />

            <TextField
              name="steps"
              label="Test Steps (one per line)"
              value={stepsText}
              onChange={(e) => setStepsText(e.target.value)}
              multiline
              rows={5}
              fullWidth
              helperText="Enter each test step on a new line"
            />

            <FormControl fullWidth>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                name="priority"
                value={formData.priority}
                onChange={handleSelectChange}
                label="Priority"
                required
              >
                {Object.values(TestCasePriority).map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {formatEnumWithLowerUnderline(priority)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
            {isSubmitting ? "Updating..." : "Update Test Case"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateTestCaseDialog;
