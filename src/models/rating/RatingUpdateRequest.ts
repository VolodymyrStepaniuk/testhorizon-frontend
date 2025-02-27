export interface RatingUpdateRequest {
  userId: number;
  ratingPoints: number;
  comment?: string;
}
