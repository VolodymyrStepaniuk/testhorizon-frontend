import { CommentEntityType } from "../enum/commentEntityTypes";

export interface CommentCreateRequest {
  entityType: CommentEntityType;
  entityId: number;
  content: string;
}
