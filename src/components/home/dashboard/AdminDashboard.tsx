import { Box, Grid, Typography } from "@mui/material";
import { useProjectsQuery } from "../../../queries/ProjectQuery";
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
import ProjectList from "./project/ProjectList";

export default function AdminDashboard() {
  const { projects, isLoading } = useProjectsQuery();
  const { tests, isLoading: isLoadingTests } = useTestsQuery();
  const { testCases, isLoading: isLoadingTestCases } = useTestCasesQuery();
  const { bugReports, isLoading: isLoadingBugReports } = useBugReportsQuery();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          Projects in the system
        </Typography>
        {isLoading ? (
          <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
            Loading projects...
          </Typography>
        ) : projects && projects.length > 0 ? (
          <ProjectList />
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
            There's no projects in the system yet.
          </Typography>
        )}
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          Tests in the system
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
          Test cases in the system
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
          Bug reports in the system
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
