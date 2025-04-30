import { PostCategoryName } from "../enum/postCategoryName";
import { UserInfo } from "../info/UserInfo";
import { Links } from "../Links";

export interface PostResponse {
  id: number;
  owner: UserInfo;
  title: string;
  description: string;
  content: string;
  category: PostCategoryName;
  createdAt: string;
  updatedAt: string;
  _links: Links;
}
