import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { UserResponse } from "../../../models/user/UserResponse";
import { UserUpdateRequest } from "../../../models/user/UserUpdateRequest";
import { API } from "../../../services/api.service";
import { useTranslation } from "react-i18next";
import { AuthorityName } from "../../../models/enum/authorityNames";

interface EditUserDialogProps {
  open: boolean;
  user: UserResponse;
  onClose: () => void;
  onUserUpdated: () => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  open,
  user,
  onClose,
  onUserUpdated,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<UserUpdateRequest>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const [selectedAuthority, setSelectedAuthority] = useState<AuthorityName>(
    user.authorities && user.authorities.length > 0
      ? user.authorities[0]
      : AuthorityName.DEVELOPER
  );

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

    if (user.authorities && user.authorities.length > 0) {
      setSelectedAuthority(user.authorities[0]);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAuthorityChange = (e: SelectChangeEvent) => {
    setSelectedAuthority(e.target.value as AuthorityName);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await API.users.update(user.id, formData);

      const currentAuthority =
        user.authorities && user.authorities.length > 0
          ? user.authorities[0]
          : null;

      if (selectedAuthority !== currentAuthority) {
        await API.users.changeUserAuthority(user.id, selectedAuthority);
      }

      onUserUpdated();
      onClose();
    } catch (err) {
      console.error("Error updating user:", err);
      setError(t("userAdmin.editDialog.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t("userAdmin.editDialog.title")}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              name="firstName"
              label={t("userAdmin.createDialog.firstName")}
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              required
            />

            <TextField
              name="lastName"
              label={t("userAdmin.createDialog.lastName")}
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              required
            />

            <TextField
              name="email"
              label={t("userAdmin.createDialog.email")}
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
            />

            <FormControl fullWidth>
              <InputLabel id="authority-select-label">
                {t("userAdmin.createDialog.userRole")}
              </InputLabel>
              <Select
                labelId="authority-select-label"
                value={selectedAuthority}
                label={t("userAdmin.createDialog.userRole")}
                onChange={handleAuthorityChange}
              >
                {Object.values(AuthorityName).map((authority) => (
                  <MenuItem key={authority} value={authority}>
                    {t(`enums.user.authority.${authority}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            {t("userAdmin.editDialog.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting
              ? t("userAdmin.editDialog.updatingButton")
              : t("userAdmin.editDialog.updateButton")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditUserDialog;
