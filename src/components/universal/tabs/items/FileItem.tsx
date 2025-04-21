import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  InsertDriveFile as FileIcon,
  CloudDownload as DownloadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

interface FileItemProps {
  name: string;
  type: string;
  fileUrl?: string;
  onDelete?: () => void;
}

const FileItem: React.FC<FileItemProps> = ({ name, fileUrl, onDelete }) => {
  const handleDownload = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  return (
    <ListItem
      secondaryAction={
        <>
          {fileUrl && (
            <Tooltip title="Download">
              <IconButton edge="end" onClick={handleDownload}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip title="Delete">
              <IconButton edge="end" onClick={onDelete} sx={{ ml: 1 }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <FileIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} />
    </ListItem>
  );
};

export default FileItem;
