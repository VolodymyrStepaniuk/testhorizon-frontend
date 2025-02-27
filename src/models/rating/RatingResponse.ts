import { Links } from "../Links";

export interface RatingResponse {
  id: number;
  userId: number;
  ratedByUserId: number;
  ratingPoints: number;
  comment?: string;
  createdAt: string;
  _links: Links;
}
