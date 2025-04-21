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
import AppTheme from "../../theme/AppTheme";
import AppIcon from "../universal/AppIcon";
import { API } from "../../services/api.service";
import { UNIVERSAL_VALIDATION } from "../../models/validation";

const ForgotPasswordCode: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
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
          message:
            "Password must contain uppercase, lowercase, number and special character",
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
          message: `Password length must be between ${UNIVERSAL_VALIDATION.password.minLength} and ${UNIVERSAL_VALIDATION.password.maxLength} characters`,
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
          message: "Passwords do not match",
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
      setError("Invalid reset link. Please request a new one.");
    }
  }, [token]);

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
      setError("Invalid reset link. Please request a new one.");
      return;
    }

    try {
      await API.auth.emailResetPassword(token, {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      navigate("/sign-in", {
        state: {
          message:
            "Password successfully reset. Please sign in with your new password.",
        },
      });
    } catch (err: any) {
      console.error("Error resetting password:", err);
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
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
            Reset Password
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
                New Password
              </FormLabel>
              <TextField
                required
                fullWidth
                id="password"
                placeholder="••••••••"
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
                Repeat New Password
              </FormLabel>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                placeholder="••••••••"
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
              Reset Password
            </Button>
          </Box>
        </Card>
      </Box>
    </AppTheme>
  );
};

export default ForgotPasswordCode;
