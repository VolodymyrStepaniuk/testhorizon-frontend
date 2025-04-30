import React, { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  IconButton,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { Edit, Delete, Cancel, Save } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { formatDistanceLocalized } from "../../utils/format.utils";

interface CommentItemProps {
  comment: {
    id: number;
    content: string;
    createdAt: string;
    author: {
      firstName?: string;
      lastName?: string;
    };
  };
  isOwner: boolean;
  isAdmin: boolean;
  onDelete: (commentId: number) => void;
  onUpdate: (commentId: number, content: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  isOwner,
  isAdmin,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { t } = useTranslation();

  const canModify = isOwner || isAdmin;

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleSaveEdit = () => {
    if (editedContent.trim()) {
      onUpdate(comment.id, editedContent);
      setIsEditing(false);
    }
  };

  return (
    <React.Fragment>
      <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
        <ListItemIcon sx={{ minWidth: 56, mr: 0.1 }}>
          <Avatar sx={{ width: 40, height: 40 }}>
            {comment.author.firstName?.charAt(0) || "?"}
          </Avatar>
        </ListItemIcon>
        <ListItemText
          primary={
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle2">
                {`${comment.author.firstName} ${comment.author.lastName}`}
              </Typography>
              {canModify && !isEditing && (
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <IconButton
                    size="small"
                    onClick={handleEditClick}
                    sx={{ p: 0.5, mr: 1 }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(comment.id)}
                    sx={{ p: 0.5 }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          }
          secondary={
            <React.Fragment>
              {isEditing ? (
                <Box sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    size="small"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    autoFocus
                    sx={{ mb: 1 }}
                  />
                  <Box
                    sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={handleCancelEdit}
                    >
                      {t("comments.actions.cancel")}
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSaveEdit}
                      disabled={!editedContent.trim()}
                    >
                      {t("comments.actions.save")}
                    </Button>
                  </Box>
                </Box>
              ) : (
                <>
                  <Typography
                    sx={{ display: "block", mt: 0.5 }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {formatDistanceLocalized(new Date(comment.createdAt))}
                  </Typography>
                </>
              )}
            </React.Fragment>
          }
          sx={{ m: 0 }}
        />
      </ListItem>
      <Divider variant="inset" component="li" sx={{ ml: 7 }} />
    </React.Fragment>
  );
};

export default CommentItem;
