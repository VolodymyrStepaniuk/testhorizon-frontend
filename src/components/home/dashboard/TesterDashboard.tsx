import { Box, Grid, Typography } from "@mui/material";
import CustomizedDataGrid from "../tables/CustomizedDataGrid";
import { testColumns } from "../tables/data/testGridData";
import { testCaseColumns } from "../tables/data/testCaseGridData";
import { bugReportColumns } from "../tables/data/bugReportGridData";
import { useTestsQuery } from "../../../queries/TestQuery";
import { useTestCasesQuery } from "../../../queries/TestCaseQuery";
import { useBugReportsQuery } from "../../../queries/BugReportQuery";
import {
  mapBugReportRows,
  mapTestCaseRows,
  mapTestRows,
} from "../tables/data/rowsMapping";

export default function TesterDashboard() {
  const { tests, isLoading: isLoadingTests } = useTestsQuery();
  const { testCases, isLoading: isLoadingTestCases } = useTestCasesQuery();
  const { bugReports, isLoading: isLoadingBugReports } = useBugReportsQuery();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          My tests
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CustomizedDataGrid
            rows={mapTestRows(tests)}
            columns={testColumns}
            isLoading={isLoadingTests}
          />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          My test cases
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CustomizedDataGrid
            rows={mapTestCaseRows(testCases)}
            columns={testCaseColumns}
            isLoading={isLoadingTestCases}
          />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          My bug reports
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CustomizedDataGrid
            rows={mapBugReportRows(bugReports)}
            columns={bugReportColumns}
            isLoading={isLoadingBugReports}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
