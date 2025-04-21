import { CommentEntityType } from "../enum/commentEntityTypes";
import { Links } from "../Links";
import { UserInfo } from "../info/UserInfo";

export interface CommentResponse {
  id: number;
  entityType: CommentEntityType;
  entityId: number;
  content: string;
  author: UserInfo;
  createdAt: string;
  updatedAt: string;
  _links: Links;
}
