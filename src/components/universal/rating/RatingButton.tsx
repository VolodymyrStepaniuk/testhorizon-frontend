import React, { useState } from "react";
import { Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import RatingDialog from "./RatingDialog";
import { useTranslation } from "react-i18next";

interface RatingButtonProps {
  userId: number;
  entityType: string;
  entityTitle: string;
  onRatingUpdated?: () => void;
}

const RatingButton: React.FC<RatingButtonProps> = ({
  userId,
  entityType,
  entityTitle,
  onRatingUpdated,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { t } = useTranslation();

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleRatingUpdated = () => {
    handleCloseDialog();
    if (onRatingUpdated) {
      onRatingUpdated();
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<StarIcon />}
        onClick={handleOpenDialog}
        size="medium"
      >
        {t("rating.button")}
      </Button>

      <RatingDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        userId={userId}
        entityType={entityType}
        entityTitle={entityTitle}
        onRatingUpdated={handleRatingUpdated}
      />
    </>
  );
};

export default RatingButton;
