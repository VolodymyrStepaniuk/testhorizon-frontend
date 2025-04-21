import React from "react";
import { Box, Pagination, Alert, CircularProgress } from "@mui/material";
import { FeedbackResponse } from "../../models/feedback/FeedbackResponse";
import FeedbackItem from "./FeedbackItem";
import { UserResponse } from "../../models/user/UserResponse";

interface FeedbackListProps {
  feedbacks: FeedbackResponse[];
  currentUser?: UserResponse | null;
  onEdit: (feedback: FeedbackResponse) => void;
  onDelete: (id: number) => void;
  loading: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  excludeUserId?: number;
  emptyMessage?: string;
  isAdmin?: boolean;
  isFeedbackOwner?: (feedback: FeedbackResponse) => boolean;
}

const FeedbackList: React.FC<FeedbackListProps> = ({
  feedbacks,
  currentUser,
  onEdit,
  onDelete,
  loading,
  totalPages,
  currentPage,
  onPageChange,
  excludeUserId,
  emptyMessage = "No feedbacks available.",
  isAdmin = false,
  isFeedbackOwner,
}) => {
  const filteredFeedbacks = excludeUserId
    ? feedbacks.filter((feedback) => feedback.owner.id !== excludeUserId)
    : feedbacks;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (filteredFeedbacks.length === 0) {
    return <Alert severity="info">{emptyMessage}</Alert>;
  }

  return (
    <Box>
      {filteredFeedbacks.map((feedback) => (
        <FeedbackItem
          key={feedback.id}
          feedback={feedback}
          currentUser={currentUser}
          onEdit={onEdit}
          onDelete={onDelete}
          isAdmin={isAdmin}
          isOwner={isFeedbackOwner ? isFeedbackOwner(feedback) : false}
        />
      ))}

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default FeedbackList;
