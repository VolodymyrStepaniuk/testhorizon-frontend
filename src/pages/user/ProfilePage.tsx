import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Avatar,
  Typography,
  IconButton,
  Tab,
  Tabs,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaCamera } from "react-icons/fa";
import { API } from "../../services/api.service";
import { AuthorityName } from "../../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../../utils/auth.utils";
import { UserUpdateRequest } from "../../models/user/UserUpdateRequest";
import { UpdatePasswordRequest } from "../../models/auth/UpdatePasswordRequest";
import NotificationSnackbar from "../../components/universal/notification/NotificationSnackbar";
import UserInformation from "../../components/user/UserInformation";
import ChangePassword from "../../components/user/ChangePassword";
import { FileEntityType } from "../../models/enum/fileEntityType";
import { formatEnumWithoutLowerUnderline } from "../../utils/format.utils";

const ProfileWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  width: "100%",
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  position: "relative",
  textAlign: "center",
  marginBottom: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const AvatarWrapper = styled(Box)({
  position: "relative",
  margin: "0 auto",
  width: "fit-content",
  "&:hover .edit-overlay": {
    opacity: 1,
  },
});

const EditOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: "50%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.3s",
});

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  userId: number;
}

type SnackbarSeverity = "success" | "error" | "info" | "warning";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
}

const UserProfile: React.FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const authorities = getAutoritiesFromToken();
  const currentUserRole = authorities[0] as AuthorityName;

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    userId: 0,
  });

  const [updateRequest, setUpdateRequest] = useState<UserUpdateRequest>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState<UpdatePasswordRequest>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const fetchUserAvatar = async (userId: number, forceRefresh = false) => {
    try {
      const avatarFileName = "avatar";

      const response = await API.files.fileByEntityTypeAndId(
        FileEntityType.USER,
        userId,
        avatarFileName
      );

      if (response.data && response.data.fileUrl) {
        const url = forceRefresh
          ? `${response.data.fileUrl}?nocache=${Math.random()}`
          : response.data.fileUrl;

        setUserData((prevData) => ({
          ...prevData,
          avatar: url,
        }));
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await API.users.getMe();
        const user = response.data;
        setUserData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          avatar: "",
          userId: user.id,
        });
        setUpdateRequest({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
        });

        if (user.id) {
          fetchUserAvatar(user.id);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setSnackbar({
          open: true,
          message: "Failed to load profile data",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange =
    (field: keyof UserUpdateRequest) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUpdateRequest({
        ...updateRequest,
        [field]: event.target.value,
      });
    };

  const handleEditToggle = () => {
    if (editMode) {
      setUpdateRequest({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
    }
    setEditMode((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await API.users.updateMe(updateRequest);
      setUserData({
        ...userData,
        firstName: updateRequest.firstName || userData.firstName,
        lastName: updateRequest.lastName || userData.lastName,
        email: updateRequest.email || userData.email,
      });
      setEditMode(false);
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      setSnackbar({
        open: true,
        message: "Failed to update profile",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange =
    (field: keyof UpdatePasswordRequest) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPasswordData({
        ...passwordData,
        [field]: event.target.value,
      });
      if (field === "newPassword" || field === "confirmPassword") {
        setPasswordErrors({
          ...passwordErrors,
          [field]: false,
        });
      }
    };

  const handleSavePassword = async () => {
    const newErrors = {
      newPassword: passwordData.newPassword.length < 6,
      confirmPassword:
        passwordData.newPassword !== passwordData.confirmPassword,
    };
    setPasswordErrors(newErrors);
    if (!newErrors.newPassword && !newErrors.confirmPassword) {
      try {
        setLoading(true);
        await API.auth.updatePassword(passwordData);
        setSnackbar({
          open: true,
          message: "Password updated successfully!",
          severity: "success",
        });
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Failed to update password:", error);
        setSnackbar({
          open: true,
          message:
            "Failed to update password. Please check your current password.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setLoading(true);

        const avatarFileName = "avatar";

        const renamedFile = new File([file], avatarFileName, {
          type: file.type,
        });

        await API.files.upload(FileEntityType.USER, userData.userId, [
          renamedFile,
        ]);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        setUserData((prev) => ({ ...prev, avatar: "" }));

        await fetchUserAvatar(userData.userId, true);

        setSnackbar({
          open: true,
          message: "Profile picture updated!",
          severity: "success",
        });
      } catch (error) {
        console.error("Failed to upload avatar:", error);
        setSnackbar({
          open: true,
          message: "Failed to update profile picture",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <ProfileWrapper>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <ProfileHeader>
                <AvatarWrapper>
                  <Avatar
                    src={userData.avatar}
                    alt={`${userData.firstName} ${userData.lastName}`}
                    sx={{ width: 150, height: 150 }}
                  />
                  <EditOverlay className="edit-overlay">
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="icon-button-file"
                      type="file"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton component="span" color="primary">
                        <FaCamera size={24} color="white" />
                      </IconButton>
                    </label>
                  </EditOverlay>
                </AvatarWrapper>
                <Typography variant="h4" sx={{ mt: 2 }}>
                  {userData.firstName} {userData.lastName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {formatEnumWithoutLowerUnderline(currentUserRole)}
                </Typography>
              </ProfileHeader>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Tabs value={activeTab} onChange={handleTabChange} centered>
                <Tab label="Personal Info" />
                <Tab label="Change Password" />
              </Tabs>
            </Grid>
            {activeTab === 0 && (
              <Grid
                item
                xs={12}
                md={8}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <UserInformation
                  userData={userData}
                  updateRequest={updateRequest}
                  editMode={editMode}
                  loading={loading}
                  onToggleEdit={handleEditToggle}
                  onInputChange={(field, event) =>
                    handleInputChange(field)(event)
                  }
                  onSave={handleSave}
                />
              </Grid>
            )}
            {activeTab === 1 && (
              <Grid
                item
                xs={12}
                md={8}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <ChangePassword
                  passwordData={passwordData}
                  passwordErrors={passwordErrors}
                  loading={loading}
                  onPasswordChange={(field, event) =>
                    handlePasswordChange(field)(event)
                  }
                  onSavePassword={handleSavePassword}
                />
              </Grid>
            )}
          </Grid>
        )}
        <NotificationSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        />
      </Container>
    </ProfileWrapper>
  );
};

export default UserProfile;
