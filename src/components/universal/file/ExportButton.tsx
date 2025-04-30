import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TableViewIcon from "@mui/icons-material/TableView";
import CodeIcon from "@mui/icons-material/Code";
import { useTranslation } from "react-i18next";
import { ExportEntityType } from "../../../models/enum/exportEntityTypes";
import { ExportFormat } from "../../../models/enum/exportFormat";
import { API } from "../../../services/api.service";

interface ExportButtonProps {
  entityType: ExportEntityType;
  entityId: number;
  buttonText?: string;
  variant?: "text" | "outlined" | "contained";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  size?: "small" | "medium" | "large";
}

const ExportButton: React.FC<ExportButtonProps> = ({
  entityType,
  entityId,
  buttonText,
  variant = "outlined",
  color = "primary",
  size = "medium",
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState<ExportFormat | null>(null);
  const { t } = useTranslation();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = async (exportFormat: ExportFormat) => {
    try {
      setLoading(exportFormat);

      // Call the API export method that returns a Blob
      const blob = await API.export.getExportFile(
        entityType,
        entityId,
        exportFormat
      );

      // Create filename with proper extension
      const extension = exportFormat.toLowerCase();
      const fileName = `${entityType.toLowerCase()}_${entityId}.${extension}`;

      // Create a temporary URL for the blob and trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      handleClose();
    } catch (error) {
      console.error("Error exporting file:", error);
      // You could add a notification here
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        color={color}
        size={size}
        startIcon={<FileDownloadIcon />}
        onClick={handleClick}
      >
        {buttonText || t("exportButton.button")}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => handleExport(ExportFormat.CSV)}
          disabled={loading === ExportFormat.CSV}
        >
          <ListItemIcon>
            {loading === ExportFormat.CSV ? (
              <CircularProgress size={20} />
            ) : (
              <TableViewIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>{t("exportButton.csvFormat")}</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => handleExport(ExportFormat.XML)}
          disabled={loading === ExportFormat.XML}
        >
          <ListItemIcon>
            {loading === ExportFormat.XML ? (
              <CircularProgress size={20} />
            ) : (
              <CodeIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>{t("exportButton.xmlFormat")}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ExportButton;
