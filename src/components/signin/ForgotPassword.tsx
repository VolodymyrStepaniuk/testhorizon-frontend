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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      alert(t("forgotPassword.successMessage"));
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
      <DialogTitle>{t("forgotPassword.title")}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>{t("forgotPassword.description")}</DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label={t("forgotPassword.emailPlaceholder")}
          placeholder={t("forgotPassword.emailPlaceholder")}
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button
          onClick={handleAnyClose}
          disabled={isLoading}
          ref={cancelButtonRef}
        >
          {t("forgotPassword.cancelButton")}
        </Button>
        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            t("forgotPassword.sendButton")
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
