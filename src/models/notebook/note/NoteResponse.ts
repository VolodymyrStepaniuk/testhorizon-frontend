import { Links } from "../../Links";

export interface NoteResponse {
  id: number;
  notebookId: number;
  title: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  _links: Links;
}
