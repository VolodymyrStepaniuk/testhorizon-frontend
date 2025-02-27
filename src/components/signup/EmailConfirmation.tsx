import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { AUTH_VALIDATION } from "../../models/validation";
import { API } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

interface EmailConfirmationProps {
  email: string;
  open: boolean;
  handleClose: () => void;
}

export default function EmailConfirmation({
  email,
  open,
  handleClose,
}: EmailConfirmationProps) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Переконуємось, що довжина коду відповідає вимогам валідації
    if (
      code.length !== AUTH_VALIDATION.code.maxLength ||
      code.length !== AUTH_VALIDATION.code.minLength
    )
      return;

    setIsLoading(true);
    setError(null);

    try {
      await API.auth.verify({
        email: email,
        verificationCode: code,
      });
      handleClose();
      navigate("/sign-in");
    } catch (error: any) {
      setError(
        error.response?.data?.detail || "Verification failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
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
      <DialogTitle>Email Confirmation</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Please enter the 6-digit confirmation code sent to your email address
          to complete your account registration.
        </DialogContentText>
        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="confirmation-code"
          name="confirmation-code"
          placeholder="Enter 6-digit code"
          type="text"
          inputProps={{ maxLength: 6 }}
          fullWidth
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={
            isLoading ||
            code.length !== AUTH_VALIDATION.code.minLength ||
            code.length !== AUTH_VALIDATION.code.maxLength
          }
          sx={{
            "&.Mui-disabled": {
              color: "grey.600",
            },
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
