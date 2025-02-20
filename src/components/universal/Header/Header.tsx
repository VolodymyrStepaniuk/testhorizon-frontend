import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
  Drawer,
  MenuItem,
  Divider,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SitemarkIcon from "../shared/SitemarkIcon";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backdropFilter: "blur(32px)",
  backgroundColor: alpha("#000", 0.3),
  borderRadius: theme.shape.borderRadius + 8,
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  boxShadow: theme.shadows[3],
  padding: "8px 12px",
}));

const menuItems = [
  { id: "about", label: "About Us" },
  { id: "testimonials", label: "Testimonials" },
  { id: "highlights", label: "Highlights" },
];
const mobileMenuItems = [...menuItems, { id: "faq", label: "FAQ" }];

const DesktopMenu = ({
  scrollToSection,
}: {
  scrollToSection: (id: string) => void;
}) => (
  <Box sx={{ display: { xs: "none", md: "flex" }, ml: 2 }}>
    {menuItems.map((item) => (
      <Button
        key={item.id}
        variant="text"
        size="small"
        className="nunito-bold"
        sx={{ color: "white", textTransform: "none" }}
        onClick={() => scrollToSection(item.id)}
      >
        {item.label}
      </Button>
    ))}
    <Button
      variant="text"
      color="info"
      size="small"
      className="nunito-bold"
      sx={{ minWidth: 0, color: "white" }}
      onClick={() => scrollToSection("faq")}
    >
      FAQ
    </Button>
  </Box>
);

const AuthButtons = () => (
  <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
    <Button
      variant="text"
      size="small"
      className="nunito-bold"
      sx={{ color: "white", textTransform: "none" }}
    >
      Sign in
    </Button>
    <Button
      variant="contained"
      size="small"
      className="nunito-bold"
      sx={{
        backgroundColor: "white",
        color: "black",
        "&:hover": { backgroundColor: "white" },
        borderRadius: "8px",
        textTransform: "none",
      }}
    >
      Sign up
    </Button>
  </Box>
);

interface MobileMenuProps {
  open: boolean;
  toggleDrawer: (
    newOpen: boolean | ((prevState: boolean) => boolean)
  ) => () => void;
  scrollToSection: (id: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  open,
  toggleDrawer,
  scrollToSection,
}) => (
  <Drawer
    anchor="top"
    open={open}
    onClose={toggleDrawer(false)}
    disableScrollLock
    PaperProps={{
      sx: {
        top: "var(--template-frame-height, 0px)",
        backgroundColor: "hsl(220, 35%, 3%)",
        backdropFilter: "blur(40px)",
      },
    }}
  >
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseRoundedIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
      {mobileMenuItems.map((item) => (
        <MenuItem
          key={item.id}
          sx={{ color: "white", textTransform: "none" }}
          className="nunito-bold"
          onClick={() => scrollToSection(item.id)}
        >
          {item.label}
        </MenuItem>
      ))}
      <Divider sx={{ my: 3 }} />
      <MenuItem>
        <Button
          className="nunito-bold"
          variant="contained"
          fullWidth
          sx={{
            color: "black",
            bgcolor: "rgb(245, 246, 250)",
            border: "1px solid rgb(245, 246, 250)",
            boxShadow: "none",
            borderRadius: "8px",
            textTransform: "none",
          }}
        >
          Sign up
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          className="nunito-bold"
          variant="outlined"
          fullWidth
          sx={{
            color: "white",
            bgcolor: "hsl(220, 30%, 6%)",
            borderColor: "hsl(220, 20%, 25%)",
            borderRadius: "8px",
            textTransform: "none",
          }}
        >
          Sign in
        </Button>
      </MenuItem>
    </Box>
  </Drawer>
);

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer =
    (newOpen: boolean | ((prevState: boolean) => boolean)) => () =>
      setOpen(newOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <AppBar
      position="fixed"
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
            <IconButton component={Link} to="/" sx={{ p: 0 }}>
              <SitemarkIcon />
            </IconButton>

            <DesktopMenu scrollToSection={scrollToSection} />
          </Box>

          <AuthButtons />

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
            <MobileMenu
              open={open}
              toggleDrawer={toggleDrawer}
              scrollToSection={scrollToSection}
            />
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
