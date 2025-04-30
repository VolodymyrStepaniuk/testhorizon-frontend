import React, { useState } from "react";
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
import { API } from "../../../../services/api.service";
import { BugReportResponse } from "../../../../models/bugreport/BugReportResponse";
import { BugReportUpdateRequest } from "../../../../models/bugreport/BugReportUpdateRequest";
import { BugReportStatus } from "../../../../models/enum/bugReportStatuses";
import { BugReportSeverity } from "../../../../models/enum/bugReportSeverities";
import { useTranslation } from "react-i18next";
import { translateEnum } from "../../../../utils/i18n.utils";

interface UpdateBugReportDialogProps {
  open: boolean;
  onClose: () => void;
  bugReport: BugReportResponse;
  onBugReportUpdated: (updatedBugReport: BugReportResponse) => void;
}

const UpdateBugReportDialog: React.FC<UpdateBugReportDialogProps> = ({
  open,
  onClose,
  bugReport,
  onBugReportUpdated,
}) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<BugReportUpdateRequest>({
    title: bugReport.title,
    description: bugReport.description,
    environment: bugReport.environment,
    severity: bugReport.severity,
    status: bugReport.status,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSeverityChange = (e: SelectChangeEvent): void => {
    setFormData({
      ...formData,
      severity: e.target.value as BugReportSeverity,
    });
  };

  const handleStatusChange = (e: SelectChangeEvent): void => {
    setFormData({
      ...formData,
      status: e.target.value as BugReportStatus,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await API.bugReports.update(bugReport.id, formData);
      setIsSubmitting(false);
      onBugReportUpdated(response.data);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(t("bugReports.update.error"));
      console.error("Error updating bug report:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{t("bugReports.update.title")}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              name="title"
              label={t("bugReports.update.bugTitle")}
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
            />

            <TextField
              name="description"
              label={t("bugReports.update.description")}
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
              required
            />

            <TextField
              name="environment"
              label={t("bugReports.update.environment")}
              value={formData.environment}
              onChange={handleInputChange}
              multiline
              rows={2}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="severity-label">
                {t("bugReports.update.severity")}
              </InputLabel>
              <Select
                labelId="severity-label"
                name="severity"
                value={formData.severity}
                onChange={handleSeverityChange}
                label={t("bugReports.update.severity")}
                required
              >
                {Object.values(BugReportSeverity).map((sev) => (
                  <MenuItem key={sev} value={sev}>
                    {translateEnum("enums.bugReport.severity", sev)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="status-label">
                {t("bugReports.update.status")}
              </InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formData.status}
                onChange={handleStatusChange}
                label={t("bugReports.update.status")}
                required
              >
                {Object.values(BugReportStatus).map((stat) => (
                  <MenuItem key={stat} value={stat}>
                    {translateEnum("enums.bugReport.status", stat)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            {t("bugReports.update.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting
              ? t("bugReports.update.updating")
              : t("bugReports.update.update")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateBugReportDialog;
