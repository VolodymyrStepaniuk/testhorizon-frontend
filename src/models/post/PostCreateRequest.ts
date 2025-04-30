import { PostCategoryName } from "../enum/postCategoryName";

export interface PostCreateRequest {
  title: string;
  content: string;
  description: string;
  category: PostCategoryName;
}
