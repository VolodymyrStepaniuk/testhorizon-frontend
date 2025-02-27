import { Grid } from "@mui/material";
import BugReportSeverityStatisticsChart from "../BugReportSeverityStatisticsChart";
import BugReportStatusStatisticsChart from "../BugReportStatusStatisticsChart";

import TestCaseStatisticsChart from "../TestCaseStatisticsChart";
import TestStatisticsChart from "../TestStatisticsChart";
import { UserRoleProps } from "../../../../constants/userProps";

const TesterCharts: React.FC<UserRoleProps> = ({ currentUserRole }) => {
  return (
    <>
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
        md={6}
        sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}
      >
        <BugReportStatusStatisticsChart currentUserRole={currentUserRole} />
      </Grid>
    </>
  );
};

export default TesterCharts;
