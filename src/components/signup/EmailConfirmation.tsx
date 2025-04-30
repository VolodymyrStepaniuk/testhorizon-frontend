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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        error.response?.data?.detail || t("emailConfirmation.defaultError")
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
      <DialogTitle>{t("emailConfirmation.title")}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          {t("emailConfirmation.description")}
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
          placeholder={t("emailConfirmation.placeholder")}
          type="text"
          inputProps={{ maxLength: 6 }}
          fullWidth
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose} disabled={isLoading}>
          {t("emailConfirmation.cancelButton")}
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
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            t("emailConfirmation.confirmButton")
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
