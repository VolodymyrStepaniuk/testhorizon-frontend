import React, { useState } from "react";
import { Button, Input } from "@mui/material";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = "*",
  label = "Upload File",
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
          <span>{selectedFile ? selectedFile.name : label}</span>
        </Button>
      </label>
    </div>
  );
};

export default FileUpload;
