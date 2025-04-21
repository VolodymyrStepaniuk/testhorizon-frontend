import React, { useState } from "react";
import { Container, Typography, Paper, Divider } from "@mui/material";
import { API } from "../../services/api.service";
import { FeedbackResponse } from "../../models/feedback/FeedbackResponse";
import FeedbackForm from "../../components/feedbacks/FeedbackForm";
import UserFeedbacks from "../../components/feedbacks/UserFeedbacks";
import AllFeedbacks from "../../components/feedbacks/AllFeedbacks";
import { FeedbackCreateRequest } from "../../models/feedback/FeedbackCreateRequest";
import { useAuth } from "../../contexts/AuthContext";
import { AuthorityName } from "../../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../../utils/auth.utils";
import NotificationSnackbar from "../../components/universal/notification/NotificationSnackbar";

const FeedbackPage: React.FC = () => {
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({ open: false, message: "", severity: "success" });

  const { user } = useAuth();

  const authorities = getAutoritiesFromToken();
  const currentUserRole = authorities[0] as AuthorityName;
  const isAdmin = currentUserRole === AuthorityName.ADMIN;

  const isFeedbackOwner = (feedback: FeedbackResponse): boolean => {
    return user?.id === feedback.owner.id;
  };

  const handleCreateFeedback = async (feedback: FeedbackCreateRequest) => {
    setFormLoading(true);
    try {
      await API.feedbacks.create(feedback);
      setSnackbar({
        open: true,
        message: "Feedback submitted successfully!",
        severity: "success",
      });
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to create feedback:", error);
      setSnackbar({
        open: true,
        message: "Failed to submit feedback. Please try again.",
        severity: "error",
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditFeedback = () => {
    setRefreshTrigger((prev) => prev + 1);
    setSnackbar({
      open: true,
      message: "Feedback updated successfully!",
      severity: "success",
    });
  };

  const handleDeleteFeedback = () => {
    setRefreshTrigger((prev) => prev + 1);
    setSnackbar({
      open: true,
      message: "Feedback deleted successfully!",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{ mb: 6, fontWeight: "bold" }}
      >
        TestHorizon Feedback
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {user && (
        <>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Submit Your Feedback
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FeedbackForm
              onSubmit={handleCreateFeedback}
              loading={formLoading}
            />
          </Paper>

          <UserFeedbacks
            currentUser={user}
            onEdit={handleEditFeedback}
            onDelete={handleDeleteFeedback}
            refreshTrigger={refreshTrigger}
            isAdmin={isAdmin}
          />
        </>
      )}

      <AllFeedbacks
        currentUser={user}
        onEdit={handleEditFeedback}
        onDelete={handleDeleteFeedback}
        refreshTrigger={refreshTrigger}
        isAdmin={isAdmin}
        isFeedbackOwner={isFeedbackOwner}
      />

      <NotificationSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
};

export default FeedbackPage;
