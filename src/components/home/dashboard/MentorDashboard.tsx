import { Box, Grid, Typography } from "@mui/material";
import { useProjectsQuery } from "../../../queries/ProjectQuery";
import CustomizedDataGrid from "../tables/CustomizedDataGrid";
import { getTestColumns } from "../tables/data/testGridData";
import { getTestCaseColumns } from "../tables/data/testCaseGridData";
import { getBugReportColumns } from "../tables/data/bugReportGridData";
import { useBugReportsQuery } from "../../../queries/BugReportQuery";
import { useTestCasesQuery } from "../../../queries/TestCaseQuery";
import { useTestsQuery } from "../../../queries/TestQuery";
import {
  mapBugReportRows,
  mapTestCaseRows,
  mapTestRows,
} from "../tables/data/rowsMapping";
import { useTranslation } from "react-i18next";
import ProjectList from "./project/ProjectList";

export default function MentorDashboard() {
  const { projects, isLoading } = useProjectsQuery();
  const { tests, isLoading: isLoadingTests } = useTestsQuery();
  const { testCases, isLoading: isLoadingTestCases } = useTestCasesQuery();
  const { bugReports, isLoading: isLoadingBugReports } = useBugReportsQuery();
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          {t("dashboard.mentor.myProjects")}
        </Typography>
        {isLoading ? (
          <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
            {t("dashboard.mentor.loadingProjects")}
          </Typography>
        ) : projects && projects.length > 0 ? (
          <ProjectList />
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
            {t("dashboard.mentor.noProjects")}
          </Typography>
        )}
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          {t("dashboard.mentor.testsForProjects")}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CustomizedDataGrid
            rows={mapTestRows(tests)}
            columns={getTestColumns(t)}
            isLoading={isLoadingTests}
          />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          {t("dashboard.mentor.testCasesForProjects")}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CustomizedDataGrid
            rows={mapTestCaseRows(testCases)}
            columns={getTestCaseColumns(t)}
            isLoading={isLoadingTestCases}
          />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          {t("dashboard.mentor.bugReportsForProjects")}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CustomizedDataGrid
            rows={mapBugReportRows(bugReports)}
            columns={getBugReportColumns(t)}
            isLoading={isLoadingBugReports}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
