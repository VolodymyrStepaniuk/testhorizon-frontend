import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { API } from "../../services/api.service";
import { CommentEntityType } from "../../models/enum/commentEntityTypes";
import { CommentCreateRequest } from "../../models/comment/CommentCreateRequest";
import CommentItem from "./CommentItem";
import { useAuth } from "../../contexts/AuthContext";
import { CommentResponse } from "../../models/comment/CommentResponse";
import { AuthorityName } from "../../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../../utils/auth.utils";

interface CommentsProps {
  entityId: number;
  entityType: CommentEntityType;
}

const Comments: React.FC<CommentsProps> = ({ entityId, entityType }) => {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { user } = useAuth();

  const authorities = getAutoritiesFromToken();
  const currentUserRole = authorities[0] as AuthorityName;
  const isAdmin = currentUserRole === AuthorityName.ADMIN;

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await API.comments.getByEntity({
        entityId,
        entityType,
        page: 0,
        size: 20,
      });
      setComments(response.data?._embedded?.comments || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [entityId, entityType]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    try {
      setSubmitting(true);
      const commentRequest: CommentCreateRequest = {
        entityId,
        entityType,
        content: commentText,
      };

      await API.comments.create(commentRequest);
      setCommentText("");
      fetchComments();
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await API.comments.delete(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
      showNotification("Comment deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting comment:", err);
      showNotification("Failed to delete comment", "error");
    }
  };

  const handleUpdateComment = async (commentId: number, content: string) => {
    try {
      await API.comments.update(commentId, { content });
      setComments(
        comments.map((comment) =>
          comment.id === commentId ? { ...comment, content } : comment
        )
      );
      showNotification("Comment updated successfully", "success");
    } catch (err) {
      console.error("Error updating comment:", err);
      showNotification("Failed to update comment", "error");
    }
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const isCommentOwner = (comment: CommentResponse) => {
    return user?.id === comment.author.id;
  };

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress size={30} />
        </Box>
      ) : error || comments.length === 0 ? (
        <ListItem>
          <ListItemText primary="There's no comment yet!" />
        </ListItem>
      ) : (
        <List sx={{ mb: 3 }}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              isOwner={isCommentOwner(comment)}
              isAdmin={isAdmin}
              onDelete={handleDeleteComment}
              onUpdate={handleUpdateComment}
            />
          ))}
        </List>
      )}

      {/* Add Comment Form */}
      <Box sx={{ display: "flex", alignItems: "flex-start", mt: 2 }}>
        <Avatar
          sx={{ mr: 2, mt: 1, width: 40, height: 40 }}
          alt={user?.firstName || ""}
          src="/static/images/avatar/7.jpg"
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add a comment..."
          multiline
          rows={2}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          sx={{ mr: 2 }}
          disabled={submitting}
        />
        <Button
          variant="contained"
          endIcon={<Send />}
          onClick={handleCommentSubmit}
          disabled={!commentText.trim() || submitting}
          sx={{ mt: 1 }}
        >
          {submitting ? <CircularProgress size={24} /> : "Post"}
        </Button>
      </Box>

      <Snackbar
        open={notification !== null}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        message=""
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification?.type || "success"}
          sx={{ width: "100%" }}
        >
          {notification?.message || ""}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Comments;
