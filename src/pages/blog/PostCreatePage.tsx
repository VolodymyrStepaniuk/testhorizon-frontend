import React, { useState, FormEvent } from "react";
import {
  Container,
  Typography,
  styled,
  Alert,
  Snackbar,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API } from "../../services/api.service";
import { PostCreateRequest } from "../../models/post/PostCreateRequest";
import { PostCategoryName } from "../../models/enum/postCategoryName";
import { FileEntityType } from "../../models/enum/fileEntityType";
import HeaderImageUploader from "../../components/blog/create/HeaderImageUploader";
import PostForm from "../../components/blog/create/PostForm";

const PostCard = styled(Card)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  boxShadow: theme.shadows[2],
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

interface FormErrors {
  title?: string;
  content?: string;
  category?: string;
  description?: string;
}

const PostCreatePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PostCreateRequest>({
    title: "",
    description: "",
    content: "",
    category: PostCategoryName.AUTOMATION_QA,
  });

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [headerImage, setHeaderImage] = useState<File | null>(null);
  const [headerImagePreview, setHeaderImagePreview] = useState<string | null>(
    null
  );
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = t("postPages.create.titleRequired");
    } else if (formData.title.length > 100) {
      newErrors.title = t("postPages.create.titleLength");
    }

    if (!content.trim()) {
      newErrors.content = t("postPages.create.contentRequired");
    }

    if (!formData.description.trim()) {
      newErrors.description = t("postPages.create.descriptionRequired");
    }

    if (!formData.category) {
      newErrors.category = t("postPages.create.categoryRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const postData = {
        ...formData,
        content: content,
      };

      const response = await API.posts.create(postData);
      const postId = response.data.id;
      let hasErrors = false;

      if (headerImage) {
        try {
          const headerImageName = "header";
          const renamedFile = new File([headerImage], headerImageName, {
            type: headerImage.type,
          });

          await API.files.upload(FileEntityType.POST, postId, [renamedFile]);
        } catch (headerError) {
          console.error("Error uploading header image:", headerError);
          hasErrors = true;
        }
      }

      if (files.length > 0) {
        try {
          await API.files.upload(FileEntityType.POST, postId, files);
        } catch (fileError) {
          console.error("Error uploading attachment files:", fileError);
          hasErrors = true;
        }
      }

      if (hasErrors) {
        setSnackbar({
          open: true,
          message: t("postPages.create.partialSuccess"),
          severity: "error",
        });
      } else {
        setSnackbar({
          open: true,
          message: t("postPages.create.successMessage"),
          severity: "success",
        });
        setTimeout(() => navigate("/blog"), 1500);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setSnackbar({
        open: true,
        message: t("postPages.create.errorMessage"),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      category: PostCategoryName.AUTOMATION_QA,
    });
    setContent("");
    setFiles([]);
    setHeaderImage(null);
    setHeaderImagePreview(null);
    setErrors({});
  };

  const handleHeaderImageUpload = (file: File) => {
    setHeaderImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setHeaderImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleHeaderImageRemove = () => {
    setHeaderImage(null);
    setHeaderImagePreview(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        align="center"
        sx={{
          mt: 3,
          mb: 4,
          fontWeight: "bold",
          color: (theme) => theme.palette.text.primary,
        }}
      >
        {t("postPages.create.title")}
      </Typography>

      <PostCard>
        <HeaderImageUploader
          headerImagePreview={headerImagePreview}
          onImageUpload={handleHeaderImageUpload}
          onImageRemove={handleHeaderImageRemove}
        />

        <StyledCardContent>
          <PostForm
            formData={formData}
            content={content}
            errors={errors}
            loading={loading}
            onFormChange={setFormData}
            onContentChange={setContent}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        </StyledCardContent>
      </PostCard>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PostCreatePage;
