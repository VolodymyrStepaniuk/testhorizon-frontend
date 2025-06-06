import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { FiBook, FiX } from "react-icons/fi";
import { gray } from "../../theme/themePrimitives";
import { useTranslation } from "react-i18next";

interface NotebookHeaderProps {
  onClose: () => void;
}

const NotebookHeader: React.FC<NotebookHeaderProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: gray[700],
        color: "primary.contrastText",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FiBook size={20} style={{ marginRight: 8 }} />
        <Typography variant="h6">{t("notebook.widget.title")}</Typography>
      </Box>
      <IconButton size="small" onClick={onClose} sx={{ color: "inherit" }}>
        <FiX />
      </IconButton>
    </Box>
  );
};

export default NotebookHeader;
