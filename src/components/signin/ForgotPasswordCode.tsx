import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CssBaseline,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppTheme from "../../theme/AppTheme";
import AppIcon from "../universal/AppIcon";
import { API } from "../../services/api.service";
import { UNIVERSAL_VALIDATION } from "../../models/validation";

const ForgotPasswordCode: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    password: { error: false, message: "" },
    confirmPassword: { error: false, message: "" },
  });

  const [error, setError] = useState("");

  const validatePassword = (password: string): boolean => {
    if (!password || !UNIVERSAL_VALIDATION.password.pattern.test(password)) {
      setFormErrors((prev) => ({
        ...prev,
        password: {
          error: true,
          message: t("resetPassword.validation.requirementsNotMet"),
        },
      }));
      return false;
    }
    if (
      password.length < UNIVERSAL_VALIDATION.password.minLength ||
      password.length > UNIVERSAL_VALIDATION.password.maxLength
    ) {
      setFormErrors((prev) => ({
        ...prev,
        password: {
          error: true,
          message: t("resetPassword.validation.lengthError", {
            min: UNIVERSAL_VALIDATION.password.minLength,
            max: UNIVERSAL_VALIDATION.password.maxLength,
          }),
        },
      }));
      return false;
    }
    setFormErrors((prev) => ({
      ...prev,
      password: { error: false, message: "" },
    }));
    return true;
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): boolean => {
    if (password !== confirmPassword) {
      setFormErrors((prev) => ({
        ...prev,
        confirmPassword: {
          error: true,
          message: t("resetPassword.validation.passwordMismatch"),
        },
      }));
      return false;
    }
    setFormErrors((prev) => ({
      ...prev,
      confirmPassword: { error: false, message: "" },
    }));
    return true;
  };

  useEffect(() => {
    if (!token) {
      setError(t("resetPassword.invalidLink"));
    }
  }, [token, t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const isPasswordValid = validatePassword(formData.password);
    const isConfirmPasswordValid = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    if (!isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    if (!token) {
      setError(t("resetPassword.invalidLink"));
      return;
    }

    try {
      await API.auth.emailResetPassword(token, {
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      navigate("/sign-in", {
        state: {
          message: t("resetPassword.success"),
        },
      });
    } catch (err: any) {
      console.error("Error resetting password:", err);
      setError(err.response?.data?.message || t("resetPassword.error"));
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            padding: 3,
            maxWidth: 500,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              mb: { xs: 1, sm: 2 },
              "& > svg": {
                transform: "scale(1.2)",
                width: { xs: "120px", sm: "140px" },
                height: "auto",
              },
            }}
          >
            <AppIcon />
          </Box>
          <Typography
            component="h2"
            variant="h2"
            sx={{
              width: "100%",
              fontWeight: 700,
              textAlign: "center",
              mt: { xs: 1, sm: 2 },
            }}
          >
            {t("resetPassword.title")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
          >
            <FormControl fullWidth>
              <FormLabel
                htmlFor="password"
                sx={{ color: "white", mb: 0.5, fontWeight: 700 }}
              >
                {t("resetPassword.newPassword")}
              </FormLabel>
              <TextField
                required
                fullWidth
                id="password"
                placeholder={t("resetPassword.passwordPlaceholder")}
                name="password"
                autoComplete="new-password"
                type="password"
                variant="outlined"
                value={formData.password}
                error={formErrors.password.error}
                helperText={formErrors.password.message}
                color={formErrors.password.error ? "error" : "primary"}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel
                htmlFor="confirmPassword"
                sx={{ color: "white", mb: 0.5, fontWeight: 700 }}
              >
                {t("resetPassword.repeatPassword")}
              </FormLabel>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                placeholder={t("resetPassword.passwordPlaceholder")}
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                variant="outlined"
                value={formData.confirmPassword}
                error={formErrors.confirmPassword.error}
                helperText={formErrors.confirmPassword.message}
                color={formErrors.confirmPassword.error ? "error" : "primary"}
                onChange={handleInputChange}
              />
            </FormControl>
            {error && (
              <Typography
                color="error"
                variant="body2"
                sx={{ textAlign: "center" }}
              >
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                fontWeight: 700,
              }}
            >
              {t("resetPassword.resetButton")}
            </Button>
          </Box>
        </Card>
      </Box>
    </AppTheme>
  );
};

export default ForgotPasswordCode;
