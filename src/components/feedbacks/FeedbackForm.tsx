import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  TextField,
  Typography,
  Rating,
  CircularProgress,
} from "@mui/material";
import { FeedbackCreateRequest } from "../../models/feedback/FeedbackCreateRequest";
import { FeedbackResponse } from "../../models/feedback/FeedbackResponse";
import { FeedbackUpdateRequest } from "../../models/feedback/FeedbackUpdateRequest";

interface FeedbackFormProps {
  initialFeedback?: FeedbackResponse;
  onSubmit: (feedback: FeedbackCreateRequest | FeedbackUpdateRequest) => void;
  loading: boolean;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  initialFeedback,
  onSubmit,
  loading,
}) => {
  const [rating, setRating] = useState<number | null>(
    initialFeedback?.rating || null
  );
  const [comment, setComment] = useState<string>(
    initialFeedback?.comment || ""
  );

  useEffect(() => {
    if (initialFeedback) {
      setRating(initialFeedback.rating);
      setComment(initialFeedback.comment || "");
    }
  }, [initialFeedback]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === null) return;

    onSubmit({
      rating,
      comment: comment.trim() || undefined,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="legend">Your Rating</Typography>
        <Rating
          name="feedback-rating"
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          size="large"
          precision={1}
          sx={{ mt: 1, mb: 1 }}
        />
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        margin="normal"
        label="Comment (Optional)"
        placeholder="Share your experience with TestHorizon..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={rating === null || loading}
        sx={{ mt: 3 }}
        startIcon={
          loading ? <CircularProgress size={20} color="inherit" /> : null
        }
      >
        {initialFeedback ? "Update Feedback" : "Submit Feedback"}
      </Button>
    </Box>
  );
};

export default FeedbackForm;
