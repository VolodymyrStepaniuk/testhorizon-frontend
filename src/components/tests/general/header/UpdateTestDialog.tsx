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
import { TestResponse } from "../../../../models/test/TestResponse";
import { TestUpdateRequest } from "../../../../models/test/TestUpdateRequest";
import { API } from "../../../../services/api.service";
import { TestType } from "../../../../models/enum/testTypes";
import { formatEnumWithLowerUnderline } from "../../../../utils/format.utils";
import { useTranslation } from "react-i18next";

interface UpdateTestDialogProps {
  open: boolean;
  onClose: () => void;
  test: TestResponse;
  onTestUpdated: (updatedTest: TestResponse) => void;
}

const UpdateTestDialog: React.FC<UpdateTestDialogProps> = ({
  open,
  onClose,
  test,
  onTestUpdated,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<TestUpdateRequest>({
    title: test.title,
    description: test.description || "",
    instructions: test.instructions || "",
    githubUrl: test.githubUrl || "",
    type: test.type,
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

  const handleSelectChange = (e: SelectChangeEvent<TestType>): void => {
    setFormData({
      ...formData,
      type: e.target.value as TestType,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await API.tests.update(test.id, formData);
      setIsSubmitting(false);
      onTestUpdated(response.data);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(t("tests.header.update.error"));
      console.error("Error updating test:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{t("tests.header.update.title")}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              name="title"
              label={t("tests.header.update.testTitle")}
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
            />

            <TextField
              name="description"
              label={t("tests.header.update.description")}
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
            />

            <TextField
              name="instructions"
              label={t("tests.header.update.instructions")}
              value={formData.instructions}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
            />

            <TextField
              name="githubUrl"
              label={t("tests.header.update.githubUrl")}
              value={formData.githubUrl}
              onChange={handleInputChange}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="type-label">
                {t("tests.header.update.testType")}
              </InputLabel>
              <Select
                labelId="type-label"
                name="type"
                value={formData.type}
                onChange={handleSelectChange}
                label={t("tests.header.update.testType")}
                required
              >
                {Object.values(TestType).map((type) => (
                  <MenuItem key={type} value={type}>
                    {formatEnumWithLowerUnderline(type)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            {t("tests.header.update.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting
              ? t("tests.header.update.updating")
              : t("tests.header.update.update")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateTestDialog;
