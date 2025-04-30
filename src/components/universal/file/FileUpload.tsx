import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import { useTranslation } from "react-i18next";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = "*",
  label,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { t } = useTranslation();

  // Use provided label or default translation
  const buttonLabel = label || t("files.upload");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
        inputProps={{ accept }}
      />
      <label htmlFor="file-upload">
        <Button variant="outlined" className="w-full">
          <span>{selectedFile ? selectedFile.name : buttonLabel}</span>
        </Button>
      </label>
    </div>
  );
};

export default FileUpload;
