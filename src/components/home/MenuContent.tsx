import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import BugReportIcon from "@mui/icons-material/BugReport";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { navigateAndScroll } from "../../utils/navigateUtils";
import { useNavigate } from "react-router-dom";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, path: "/test-cases", id: "" },
  {
    text: "Test cases",
    icon: <TaskAltIcon />,
    path: "/test-cases",
    id: "",
  },
  { text: "Tests", icon: <PlayArrowIcon />, path: "/tests", id: "" },
  {
    text: "Projects",
    icon: <AssignmentRoundedIcon />,
    path: "/projects",
    id: "",
  },
  {
    text: "Bug reports",
    icon: <BugReportIcon />,
    path: "/bug-reports",
    id: "",
  },
];

const secondaryListItems = [
  { text: "About", icon: <InfoRoundedIcon />, path: "/", id: "about" },
  {
    text: "Feedback",
    icon: <HelpRoundedIcon />,
    path: "/feedback",
    id: "",
  },
];

export default function MenuContent() {
  const navigate = useNavigate();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={index === 0}
              onClick={() => navigateAndScroll(item.path, item.id, navigate)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => navigateAndScroll(item.path, item.id, navigate)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
