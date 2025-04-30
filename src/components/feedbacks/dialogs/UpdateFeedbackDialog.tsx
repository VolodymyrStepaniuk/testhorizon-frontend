import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Box,
  Rating,
  Typography,
} from "@mui/material";
import { API } from "../../../services/api.service";
import { FeedbackResponse } from "../../../models/feedback/FeedbackResponse";
import { FeedbackUpdateRequest } from "../../../models/feedback/FeedbackUpdateRequest";
import { useTranslation } from "react-i18next";

interface UpdateFeedbackDialogProps {
  open: boolean;
  onClose: () => void;
  feedback: FeedbackResponse;
  onFeedbackUpdated: (updatedFeedback: FeedbackResponse) => void;
}

const UpdateFeedbackDialog: React.FC<UpdateFeedbackDialogProps> = ({
  open,
  onClose,
  feedback,
  onFeedbackUpdated,
}) => {
  const [formData, setFormData] = useState<FeedbackUpdateRequest>({
    rating: feedback.rating,
    comment: feedback.comment || "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({
      ...formData,
      comment: e.target.value,
    });
  };

  const handleRatingChange = (
    _: React.SyntheticEvent,
    value: number | null
  ): void => {
    setFormData({
      ...formData,
      rating: value || 1,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await API.feedbacks.update(feedback.id, formData);
      setIsSubmitting(false);
      onFeedbackUpdated(response.data);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(t("feedbacks.dialogs.update.error"));
      console.error("Error updating feedback:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t("feedbacks.dialogs.update.title")}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="legend">
                {t("feedbacks.form.rating")}
              </Typography>
              <Rating
                name="feedback-rating"
                value={formData.rating}
                onChange={handleRatingChange}
                size="large"
                precision={1}
                sx={{ mt: 1, mb: 1 }}
              />
            </Box>

            <TextField
              name="comment"
              label={t("feedbacks.form.comment")}
              value={formData.comment}
              onChange={handleCommentChange}
              multiline
              rows={4}
              fullWidth
            />

            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            {t("feedbacks.dialogs.update.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || formData.rating < 1}
            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting
              ? t("feedbacks.dialogs.update.updating")
              : t("feedbacks.dialogs.update.updateButton")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateFeedbackDialog;
