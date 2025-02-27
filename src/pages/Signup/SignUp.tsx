import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../../theme/AppTheme";
import AppIcon from "../../components/universal/AppIcon";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { UNIVERSAL_VALIDATION, USER_VALIDATION } from "../../models/validation";
import { useState } from "react";
import { API } from "../../services/api.service";
import { UserCreateRequest } from "../../models/user/UserCreateRequest";
import EmailConfirmation from "../../components/signup/EmailConfirmation";
import CircularProgress from "@mui/material/CircularProgress";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  maxWidth: "450px",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    width: "90%",
    maxWidth: "350px",
  },
  [theme.breakpoints.down("xs")]: {
    width: "85%",
    maxWidth: "300px",
    padding: theme.spacing(1.5),
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    backgroundRepeat: "no-repeat",
  },
}));

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    authorityName: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: { error: false, message: "" },
    password: { error: false, message: "" },
    firstName: { error: false, message: "" },
    lastName: { error: false, message: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const validateEmail = (email: string): boolean => {
    if (!email || !UNIVERSAL_VALIDATION.email.pattern.test(email)) {
      setFormErrors((prev) => ({
        ...prev,
        email: { error: true, message: "Please enter a valid email address" },
      }));
      return false;
    }
    setFormErrors((prev) => ({
      ...prev,
      email: { error: false, message: "" },
    }));
    return true;
  };

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

  const validateName = (
    name: string,
    field: "firstName" | "lastName"
  ): boolean => {
    if (!name || !USER_VALIDATION.firstName.pattern.test(name)) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: {
          error: true,
          message: "Only letters, spaces and hyphens allowed",
        },
      }));
      return false;
    }
    if (
      name.length < USER_VALIDATION.firstName.minLength ||
      name.length > USER_VALIDATION.firstName.maxLength
    ) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: {
          error: true,
          message: `Name length must be between ${USER_VALIDATION.firstName.minLength} and ${USER_VALIDATION.firstName.maxLength} characters`,
        },
      }));
      return false;
    }
    setFormErrors((prev) => ({
      ...prev,
      [field]: { error: false, message: "" },
    }));
    return true;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate field on change
    switch (name) {
      case "email":
        validateEmail(value);
        break;
      case "password":
        validatePassword(value);
        break;
      case "firstName":
      case "lastName":
        validateName(value, name);
        break;
    }
  };

  const handleAuthorityChange = (event: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      authorityName: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid =
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      validateName(formData.firstName, "firstName") &&
      validateName(formData.lastName, "lastName");

    if (!isValid) return;

    setIsLoading(true);
    setApiError("");

    try {
      await API.auth.register(formData as UserCreateRequest);
      setShowConfirmationDialog(true);
    } catch (error: any) {
      setApiError(
        error.response?.data?.detail || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
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
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel
                htmlFor="firstName"
                sx={{
                  color: "white",
                  mb: 0.5,
                  fontWeight: 700,
                }}
              >
                First name
              </FormLabel>
              <TextField
                autoComplete="firstName"
                name="firstName"
                required
                fullWidth
                id="firstName"
                placeholder="Jon"
                value={formData.firstName}
                onChange={handleInputChange}
                error={formErrors.firstName.error}
                helperText={formErrors.firstName.message}
                color={formErrors.firstName.error ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="lastName"
                sx={{
                  color: "white",
                  mb: 0.5,
                  fontWeight: 700,
                }}
              >
                Last name
              </FormLabel>
              <TextField
                autoComplete="lastName"
                name="lastName"
                required
                fullWidth
                id="lastName"
                placeholder="Snow"
                value={formData.lastName}
                onChange={handleInputChange}
                error={formErrors.lastName.error}
                helperText={formErrors.lastName.message}
                color={formErrors.lastName.error ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                sx={{
                  color: "white",
                  mb: 0.5,
                  fontWeight: 700,
                }}
              >
                Role
              </FormLabel>
              <Select
                required
                value={formData.authorityName}
                onChange={handleAuthorityChange}
                name="authorityName"
                id="authorityName"
              >
                <MenuItem value="TESTER">Tester</MenuItem>
                <MenuItem value="DEVELOPER">Developer</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="email"
                sx={{
                  color: "white",
                  mb: 0.5,
                  fontWeight: 700,
                }}
              >
                Email
              </FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                value={formData.email}
                onChange={handleInputChange}
                error={formErrors.email.error}
                helperText={formErrors.email.message}
                color={formErrors.email.error ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="password"
                sx={{
                  color: "white",
                  mb: 0.5,
                  fontWeight: 700,
                }}
              >
                Password
              </FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                value={formData.password}
                onChange={handleInputChange}
                error={formErrors.password.error}
                helperText={formErrors.password.message}
                color={formErrors.password.error ? "error" : "primary"}
              />
            </FormControl>
            {apiError && (
              <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
                {apiError}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 2,
                fontWeight: 700,
              }}
            >
              {isLoading ? <CircularProgress size={24} /> : "Sign up"}
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              sx={{
                alignSelf: "center",
                mt: { xs: 0.5, sm: 1 },
              }}
            >
              Already have an account?{" "}
              <Link
                href="/sign-in/"
                variant="body2"
                sx={{ alignSelf: "center", fontWeight: 700 }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
        <EmailConfirmation
          open={showConfirmationDialog}
          email={formData.email}
          handleClose={() => setShowConfirmationDialog(false)}
        />
      </SignUpContainer>
    </AppTheme>
  );
}
