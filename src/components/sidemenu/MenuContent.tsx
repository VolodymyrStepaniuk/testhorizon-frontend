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
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { navigateAndScroll } from "../../utils/navigateUtils";
import { useNavigate } from "react-router-dom";
import FeedbackIcon from "@mui/icons-material/Feedback";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { AuthorityName } from "../../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../../utils/auth.utils";

const secondaryListItems = [
  { text: "About", icon: <InfoRoundedIcon />, path: "/", id: "about" },
  {
    text: "Feedback",
    icon: <FeedbackIcon />,
    path: "/feedbacks",
    id: "",
  },
  {
    text: "Help",
    icon: <HelpRoundedIcon />,
    path: "/help",
    id: "",
  },
];

export default function MenuContent() {
  const navigate = useNavigate();
  const authorities = getAutoritiesFromToken();
  const currentUserRole = authorities[0] as AuthorityName;

  const mainListItems = [
    { text: "Home", icon: <HomeRoundedIcon />, path: "/home", id: "" },
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
    {
      text: "Rating",
      icon: <TrendingUpIcon />,
      path: "/rating",
      id: "",
    },
  ];

  if (currentUserRole === AuthorityName.ADMIN) {
    mainListItems.push({
      text: "Users",
      icon: <SupervisorAccountIcon />,
      path: "/users",
      id: "",
    });
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={location.pathname === item.path}
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
