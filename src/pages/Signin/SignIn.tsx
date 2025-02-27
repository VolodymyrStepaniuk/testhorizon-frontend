import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppIcon from "../../components/universal/AppIcon";
import ForgotPassword from "../../components/signin/ForgotPassword";
import { useNavigate } from "react-router-dom";
import { API } from "../../services/api.service";
import { setTokensToStorage } from "../../utils/auth.utils";
import { useAuth } from "../../contexts/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  maxWidth: "450px",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid hsl(220deg 20% 25% / 60%)",
  color: "white",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
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

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100dvh",
  minHeight: "100%",
  padding: theme.spacing(2),
  overflow: "auto",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundRepeat: "no-repeat",
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  },
}));

export default function SignIn() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsAuth, fetchUser } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    setIsLoading(true);
    try {
      const response = await API.auth.login({
        email,
        password,
      });

      const { access_token, refresh_token } = response.data;

      setTokensToStorage(access_token, refresh_token, rememberMe);
      setIsAuth(true);

      await fetchUser();

      navigate("/home");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to sign in";
      setEmailError(true);
      setPasswordError(true);
      setEmailErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <SignInContainer direction="column" justifyContent="center">
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
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: { xs: 1.5, sm: 2 },
          }}
        >
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
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
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
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                value="remember"
                color="primary"
              />
            }
            label="Remember me"
          />
          <ForgotPassword open={open} handleClose={handleClose} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
            disabled={isLoading}
            sx={{
              fontWeight: 700,
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Sign in"}
          </Button>
          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{
              alignSelf: "center",
              fontWeight: 600,
              mt: { xs: 0.5, sm: 1 },
            }}
          >
            Forgot your password?
          </Link>
        </Box>
      </Card>
    </SignInContainer>
  );
}
