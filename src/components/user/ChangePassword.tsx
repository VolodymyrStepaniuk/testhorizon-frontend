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
import { gray } from "../../theme/themePrimitives";
import { UpdatePasswordRequest } from "../../models/auth/UpdatePasswordRequest";

interface ChangePasswordProps {
  passwordData: UpdatePasswordRequest;
  passwordErrors: { newPassword: boolean; confirmPassword: boolean };
  loading: boolean;
  onPasswordChange: (
    field: keyof UpdatePasswordRequest,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSavePassword: () => Promise<void>;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  passwordData,
  passwordErrors,
  loading,
  onPasswordChange,
  onSavePassword,
}) => {
  return (
    <Card
      elevation={3}
      sx={{ width: "100%", background: alpha(gray[700], 0.1) }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom align="center">
          Change Password
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="Current Password"
              value={passwordData.oldPassword}
              onChange={(e) => onPasswordChange("oldPassword", e)}
              required
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="New Password"
              value={passwordData.newPassword}
              onChange={(e) => onPasswordChange("newPassword", e)}
              required
              error={passwordErrors.newPassword}
              helperText={
                passwordErrors.newPassword
                  ? "Password must be at least 6 characters"
                  : ""
              }
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={(e) => onPasswordChange("confirmPassword", e)}
              required
              error={passwordErrors.confirmPassword}
              helperText={
                passwordErrors.confirmPassword ? "Passwords do not match" : ""
              }
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSavePassword}
            disabled={loading}
          >
            Update Password
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
