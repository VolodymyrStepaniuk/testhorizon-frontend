import React, { useState, useEffect } from "react";
import { Paper, Typography, Divider } from "@mui/material";
import { API } from "../../services/api.service";
import { FeedbackResponse } from "../../models/feedback/FeedbackResponse";
import { UserResponse } from "../../models/user/UserResponse";
import FeedbackList from "./FeedbackList";
import { useTranslation } from "react-i18next";

interface AllFeedbacksProps {
  currentUser?: UserResponse | null;
  onEdit: (feedback: FeedbackResponse) => void;
  onDelete: (id: number) => void;
  refreshTrigger: number;
  isAdmin?: boolean;
  isFeedbackOwner: (feedback: FeedbackResponse) => boolean;
}

const AllFeedbacks: React.FC<AllFeedbacksProps> = ({
  currentUser,
  onEdit,
  onDelete,
  refreshTrigger,
  isAdmin = false,
  isFeedbackOwner,
}) => {
  const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const response = await API.feedbacks.getAll({
          page: currentPage - 1,
          size: 5,
        });

        const fetchedFeedbacks = response.data._embedded?.feedbacks || [];
        setFeedbacks(Array.isArray(fetchedFeedbacks) ? fetchedFeedbacks : []);
        setTotalPages(response.data.page?.totalPages || 0);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
        setError("Failed to load feedbacks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [currentPage, refreshTrigger]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {t("feedbacks.allFeedbacks")}
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
        onPageChange={handlePageChange}
        emptyMessage={t("feedbacks.noFeedbacks")}
        isAdmin={isAdmin}
        isFeedbackOwner={isFeedbackOwner}
      />
    </Paper>
  );
};

export default AllFeedbacks;
