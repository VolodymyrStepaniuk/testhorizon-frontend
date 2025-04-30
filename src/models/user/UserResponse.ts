import { AuthorityName } from "../enum/authorityNames";
import { Links } from "../Links";

export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  totalRating: number;
  authorities: AuthorityName[];
  createdAt: string;
  updatedAt: string;
  _links: Links;
}
