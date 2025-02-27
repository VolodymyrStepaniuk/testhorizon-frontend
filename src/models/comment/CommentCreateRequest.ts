import { CommentEntityType } from "../../constants/enum/commentEntityTypes";

export interface CommentCreateRequest {
  entityType: CommentEntityType;
  entityId: number;
  content: string;
}
