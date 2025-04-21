import { GridRowsProp } from "@mui/x-data-grid";
import { UserResponse } from "../../../../models/user/UserResponse";

export const mapUserRows = (users?: UserResponse[]): GridRowsProp =>
  users?.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    totalRating: user.totalRating,
    createdAt: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : "",
    updatedAt: user.updatedAt
      ? new Date(user.updatedAt).toLocaleDateString()
      : "",
  })) || [];
