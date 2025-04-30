import React, { FormEvent } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { translateEnum } from "../../../utils/i18n.utils";
import { PostCategoryName } from "../../../models/enum/postCategoryName";
import { PostCreateRequest } from "../../../models/post/PostCreateRequest";
import ContentEditor from "../ContentEditor";

interface FormErrors {
  title?: string;
  content?: string;
  category?: string;
  description?: string;
}

interface PostFormProps {
  formData: PostCreateRequest;
  content: string;
  errors: FormErrors;
  loading: boolean;
  onFormChange: (data: PostCreateRequest) => void;
  onContentChange: (content: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  onReset: () => void;
}

const PostForm: React.FC<PostFormProps> = ({
  formData,
  content,
  errors,
  loading,
  onFormChange,
  onContentChange,
  onSubmit,
  onReset,
}) => {
  const { t } = useTranslation();

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    onFormChange({
      ...formData,
      category: e.target.value as PostCategoryName,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            {t("postPages.create.postTitle")}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={t("postPages.create.postTitlePlaceholder")}
            value={formData.title}
            onChange={(e) =>
              onFormChange({ ...formData, title: e.target.value })
            }
            error={!!errors.title}
            helperText={errors.title}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            {t("postPages.create.category")}
          </Typography>
          <FormControl fullWidth variant="outlined">
            <Select
              value={formData.category}
              onChange={handleCategoryChange}
              error={!!errors.category}
            >
              {Object.values(PostCategoryName).map((category) => (
                <MenuItem key={category} value={category}>
                  {translateEnum("enums.post.category", category)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {errors.category && (
            <Typography color="error" variant="caption">
              {errors.category}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            {t("postPages.create.description")}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            placeholder={t("postPages.create.description")}
            value={formData.description}
            onChange={(e) =>
              onFormChange({ ...formData, description: e.target.value })
            }
            error={!!errors.description}
            helperText={errors.description}
          />
        </Grid>

        <Grid item xs={12}>
          <ContentEditor
            content={content}
            onChange={onContentChange}
            error={errors.content}
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" gap={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={onReset} disabled={loading}>
              {t("postPages.create.reset")}
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={loading || !formData.title.trim() || !content.trim()}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                t("postPages.create.submit")
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostForm;
