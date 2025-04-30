import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  MenuItem,
  Button,
  Container,
  Box,
  Divider,
  Avatar,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useTranslation } from "react-i18next";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link, useNavigate } from "react-router-dom";
import AppIcon from "./AppIcon";
import AvatarMenu from "./AvatarMenu";
import { scrollToSection } from "../../utils/scrollUtils";
import { useAuth } from "../../contexts/AuthContext";
import { API } from "../../services/api.service";
import { FileEntityType } from "../../models/enum/fileEntityType";
import { navigateAndScroll } from "../../utils/navigateUtils";
import { useEffect } from "react";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

const DrawerMenu = ({
  open,
  onClose,
  onNavigate,
  user,
  avatar,
  userFullName,
  logout,
  navigationItems,
  authItems,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string, id?: string, replace?: boolean) => void;
  user: any;
  avatar?: string;
  userFullName: string | null;
  logout: () => void;
  navigationItems: Array<{ id: string; path: string; label: string }>;
  authItems: Array<{ to: string; label: string; variant: string }>;
}) => {
  const { t } = useTranslation();

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { top: "var(--template-frame-height, 0px)" } }}
    >
      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        {user && (
          <MenuItem
            onClick={() => onNavigate("/home")}
            sx={{ fontWeight: 700 }}
          >
            {t("header.home")}
          </MenuItem>
        )}

        {navigationItems.map(({ id, path, label }) => (
          <MenuItem
            key={id || path}
            onClick={() => onNavigate(path, id)}
            sx={{ fontWeight: 700 }}
          >
            {label}
          </MenuItem>
        ))}

        <Divider sx={{ my: 3 }} />

        {!user ? (
          authItems
            .slice()
            .reverse()
            .map(({ to, label, variant }) => (
              <MenuItem key={to}>
                <Button
                  component={Link}
                  to={`/${to}`}
                  color="primary"
                  variant={variant === "contained" ? "contained" : "outlined"}
                  fullWidth
                  sx={{ fontWeight: 700 }}
                >
                  {label}
                </Button>
              </MenuItem>
            ))
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: 1,
                py: 1,
              }}
            >
              <Avatar
                src={avatar || "/static/images/avatar/7.jpg"}
                sx={{ width: 36, height: 36 }}
              />
              <Typography variant="body2">{userFullName}</Typography>
            </Box>
            <MenuItem onClick={() => onNavigate("/profile")} sx={{ gap: 1 }}>
              {" "}
              <AccountCircleIcon fontSize="small" /> {t("header.profile")}{" "}
            </MenuItem>
            <MenuItem
              onClick={() => {
                logout();
                onNavigate("/");
              }}
              sx={{ gap: 1 }}
            >
              {" "}
              <LogoutRoundedIcon fontSize="small" /> {t("header.logout")}{" "}
            </MenuItem>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [avatar, setAvatar] = React.useState<string>("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const userFullName = user ? `${user.firstName} ${user.lastName}` : null;

  const navigationItems = [
    { id: "about", path: "/", label: t("header.aboutUs") },
    { id: "testimonials", path: "/", label: t("header.testimonials") },
    { id: "highlights", path: "/", label: t("header.highlights") },
    { id: "faq", path: "/", label: t("header.faq") },
    { id: "", path: "/blog", label: t("header.blog") },
  ];

  const authItems = [
    { to: "sign-in", label: t("header.signIn"), variant: "text" },
    { to: "sign-up", label: t("header.signUp"), variant: "contained" },
  ];

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!user?.id) return;
      try {
        const { data } = await API.files.fileByEntityTypeAndId(
          FileEntityType.USER,
          user.id,
          "avatar"
        );
        if (data?.fileUrl) setAvatar(data.fileUrl);
      } catch (_) {}
    };
    fetchAvatar();
  }, [user]);

  const handleNavigate = (
    path: string,
    sectionId?: string,
    replace = false
  ) => {
    setOpen(false);
    if (!sectionId) {
      navigate(path, { replace });
    } else if (window.location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigateAndScroll(path, sectionId, navigate);
    }
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <AppIcon />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {user && (
                <Button
                  onClick={() => handleNavigate("/home")}
                  variant="text"
                  color="primary"
                  size="small"
                  sx={{ fontWeight: 700 }}
                >
                  {t("header.home")}
                </Button>
              )}
              {navigationItems.map(({ id, path, label }) => (
                <Button
                  key={id || path}
                  onClick={() => handleNavigate(path, id)}
                  variant="text"
                  color="info"
                  size="small"
                  sx={{ fontWeight: 700 }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {!user ? (
              authItems.map(({ to, label, variant }) => (
                <Button
                  key={to}
                  component={Link}
                  to={`/${to}`}
                  color="primary"
                  variant={variant as any}
                  size="small"
                  sx={{ fontWeight: 700 }}
                >
                  {label}
                </Button>
              ))
            ) : (
              <AvatarMenu avatar={avatar} userFullName={userFullName} />
            )}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton aria-label="open drawer" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
      </Container>

      <DrawerMenu
        open={open}
        onClose={() => setOpen(false)}
        onNavigate={handleNavigate}
        user={user}
        avatar={avatar}
        userFullName={userFullName}
        logout={logout}
        navigationItems={navigationItems}
        authItems={authItems}
      />
    </AppBar>
  );
}
