import { UserInfo } from "../info/UserInfo";
import { Links } from "../Links";

export interface RatingResponse {
  id: number;
  user: UserInfo;
  ratedByUser: UserInfo;
  ratingPoints: number;
  comment?: string;
  createdAt: string;
  _links: Links;
}
