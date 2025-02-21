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
import SitemarkIcon from "../../components/universal/SitemarkIcon";
import ForgotPassword from "../../components/signin/ForgotPassword";

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
  fontFamily: "nunito-bold",
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
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
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
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
          <SitemarkIcon />
        </Box>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            fontSize: {
              xs: "1.5rem",
              sm: "1.75rem",
              md: "2.15rem",
            },
            textAlign: "center",
            mt: { xs: 1, sm: 2 },
          }}
          className="nunito-bold"
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
              }}
              className="nunito-bold"
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "hsl(220deg 20% 25% / 60%)",
                  },
                  "&:hover fieldset": {
                    borderColor: "hsl(220deg 20% 25% / 60%)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "hsl(220deg 20% 25% / 60%)",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                  fontSize: {
                    xs: "0.875rem",
                    sm: "1rem",
                  },
                  padding: { xs: "8px 12px", sm: "16.5px 14px" },
                },
              }}
              inputProps={{
                className: "nunito-regular",
                style: { color: "white" },
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="password"
              sx={{
                color: "white",
                mb: 0.5,
              }}
              className="nunito-bold"
            >
              Password
            </FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "hsl(220deg 20% 25% / 60%)",
                  },
                  "&:hover fieldset": {
                    borderColor: "hsl(220deg 20% 25% / 60%)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "hsl(220deg 20% 25% / 60%)",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                  fontSize: {
                    xs: "0.875rem",
                    sm: "1rem",
                  },
                  padding: { xs: "8px 12px", sm: "16.5px 14px" },
                },
              }}
              inputProps={{
                style: { color: "white" },
              }}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                sx={{
                  color: "hsl(220deg 20% 25% / 60%)",
                  padding: { xs: "4px", sm: "9px" },
                }}
              />
            }
            label="Remember me"
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "white",
                fontFamily: "Nunito, sans-serif",
                fontWeight: "bold",
                fontSize: {
                  xs: "0.875rem",
                  sm: "1rem",
                },
              },
            }}
          />
          <ForgotPassword open={open} handleClose={handleClose} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
            className="nunito-bold"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#FFA500",
              bgcolor: "rgb(245, 246, 250)",
              border: "1px solid rgb(245, 246, 250)",
              color: "black",
              fontSize: {
                xs: "0.875rem",
                sm: "1rem",
              },
              py: {
                xs: 1,
                sm: 1.5,
              },
              mt: { xs: 1, sm: 2 },
            }}
          >
            Sign in
          </Button>
          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{
              alignSelf: "center",
              fontSize: {
                xs: "0.75rem",
                sm: "0.875rem",
              },
              mt: { xs: 0.5, sm: 1 },
            }}
            className="nunito-bold"
          >
            Forgot your password?
          </Link>
        </Box>
      </Card>
    </SignInContainer>
  );
}
