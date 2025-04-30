import Copyright from "../universal/Copyright";
import { Box, Typography } from "@mui/material";
import Dashboard from "./dashboard/Dashboard";
import Charts from "./charts/Charts";
import { AuthorityName } from "../../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../../utils/auth.utils";
import { useTranslation } from "react-i18next";

export default function MainGrid() {
  const authorities = getAutoritiesFromToken();
  const currentUserRole = authorities[0] as AuthorityName;
  const { t } = useTranslation();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography
        component="h2"
        variant="h3"
        sx={{ mb: 2, mt: 2, fontWeight: "bold" }}
      >
        {t("home.overview")}
      </Typography>
      <Charts currentUserRole={currentUserRole} />
      <Dashboard currentUserRole={currentUserRole} />
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
