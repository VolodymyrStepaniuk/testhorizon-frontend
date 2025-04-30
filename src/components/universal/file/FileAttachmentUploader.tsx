import { ChangeEvent } from "react";
import {
  Box,
  Typography,
  Alert,
  IconButton,
  styled,
  Grid,
} from "@mui/material";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import React from "react";

const UploadBox = styled(Box)(() => ({
  border: "2px dashed #ccc",
  borderRadius: "8px",
  padding: "2rem",
  textAlign: "center",
  cursor: "pointer",
  transition: "border 0.3s ease",
  "&:hover": {
    border: "2px dashed #1976d2",
  },
}));

interface Props {
  files: File[];
  onFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: (index: number) => void;
}

const FileAttachmentUploader: React.FC<Props> = ({
  files,
  onFileUpload,
  onFileRemove,
}) => {
  const { t } = useTranslation();

  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1" gutterBottom>
        {t("bugReportPages.create.uploadFiles")}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
        {t("bugReportPages.create.uploadDescription")}
      </Typography>
      <label htmlFor="file-upload">
        <UploadBox>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={onFileUpload}
            style={{ display: "none" }}
          />
          <FiUpload size={24} style={{ marginBottom: "1rem" }} />
          <Typography>{t("bugReportPages.create.dropFiles")}</Typography>
        </UploadBox>
      </label>
      {files.length > 0 && (
        <Box mt={2}>
          {files.map((file, index) => (
            <Alert
              key={index}
              icon={false}
              sx={{ mb: 1 }}
              action={
                <IconButton size="small" onClick={() => onFileRemove(index)}>
                  <FiTrash2 />
                </IconButton>
              }
            >
              {file.name}
            </Alert>
          ))}
        </Box>
      )}
    </Grid>
  );
};

export default FileAttachmentUploader;
