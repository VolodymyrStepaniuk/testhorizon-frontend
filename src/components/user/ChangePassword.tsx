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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <Card
      elevation={3}
      sx={{ width: "100%", background: alpha(gray[700], 0.1) }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom align="center">
          {t("userProfile.changePassword.title")}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label={t("userProfile.changePassword.currentPassword")}
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
              label={t("userProfile.changePassword.newPassword")}
              value={passwordData.newPassword}
              onChange={(e) => onPasswordChange("newPassword", e)}
              required
              error={passwordErrors.newPassword}
              helperText={
                passwordErrors.newPassword
                  ? t("userProfile.changePassword.validation.passwordLength")
                  : ""
              }
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label={t("userProfile.changePassword.confirmPassword")}
              value={passwordData.confirmPassword}
              onChange={(e) => onPasswordChange("confirmPassword", e)}
              required
              error={passwordErrors.confirmPassword}
              helperText={
                passwordErrors.confirmPassword
                  ? t("userProfile.changePassword.validation.passwordMismatch")
                  : ""
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
            {t("userProfile.changePassword.updatePassword")}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
