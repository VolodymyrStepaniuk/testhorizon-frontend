import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Slider,
  Box,
} from "@mui/material";
import { API } from "../../../services/api.service";
import NotificationSnackbar from "../notification/NotificationSnackbar";

interface RatingDialogProps {
  open: boolean;
  onClose: () => void;
  userId: number;
  entityType: string;
  entityTitle: string; // Title of the entity for context
  onRatingUpdated?: () => void;
}

const RatingDialog: React.FC<RatingDialogProps> = ({
  open,
  onClose,
  userId,
  entityType,
  entityTitle,
  onRatingUpdated,
}) => {
  const [ratingPoints, setRatingPoints] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleRatingChange = (_event: Event, newValue: number | number[]) => {
    setRatingPoints(newValue as number);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await API.ratings.change({
        userId: userId,
        ratingPoints: ratingPoints,
        comment: comment || undefined,
      });

      setNotification({
        open: true,
        message: "Rating successfully updated",
        severity: "success",
      });

      if (onRatingUpdated) {
        onRatingUpdated();
      }
    } catch (error) {
      console.error("Error updating rating:", error);
      setNotification({
        open: true,
        message: "Failed to update rating",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Rate User for {entityType}: {entityTitle}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography gutterBottom>
              Adjust rating points (-10 to +10):
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={ratingPoints}
                onChange={handleRatingChange}
                min={-10}
                max={10}
                step={1}
                marks={[
                  { value: -10, label: "-10" },
                  { value: -5, label: "-5" },
                  { value: 0, label: "0" },
                  { value: 5, label: "+5" },
                  { value: 10, label: "+10" },
                ]}
                valueLabelDisplay="on"
              />
            </Box>
          </Box>

          <TextField
            margin="normal"
            label="Comment (optional)"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChange}
          />

          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            This will {ratingPoints >= 0 ? "add" : "subtract"}{" "}
            {Math.abs(ratingPoints)} points {ratingPoints >= 0 ? "to" : "from"}{" "}
            the user's rating.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={ratingPoints === 0 || loading}
          >
            {loading ? "Submitting..." : "Submit Rating"}
          </Button>
        </DialogActions>
      </Dialog>

      <NotificationSnackbar
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </>
  );
};

export default RatingDialog;
