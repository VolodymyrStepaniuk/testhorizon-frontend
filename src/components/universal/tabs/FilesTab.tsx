import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  Divider,
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { API } from "../../../services/api.service";
import { FileEntityType } from "../../../models/enum/fileEntityType";
import FileItem from "./items/FileItem";
import { useTranslation } from "react-i18next";

interface FilesTabProps {
  entityId: number;
  entityType: FileEntityType;
  isAdmin: boolean;
  isOwner: boolean;
}

interface FileData {
  id: string;
  name: string;
  type: string;
  url: string;
}

const FilesTab: React.FC<FilesTabProps> = ({
  entityId,
  entityType,
  isAdmin,
  isOwner,
}) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const canDeleteFiles = isAdmin || isOwner;

  const processFiles = (fileEntities: any[]) => {
    return fileEntities.map((file) => {
      const url = file.fileUrl;
      const urlParts = url.split("/");
      const fileName = urlParts[urlParts.length - 1];

      const fileExtParts = fileName.split(".");
      const fileExt = fileExtParts.length > 1 ? fileExtParts.pop() || "" : "";

      return {
        id: file._links?.self?.href || fileName,
        name: fileName,
        type: fileExt,
        url: url,
      };
    });
  };

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await API.files.list(entityType, entityId);

      if (
        response.data &&
        "_embedded" in response.data &&
        response.data._embedded &&
        response.data._embedded.files
      ) {
        const fileEntities = response.data._embedded.files;
        setFiles(processFiles(fileEntities));
      } else if (response.data && "fileUrl" in response.data) {
        const fileUrls = [response.data.fileUrl as string];

        const processedFiles = fileUrls.map((url: string) => {
          const urlParts = url.split("/");
          const fileName = urlParts[urlParts.length - 1];

          const fileExtParts = fileName.split(".");
          const fileExt =
            fileExtParts.length > 1 ? fileExtParts.pop() || "" : "";

          return {
            id: fileName,
            name: fileName,
            type: fileExt,
            url: url,
          };
        });

        setFiles(processedFiles);
      } else {
        setFiles([]);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching files:", err);
      setError(t("files.loadError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [entityId, entityType]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      try {
        setLoading(true);
        const fileList = Array.from(event.target.files);
        await API.files.upload(entityType, entityId, fileList);

        fetchFiles();
      } catch (err) {
        console.error("Error uploading files:", err);
        setError(t("files.uploadError"));
        setLoading(false);
      }
    }
  };

  const handleFileDelete = async (fileName: string) => {
    if (!canDeleteFiles) return;

    try {
      setLoading(true);
      await API.files.delete(entityType, entityId, [fileName]);
      fetchFiles();
    } catch (err) {
      console.error("Error deleting file:", err);
      setError(t("files.deleteError"));
      setLoading(false);
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">{t("files.title")}</Typography>
        <div>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={triggerFileUpload}
            disabled={loading}
          >
            {t("files.upload")}
          </Button>
        </div>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : files.length > 0 ? (
        <Paper variant="outlined">
          <List>
            {files.map((file, index) => (
              <React.Fragment key={file.id}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <FileItem
                      name={file.name}
                      type={file.type}
                      fileUrl={file.url}
                    />
                  </Box>
                  {canDeleteFiles && (
                    <Tooltip title={t("files.deleteTooltip")}>
                      <IconButton
                        color="error"
                        onClick={() => handleFileDelete(file.name)}
                        sx={{ mr: 1 }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
                {index < files.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      ) : (
        <Alert severity="info">{t("files.noFiles")}</Alert>
      )}
    </>
  );
};

export default FilesTab;
