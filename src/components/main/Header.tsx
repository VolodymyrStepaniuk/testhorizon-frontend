import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AppIcon from "../universal/AppIcon";
import { Link } from "react-router-dom";
import {
  scrollToSection,
  scrollToSectionMobile,
} from "../../utils/scrollUtils";

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

const navigationItems = [
  { id: "about", label: "About Us" },
  { id: "testimonials", label: "Testimonials" },
  { id: "highlights", label: "Highlights" },
  { id: "faq", label: "FAQ" },
];

const authItems = [
  { to: "sign-in", label: "Sign in", variant: "text" },
  { to: "sign-up", label: "Sign up", variant: "contained" },
];

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const closeDrawer = () => setOpen(false);

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
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <AppIcon />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant="text"
                  color="info"
                  size="small"
                  sx={{
                    fontWeight: 700,
                    ...(item.id === "faq" && { minWidth: 0 }),
                  }}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
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
            {authItems.map((item) => (
              <Button
                key={item.to}
                component={Link}
                to={`/${item.to}`}
                color="primary"
                variant={item.variant as "text" | "contained"}
                size="small"
                sx={{ fontWeight: 700 }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {navigationItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    onClick={() => scrollToSectionMobile(item.id, closeDrawer)}
                    sx={{ fontWeight: 700 }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
                <Divider sx={{ my: 3 }} />
                {authItems
                  .slice()
                  .reverse()
                  .map((item) => (
                    <MenuItem key={item.to}>
                      <Button
                        component={Link}
                        to={`/${item.to}`}
                        color="primary"
                        variant={
                          item.variant === "contained"
                            ? "contained"
                            : "outlined"
                        }
                        fullWidth
                        sx={{ fontWeight: 700 }}
                      >
                        {item.label}
                      </Button>
                    </MenuItem>
                  ))}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
