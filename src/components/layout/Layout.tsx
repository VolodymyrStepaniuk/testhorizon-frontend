import React, { useState } from "react";
import AppTheme from "../../theme/AppTheme";
import AppNavbar from "../sidemenu/AppNavbar";
import SideMenu from "../sidemenu/SideMenu";
import { useLocation } from "react-router-dom";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import NotebookWidget from "../notebook/NotebookWidget";
import LanguageSelector from "../universal/LanguageSelector";
import { useIs404 } from "../../utils/useIs404";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const publicRoutes = [
    "/sign-in",
    "/sign-up",
    "/reset-password",
    "/",
    "/blog",
  ];
  const isPublicRoute =
    publicRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/blog/");
  const is404 = useIs404();

  if (isPublicRoute || is404) {
    return (
      <AppTheme>
        <Box sx={{ width: "100%", overflow: "auto", position: "relative" }}>
          {children}
          <Box
            sx={{
              position: "fixed",
              bottom: 20,
              right: isMobile ? "auto" : 20,
              left: isMobile ? 20 : "auto",
              zIndex: 1200,
            }}
          >
            <LanguageSelector />
          </Box>
        </Box>
      </AppTheme>
    );
  }

  return (
    <AppTheme>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <SideMenu />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            overflow: "auto",
          }}
        >
          <AppNavbar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
            {children}
          </Box>
        </Box>

        {!(isMobile || isMedium) && (
          <NotebookWidget onOpenChange={setIsNotebookOpen} />
        )}

        {!isNotebookOpen && (
          <Box
            sx={{
              position: "fixed",
              bottom: isMobile || isMedium ? 20 : 80,
              right: isMobile || isMedium ? "auto" : 24,
              left: isMobile || isMedium ? 10 : "auto",
              zIndex: 1300,
            }}
          >
            <LanguageSelector />
          </Box>
        )}
      </Box>
    </AppTheme>
  );
};

export default Layout;
