import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Rating,
  Grid,
  IconButton,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { FeedbackResponse } from "../../models/feedback/FeedbackResponse";
import { UserResponse } from "../../models/user/UserResponse";
import UpdateFeedbackDialog from "./dialogs/UpdateFeedbackDialog";
import DeleteFeedbackDialog from "./dialogs/DeleteFeedbackDialog";
import SettingsMenu from "../universal/menu/SettingsMenu";
import { formatDate } from "../../utils/format.utils";

interface FeedbackItemProps {
  feedback: FeedbackResponse;
  currentUser?: UserResponse | null;
  onEdit: (feedback: FeedbackResponse) => void;
  onDelete: (id: number) => void;
  isAdmin?: boolean;
  isOwner?: boolean;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({
  feedback,
  onEdit,
  onDelete,
  isAdmin = false,
  isOwner = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentFeedback, setCurrentFeedback] =
    useState<FeedbackResponse>(feedback);

  const canModify = isAdmin || isOwner;
  const open = Boolean(anchorEl);

  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setUpdateDialogOpen(true);
    handleCloseMenu();
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
    handleCloseMenu();
  };

  const handleFeedbackUpdated = (updatedFeedback: FeedbackResponse) => {
    setCurrentFeedback(updatedFeedback);
    onEdit(updatedFeedback);
  };

  const handleFeedbackDeleted = () => {
    onDelete(feedback.id);
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">
              {`${currentFeedback.owner.firstName} ${currentFeedback.owner.lastName}`}
            </Typography>
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Rating value={currentFeedback.rating} readOnly precision={1} />
            {canModify && (
              <IconButton
                onClick={handleSettingsClick}
                size="small"
                sx={{ ml: 1 }}
                aria-label="feedback options"
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {formatDate(currentFeedback.createdAt)}
          {currentFeedback.updatedAt !== currentFeedback.createdAt}
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          {currentFeedback.comment || <em>No comment provided</em>}
        </Typography>
      </CardContent>

      <SettingsMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UpdateFeedbackDialog
        open={updateDialogOpen}
        onClose={() => setUpdateDialogOpen(false)}
        feedback={currentFeedback}
        onFeedbackUpdated={handleFeedbackUpdated}
      />

      <DeleteFeedbackDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        feedbackId={currentFeedback.id}
        onFeedbackDeleted={handleFeedbackDeleted}
      />
    </Card>
  );
};

export default FeedbackItem;
