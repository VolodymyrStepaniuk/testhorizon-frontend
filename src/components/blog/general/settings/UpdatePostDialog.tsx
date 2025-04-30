import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Box,
  Grid,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { API } from "../../../../services/api.service";
import { PostResponse } from "../../../../models/post/PostResponse";
import { PostUpdateRequest } from "../../../../models/post/PostUpdateRequest";
import { PostCategoryName } from "../../../../models/enum/postCategoryName";
import { useTranslation } from "react-i18next";
import { translateEnum } from "../../../../utils/i18n.utils";
import ContentEditor from "../../ContentEditor";

interface UpdatePostDialogProps {
  open: boolean;
  onClose: () => void;
  post: PostResponse;
  onPostUpdated: (updatedPost: PostResponse) => void;
}

const UpdatePostDialog: React.FC<UpdatePostDialogProps> = ({
  open,
  onClose,
  post,
  onPostUpdated,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<PostUpdateRequest>({
    title: post.title,
    description: post.description || "",
    content: post.content || "",
    category: post.category,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContentChange = (value: string): void => {
    setFormData({
      ...formData,
      content: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<PostCategoryName>): void => {
    setFormData({
      ...formData,
      category: e.target.value as PostCategoryName,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await API.posts.update(post.id, formData);
      setIsSubmitting(false);
      onPostUpdated(response.data);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(t("postPages.edit.updateError"));
      console.error("Error updating post:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{t("postPages.edit.title")}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              name="title"
              label={t("postPages.create.postTitle")}
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
            />

            <TextField
              name="description"
              label={t("postPages.create.description")}
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={2}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="category-label">
                {t("postPages.create.category")}
              </InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={formData.category}
                onChange={handleSelectChange}
                label={t("postPages.create.category")}
                required
              >
                {Object.values(PostCategoryName).map((category) => (
                  <MenuItem key={category} value={category}>
                    {translateEnum("enums.post.category", category)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Grid item xs={12}>
              <ContentEditor
                content={formData.content || ""}
                onChange={handleContentChange}
                error={undefined}
              />
            </Grid>

            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            {t("blog.update.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? t("blog.update.updating") : t("blog.update.update")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdatePostDialog;
