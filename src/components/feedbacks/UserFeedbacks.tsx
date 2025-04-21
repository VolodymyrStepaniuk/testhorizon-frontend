import React, { useState, useEffect } from "react";
import { Paper, Typography, Divider } from "@mui/material";
import { FeedbackResponse } from "../../models/feedback/FeedbackResponse";
import { UserResponse } from "../../models/user/UserResponse";
import FeedbackList from "./FeedbackList";
import { API } from "../../services/api.service";

interface UserFeedbacksProps {
  currentUser: UserResponse;
  onEdit: (feedback: FeedbackResponse) => void;
  onDelete: (id: number) => void;
  refreshTrigger: number;
  isAdmin?: boolean;
}

const UserFeedbacks: React.FC<UserFeedbacksProps> = ({
  currentUser,
  onEdit,
  onDelete,
  refreshTrigger,
  isAdmin = false,
}) => {
  const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUserFeedbacks = async () => {
      setLoading(true);
      try {
        const response = await API.feedbacks.getAll({
          page: currentPage - 1,
          size: 5,
          ownerId: currentUser.id,
        });
        const feedbackData = response.data._embedded?.feedbacks || [];
        setFeedbacks(Array.isArray(feedbackData) ? feedbackData : []);

        const totalPagesValue =
          response.data.page?.totalPages ||
          (response.data.page?.totalElements
            ? Math.ceil(response.data.page.totalElements / 5)
            : 1);
        setTotalPages(totalPagesValue);
      } catch (error) {
        console.error("Failed to fetch user feedbacks:", error);
        setFeedbacks([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchUserFeedbacks();
  }, [currentUser.id, currentPage, refreshTrigger]);

  const isFeedbackOwner = (feedback: FeedbackResponse) => {
    return currentUser.id === feedback.owner.id;
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Your Feedbacks
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <FeedbackList
        feedbacks={feedbacks}
        currentUser={currentUser}
        onEdit={onEdit}
        onDelete={onDelete}
        loading={loading}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        emptyMessage="You haven't submitted any feedback yet."
        isAdmin={isAdmin}
        isFeedbackOwner={isFeedbackOwner}
      />
    </Paper>
  );
};

export default UserFeedbacks;
