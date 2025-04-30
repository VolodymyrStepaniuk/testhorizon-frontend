import React, { useRef } from "react";
import { Box, Typography, styled, IconButton, CardMedia } from "@mui/material";
import { FiImage, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const HeaderImageArea = styled(Box)(() => ({
  height: "200px",
  width: "100%",
  backgroundColor: "#e0e0e0",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#d0d0d0",
  },
  overflow: "hidden",
}));

const HeaderOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  transition: "opacity 0.3s ease",
  "&:hover": {
    opacity: 1,
  },
});

const RemoveButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: "rgba(255,255,255,0.8)",
  zIndex: 2,
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.9)",
  },
}));

interface HeaderImageUploaderProps {
  headerImagePreview: string | null;
  onImageUpload: (file: File) => void;
  onImageRemove: () => void;
}

const HeaderImageUploader: React.FC<HeaderImageUploaderProps> = ({
  headerImagePreview,
  onImageUpload,
  onImageRemove,
}) => {
  const { t } = useTranslation();
  const headerFileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileUpload = () => {
    if (headerFileInputRef.current) {
      headerFileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
      if (headerFileInputRef.current) {
        headerFileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageRemove();
  };

  return (
    <HeaderImageArea onClick={triggerFileUpload}>
      <input
        ref={headerFileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {headerImagePreview ? (
        <>
          <CardMedia
            component="img"
            image={headerImagePreview}
            alt="Header image"
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              objectFit: "cover",
            }}
          />
          <HeaderOverlay>
            <FiImage size={36} color="white" />
            <Typography color="white" variant="subtitle1" sx={{ mt: 1 }}>
              {t("postPages.create.changeHeaderImage")}
            </Typography>
          </HeaderOverlay>
          <RemoveButton onClick={handleRemoveImage}>
            <FiTrash2 />
          </RemoveButton>
        </>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          <FiPlusCircle size={48} color="#666" />
          <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
            {t("postPages.create.addHeaderImage")}
          </Typography>
        </Box>
      )}
    </HeaderImageArea>
  );
};

export default HeaderImageUploader;
