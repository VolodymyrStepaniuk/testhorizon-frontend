import { UserInfo } from "../info/UserInfo";

export interface FeedbackResponse {
  id: number;
  rating: number;
  comment?: string;
  owner: UserInfo;
  createdAt: string;
  updatedAt: string;
}
