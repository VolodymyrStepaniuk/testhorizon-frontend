import React from "react";
import { Box } from "@mui/material";
import { UserRoleProps } from "../../../models/userProps";
import { AuthorityName } from "../../../models/enum/authorityNames";
import AdminDashboard from "./AdminDashboard";
import MentorDashboard from "./MentorDashboard";
import TesterDashboard from "./TesterDashboard";

const Dashboard: React.FC<UserRoleProps> = ({ currentUserRole }) => {
  const renderDashboard = () => {
    switch (currentUserRole) {
      case AuthorityName.ADMIN:
        return <AdminDashboard />;
      case AuthorityName.MENTOR:
        return <MentorDashboard />;
      case AuthorityName.TESTER:
        return <TesterDashboard />;
      default:
        return <Box>Access Denied</Box>;
    }
  };

  return <Box sx={{ p: 2 }}>{renderDashboard()}</Box>;
};

export default Dashboard;
