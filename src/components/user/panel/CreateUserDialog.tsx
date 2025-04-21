import React, { useState } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { UserCreateRequest } from "../../../models/user/UserCreateRequest";
import { API } from "../../../services/api.service";
import {
  UNIVERSAL_VALIDATION,
  USER_VALIDATION,
} from "../../../models/validation";
import { UserAuthorityName } from "../../../models/enum/userAuthorityName";
import { AuthorityName } from "../../../models/enum/authorityNames";
import { formatEnumWithoutLowerUnderline } from "../../../utils/format.utils";

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
  open,
  onClose,
  onUserCreated,
}) => {
  const [formData, setFormData] = useState<UserCreateRequest>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    authorityName: UserAuthorityName.TESTER,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const userRoles = Object.values(AuthorityName);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });

    // Clear error for this field
    if (name in formErrors) {
      setFormErrors({
        ...formErrors,
        [name]: false,
      });
    }
  };

  const validateForm = () => {
    const errors = {
      firstName:
        !formData.firstName ||
        formData.firstName.length < USER_VALIDATION.firstName.minLength,
      lastName:
        !formData.lastName ||
        formData.lastName.length < USER_VALIDATION.lastName.minLength,
      email:
        !formData.email ||
        !UNIVERSAL_VALIDATION.email.pattern.test(formData.email),
      password:
        !formData.password ||
        formData.password.length < UNIVERSAL_VALIDATION.password.minLength,
    };

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await API.auth.register(formData);
      onUserCreated();
      resetForm();
    } catch (err: any) {
      console.error("Error creating user:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create user. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      authorityName: UserAuthorityName.TESTER,
    });
    setFormErrors({
      firstName: false,
      lastName: false,
      email: false,
      password: false,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New User</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              required
              error={formErrors.firstName}
              helperText={formErrors.firstName ? "First name is required" : ""}
            />

            <TextField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              required
              error={formErrors.lastName}
              helperText={formErrors.lastName ? "Last name is required" : ""}
            />

            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
              error={formErrors.email}
              helperText={formErrors.email ? "Valid email is required" : ""}
            />

            <TextField
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              required
              error={formErrors.password}
              helperText={
                formErrors.password
                  ? `Password must be at least ${UNIVERSAL_VALIDATION.password.minLength} characters`
                  : ""
              }
            />

            <FormControl fullWidth>
              <InputLabel id="user-role-label">User Role</InputLabel>
              <Select
                labelId="user-role-label"
                id="user-role"
                name="authorityName"
                value={formData.authorityName}
                label="User Role"
                onChange={handleInputChange as any}
              >
                {userRoles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {formatEnumWithoutLowerUnderline(role)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? "Creating..." : "Create User"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateUserDialog;
