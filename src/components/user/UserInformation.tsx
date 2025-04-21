import React, { ChangeEvent } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/system";
import { FaEdit } from "react-icons/fa";
import { gray } from "../../theme/themePrimitives";
import { UserUpdateRequest } from "../../models/user/UserUpdateRequest";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

interface UserInformationProps {
  userData: UserData;
  updateRequest: UserUpdateRequest;
  editMode: boolean;
  loading: boolean;
  onToggleEdit: () => void;
  onInputChange: (
    field: keyof UserUpdateRequest,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSave: () => Promise<void>;
}

const UserInformation: React.FC<UserInformationProps> = ({
  userData,
  updateRequest,
  editMode,
  loading,
  onToggleEdit,
  onInputChange,
  onSave,
}) => {
  return (
    <Card
      elevation={3}
      sx={{ width: "100%", background: alpha(gray[700], 0.1) }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">Personal Details</Typography>
          <Button startIcon={<FaEdit />} onClick={onToggleEdit} color="primary">
            {editMode ? "Cancel" : "Edit"}
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              value={editMode ? updateRequest.firstName : userData.firstName}
              onChange={(e) => onInputChange("firstName", e)}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={editMode ? updateRequest.lastName : userData.lastName}
              onChange={(e) => onInputChange("lastName", e)}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={editMode ? updateRequest.email : userData.email}
              onChange={(e) => onInputChange("email", e)}
              disabled={!editMode}
            />
          </Grid>
        </Grid>
        {editMode && (
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSave}
              disabled={loading}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default UserInformation;
