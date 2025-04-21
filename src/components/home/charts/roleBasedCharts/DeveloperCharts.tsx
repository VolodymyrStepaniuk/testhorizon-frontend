import { Box, Grid } from "@mui/material";
import BugReportSeverityStatisticsChart from "../BugReportSeverityStatisticsChart";
import BugReportStatusStatisticsChart from "../BugReportStatusStatisticsChart";
import ProjectStatisticsChart from "../ProjectStatisticsChart";
import TestCaseStatisticsChart from "../TestCaseStatisticsChart";
import TestStatisticsChart from "../TestStatisticsChart";
import { UserRoleProps } from "../../../../models/userProps";

const DeveloperCharts: React.FC<UserRoleProps> = ({ currentUserRole }) => {
  return (
    <>
      <Grid item xs={12} md={6} sx={{ alignItems: "center" }}>
        <ProjectStatisticsChart currentUserRole={currentUserRole} />
      </Grid>
      <Grid item xs={12} md={6} sx={{ alignItems: "center" }}>
        <TestStatisticsChart currentUserRole={currentUserRole} />
      </Grid>
      <Grid item xs={12} md={6} sx={{ alignItems: "center" }}>
        <TestCaseStatisticsChart currentUserRole={currentUserRole} />
      </Grid>
      <Grid item xs={12} md={6} sx={{ alignItems: "center" }}>
        <BugReportSeverityStatisticsChart currentUserRole={currentUserRole} />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <BugReportStatusStatisticsChart currentUserRole={currentUserRole} />
        </Box>
      </Grid>
    </>
  );
};

export default DeveloperCharts;
