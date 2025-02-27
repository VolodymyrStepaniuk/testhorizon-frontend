import { Links } from "../Links";

export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  totalRating: number;
  createdAt: string;
  updatedAt: string;
  _links: Links;
}
