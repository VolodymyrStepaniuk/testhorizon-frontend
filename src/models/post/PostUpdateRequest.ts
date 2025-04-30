import { PostCategoryName } from "../enum/postCategoryName";

export interface PostUpdateRequest {
  title?: string;
  content?: string;
  description?: string;
  category?: PostCategoryName;
}
