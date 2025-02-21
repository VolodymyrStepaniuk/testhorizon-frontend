import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import SitemarkIcon from "../../components/universal/SitemarkIcon";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

// Створюємо спеціальну тему для Select
const selectTheme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: document.body,
        disableScrollLock: true,
      },
      styleOverrides: {
        root: {
          position: "fixed",
        },
        paper: {
          backgroundImage: "none",
        },
      },
    },
    MuiModal: {
      defaultProps: {
        disableScrollLock: true,
        container: document.body,
      },
      styleOverrides: {
        root: {
          position: "fixed",
        },
      },
    },
  },
});

export default function SignUp() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [role, setRole] = React.useState("");

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const name = document.getElementById("name") as HTMLInputElement;

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

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (nameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <SignUpContainer direction="column" justifyContent="center">
      <ThemeProvider theme={selectTheme}>
        <Card variant="outlined" sx={{ transform: "none !important" }}>
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
            Sign up
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
                htmlFor="name"
                sx={{ color: "white", mb: 0.5 }}
                className="nunito-bold"
              >
                Full name
              </FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? "error" : "primary"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "hsl(220deg 20% 25% / 60%)" },
                    "&:hover fieldset": {
                      borderColor: "hsl(220deg 20% 25% / 60%)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "hsl(220deg 20% 25% / 60%)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    padding: { xs: "8px 12px", sm: "16.5px 14px" },
                  },
                }}
                inputProps={{ className: "nunito-regular" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="email"
                sx={{ color: "white", mb: 0.5 }}
                className="nunito-bold"
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
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? "error" : "primary"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "hsl(220deg 20% 25% / 60%)" },
                    "&:hover fieldset": {
                      borderColor: "hsl(220deg 20% 25% / 60%)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "hsl(220deg 20% 25% / 60%)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    padding: { xs: "8px 12px", sm: "16.5px 14px" },
                  },
                }}
                inputProps={{ className: "nunito-regular" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="password"
                sx={{ color: "white", mb: 0.5 }}
                className="nunito-bold"
              >
                Password
              </FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "hsl(220deg 20% 25% / 60%)" },
                    "&:hover fieldset": {
                      borderColor: "hsl(220deg 20% 25% / 60%)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "hsl(220deg 20% 25% / 60%)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    padding: { xs: "8px 12px", sm: "16.5px 14px" },
                  },
                }}
                inputProps={{ className: "nunito-regular" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="role"
                sx={{
                  color: "white",
                  mb: 0.5,
                  "&.Mui-focused": { color: "white" },
                }}
                className="nunito-bold"
              >
                Role
              </FormLabel>
              <Select
                required
                fullWidth
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "hsl(220deg 20% 25% / 60%)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "hsl(220deg 20% 25% / 60%)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "hsl(220deg 20% 25% / 60%)",
                  },
                  "& .MuiSelect-icon": {
                    color: "white",
                  },
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  fontFamily: "Nunito",
                  "& .MuiSelect-select": {
                    fontFamily: "Nunito",
                    padding: { xs: "8px 12px", sm: "16.5px 14px" },
                  },
                }}
                MenuProps={{
                  disablePortal: false,
                  disableScrollLock: true,
                  slotProps: {
                    paper: {
                      style: {
                        transform: "none",
                      },
                    },
                  },
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                }}
              >
                <MenuItem value="developer" className="nunito-regular">
                  Developer
                </MenuItem>
                <MenuItem value="tester" className="nunito-regular">
                  Tester
                </MenuItem>
              </Select>
            </FormControl>
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
                fontSize: { xs: "0.875rem", sm: "1rem" },
                py: { xs: 1, sm: 1.5 },
                mt: { xs: 1, sm: 2 },
              }}
            >
              Sign up
            </Button>
            <Typography
              sx={{
                textAlign: "center",
                color: "white",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
              className="nunito-regular"
            >
              Already have an account?{" "}
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: "center" }}
                className="nunito-bold"
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </ThemeProvider>
    </SignUpContainer>
  );
}
