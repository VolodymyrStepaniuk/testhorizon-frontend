import React, { useRef } from "react";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FiImage } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const StyledQuillWrapper = styled(Box)(({ theme }) => ({
  ".ql-container": {
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    fontFamily: theme.typography.fontFamily,
  },
  ".ql-toolbar": {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.mode === "light" ? "#f8f9fa" : "#333",
    borderColor: theme.palette.divider,
  },
  ".ql-editor": {
    minHeight: "300px",
    fontSize: "1rem",
    color: theme.palette.text.primary,
    "&.ql-blank::before": {
      color: theme.palette.text.secondary,
      fontStyle: "normal",
    },
  },
  ".ql-snow.ql-toolbar button": {
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.primary.main,
    },
    "&.ql-active": {
      color: theme.palette.primary.main,
    },
  },
  ".ql-snow.ql-toolbar .ql-stroke": {
    stroke: theme.palette.text.secondary,
  },
  ".ql-snow.ql-toolbar .ql-fill": {
    fill: theme.palette.text.secondary,
  },
  ".ql-snow.ql-toolbar button:hover .ql-stroke": {
    stroke: theme.palette.primary.main,
  },
  ".ql-snow.ql-toolbar button.ql-active .ql-stroke": {
    stroke: theme.palette.primary.main,
  },
  ".ql-snow.ql-toolbar button:hover .ql-fill": {
    fill: theme.palette.primary.main,
  },
  ".ql-snow.ql-toolbar button.ql-active .ql-fill": {
    fill: theme.palette.primary.main,
  },
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.divider}`,
}));

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
    ["link"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "blockquote",
  "code-block",
  "color",
  "background",
  "link",
  "image",
];

interface ContentEditorProps {
  content: string;
  onChange: (content: string) => void;
  error?: string;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  content,
  onChange,
  error,
}) => {
  const { t } = useTranslation();
  const imgRef = useRef<HTMLInputElement>(null);

  const handleImgInsert = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        onChange(
          content + `<p><img src="${imageUrl}" alt="Uploaded image" /></p>`
        );

        if (imgRef.current) {
          imgRef.current.value = "";
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Typography variant="subtitle1" gutterBottom fontWeight="medium">
        {t("postPages.create.content")}
      </Typography>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Stack spacing={1}>
          <Button
            onClick={() => imgRef.current?.click()}
            sx={{
              minWidth: 0,
              p: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? "#f8f9fa" : "#333",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
          >
            <FiImage size={20} />
          </Button>
          <input
            ref={imgRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImgInsert}
          />
        </Stack>
        <Box sx={{ flex: 1 }}>
          <StyledQuillWrapper>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={onChange}
              modules={quillModules}
              formats={quillFormats}
              placeholder={t("postPages.create.contentPlaceholder")}
            />
          </StyledQuillWrapper>
        </Box>
      </Stack>
      {error && (
        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </>
  );
};

export default ContentEditor;
