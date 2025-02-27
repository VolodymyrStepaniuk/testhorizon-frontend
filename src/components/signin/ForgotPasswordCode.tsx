import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import AppTheme from "../../theme/AppTheme";
import AppIcon from "../universal/AppIcon";

const ForgotPasswordCode: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateCode = (code: string): boolean => {
    if (code.length !== 6) {
      setError("Verification code must be exactly 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateCode(formData.code)) {
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Тут можна викликати API для перевірки коду та встановлення нового паролю
      // await authService.resetPassword(formData.code, formData.newPassword);
      navigate("/sign-in");
    } catch (err) {
      setError("Failed to reset password. Please try again.");
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
                htmlFor="code"
                sx={{ color: "white", mb: 0.5, fontWeight: 700 }}
              >
                Code from email
              </FormLabel>
              <TextField
                autoComplete="off"
                name="code"
                required
                fullWidth
                id="code"
                placeholder="123456"
                value={formData.code}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel
                htmlFor="newPassword"
                sx={{ color: "white", mb: 0.5, fontWeight: 700 }}
              >
                New Password
              </FormLabel>
              <TextField
                required
                fullWidth
                id="newPassword"
                placeholder="••••••"
                name="newPassword"
                autoComplete="new-password"
                type="password"
                variant="outlined"
                value={formData.newPassword}
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
                placeholder="••••••"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                variant="outlined"
                value={formData.confirmPassword}
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
