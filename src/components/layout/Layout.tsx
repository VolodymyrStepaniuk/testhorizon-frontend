import React from "react";
import AppTheme from "../../theme/AppTheme";
import AppNavbar from "../sidemenu/AppNavbar";
import SideMenu from "../sidemenu/SideMenu";
import { useLocation } from "react-router-dom";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import NotebookWidget from "../notebook/NotebookWidget";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const publicRoutes = ["/sign-in", "/sign-up", "/reset-password", "/"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  if (isPublicRoute) {
    return (
      <AppTheme>
        <Box sx={{ width: "100%", overflow: "auto" }}>{children}</Box>
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

        {!isMobile && <NotebookWidget />}
      </Box>
    </AppTheme>
  );
};

export default Layout;
