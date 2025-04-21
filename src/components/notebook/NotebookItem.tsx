import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import { FiTrash2, FiEdit, FiClock } from "react-icons/fi";
import { NotebookResponse } from "../../models/notebook/NotebookResponse";
import { formatDate } from "../../utils/format.utils";

interface NotebookItemProps {
  notebook: NotebookResponse;
  onSelect: (nb: NotebookResponse) => void;
  onDelete: (id: number) => void;
  onEdit: (nb: NotebookResponse) => void;
}

const NotebookItem: React.FC<NotebookItemProps> = ({
  notebook,
  onSelect,
  onDelete,
  onEdit,
}) => {
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
        onClick={() => onSelect(notebook)}
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
              {notebook.title}
            </Typography>

            <Box>
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(notebook);
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
                    onDelete(notebook.id);
                  }}
                  sx={{ ml: 0.5 }}
                  color="error"
                >
                  <FiTrash2 size={16} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {notebook.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {notebook.description}
            </Typography>
          )}

          <Box display="flex" alignItems="center" mt={1}>
            <FiClock style={{ marginRight: 4 }} size={14} color="gray" />
            <Typography variant="caption" color="text.secondary">
              {formatDate(notebook.updatedAt)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotebookItem;
