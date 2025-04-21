import { UserAuthorityName } from "../enum/userAuthorityName";

export interface UserCreateRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  authorityName: UserAuthorityName;
}
