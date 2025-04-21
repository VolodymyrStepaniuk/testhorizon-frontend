import { Box, Grid, Typography } from "@mui/material";
import { useProjectsQuery } from "../../../queries/ProjectQuery";
import CustomizedDataGrid from "../tables/CustomizedDataGrid";
import { testColumns } from "../tables/data/testGridData";
import { testCaseColumns } from "../tables/data/testCaseGridData";
import { bugReportColumns } from "../tables/data/bugReportGridData";
import { useBugReportsQuery } from "../../../queries/BugReportQuery";
import { useTestCasesQuery } from "../../../queries/TestCaseQuery";
import { useTestsQuery } from "../../../queries/TestQuery";
import {
  mapBugReportRows,
  mapTestCaseRows,
  mapTestRows,
} from "../tables/data/rowsMapping";

export default function DeveloperDashboard() {
  const { projects, isLoading } = useProjectsQuery();
  const { tests, isLoading: isLoadingTests } = useTestsQuery();
  const { testCases, isLoading: isLoadingTestCases } = useTestCasesQuery();
  const { bugReports, isLoading: isLoadingBugReports } = useBugReportsQuery();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          My Projects
        </Typography>
        {isLoading ? (
          <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
            Loading projects...
          </Typography>
        ) : projects && projects.length > 0 ? (
          // <ExpandableCategory
          //   items={projects}
          //   renderItem={(project) => <ProjectItem project={project} />}
          // />
          <Box></Box>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
            You don't have any projects yet.
          </Typography>
        )}
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          Tests for my projects
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
          Test cases for my projects
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
          Bug reports for my projects
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
