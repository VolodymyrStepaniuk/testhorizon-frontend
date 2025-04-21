import { UserInfo } from "../info/UserInfo";
import { Links } from "../Links";

export interface NotebookResponse {
  id: number;
  owner: UserInfo;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  _links: Links;
}
