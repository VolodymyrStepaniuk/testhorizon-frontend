import React, { useState } from "react";
import { Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import RatingDialog from "./RatingDialog";

interface RatingButtonProps {
  userId: number;
  entityType: string; // E.g., "Bug Report", "Test Case", "Test"
  entityTitle: string; // Title of the entity for context
  onRatingUpdated?: () => void; // Optional callback for when rating is updated
}

const RatingButton: React.FC<RatingButtonProps> = ({
  userId,
  entityType,
  entityTitle,
  onRatingUpdated,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

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
        Rate User
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
