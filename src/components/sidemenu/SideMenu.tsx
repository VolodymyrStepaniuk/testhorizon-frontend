import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";
import AppIcon from "../universal/AppIcon";
import { useAuth } from "../../contexts/AuthContext";
import { API } from "../../services/api.service";
import { FileEntityType } from "../../models/enum/fileEntityType";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState<string>("");

  const userFullName = user ? user?.firstName + " " + user?.lastName : null;

  const fetchUserAvatar = async (userId: number) => {
    try {
      const avatarFileName = "avatar";
      const response = await API.files.fileByEntityTypeAndId(
        FileEntityType.USER,
        userId,
        avatarFileName
      );

      if (response.data && response.data.fileUrl) {
        setAvatar(response.data.fileUrl);
      }
    } catch (error) {
      // Silently handle missing avatar
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchUserAvatar(user.id);
    }
  }, [user]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
          justifyContent: "center",
        }}
      >
        <Link to={"/"}>
          <AppIcon />
        </Link>
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuContent />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt={userFullName || ""}
          src={avatar || "/static/images/avatar/7.jpg"}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, lineHeight: "16px" }}
          >
            {userFullName}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
