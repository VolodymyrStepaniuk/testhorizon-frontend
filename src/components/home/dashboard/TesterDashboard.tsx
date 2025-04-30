import { Box, Grid, Typography } from "@mui/material";
import CustomizedDataGrid from "../tables/CustomizedDataGrid";
import { getTestColumns } from "../tables/data/testGridData";
import { getTestCaseColumns } from "../tables/data/testCaseGridData";
import { getBugReportColumns } from "../tables/data/bugReportGridData";
import { useTestsQuery } from "../../../queries/TestQuery";
import { useTestCasesQuery } from "../../../queries/TestCaseQuery";
import { useBugReportsQuery } from "../../../queries/BugReportQuery";
import {
  mapBugReportRows,
  mapTestCaseRows,
  mapTestRows,
} from "../tables/data/rowsMapping";
import { useTranslation } from "react-i18next";

export default function TesterDashboard() {
  const { tests, isLoading: isLoadingTests } = useTestsQuery();
  const { testCases, isLoading: isLoadingTestCases } = useTestCasesQuery();
  const { bugReports, isLoading: isLoadingBugReports } = useBugReportsQuery();
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          {t("dashboard.tester.myTests")}
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
          {t("dashboard.tester.myTestCases")}
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
          {t("dashboard.tester.myBugReports")}
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
