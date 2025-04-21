import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { FiClock, FiEdit, FiTrash2 } from "react-icons/fi";
import { NoteResponse } from "../../../models/notebook/note/NoteResponse";
import { formatDate } from "../../../utils/format.utils";

interface NoteItemProps {
  note: NoteResponse;
  onView: (note: NoteResponse) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onView,
  onEdit,
  onDelete,
}) => {
  const previewContent =
    note.content && note.content.length > 100
      ? `${note.content.substring(0, 100)}...`
      : note.content;

  return (
    <Box sx={{ mb: 2 }}>
      <Card
        elevation={1}
        sx={{
          borderRadius: 1,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: 3,
          },
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() => onView(note)}
      >
        <CardContent sx={{ pb: 1 }}>
          {/* Title with action buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Typography variant="h6" component="div">
              {note.title}
            </Typography>

            <Box>
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                  sx={{ ml: 0.5 }}
                >
                  <FiEdit size={16} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  sx={{ ml: 0.5 }}
                  color="error"
                >
                  <FiTrash2 size={16} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {previewContent && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {previewContent}
            </Typography>
          )}

          <Box display="flex" alignItems="center" mt={1}>
            <FiClock style={{ marginRight: 4 }} size={14} color="gray" />
            <Typography variant="caption" color="text.secondary">
              {formatDate(note.updatedAt)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NoteItem;
