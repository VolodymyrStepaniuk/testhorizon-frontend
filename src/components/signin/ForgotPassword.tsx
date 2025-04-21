import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import { API } from "../../services/api.service";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({
  open,
  handleClose,
}: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await API.auth.sendEmailPasswordReset({ email });
      console.log("Password reset email sent to:", email);
      handleAnyClose();
    } catch (error) {
      console.error("Error sending reset email:", error);
    } finally {
      alert(
        "If an account with this email exists in our system, an email with further instructions will be sent to it."
      );
      setIsLoading(false);
    }
  };

  const handleAnyClose = () => {
    if (cancelButtonRef.current) {
      cancelButtonRef.current.blur();
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleSubmit,
          sx: { backgroundImage: "none" },
        },
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a
          link to reset your password.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleAnyClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : "Send"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
