import Copyright from "../universal/Copyright";
import { Box, Typography } from "@mui/material";
import Dashboard from "./dashboard/Dashboard";
import Charts from "./charts/Charts";
import { AuthorityName } from "../../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../../utils/auth.utils";

export default function MainGrid() {
  const authorities = getAutoritiesFromToken();
  const currentUserRole = authorities[0] as AuthorityName;

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography
        component="h2"
        variant="h3"
        sx={{ mb: 2, mt: 2, fontWeight: "bold" }}
      >
        Overview
      </Typography>
      <Charts currentUserRole={currentUserRole} />
      <Dashboard currentUserRole={currentUserRole} />
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
