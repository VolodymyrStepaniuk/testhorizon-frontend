import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { TestCasePriority } from "../../../models/enum/testCasePriorities";
import { UserRoleProps } from "../../../models/userProps";
import { Box } from "@mui/material";
import { AuthorityName } from "../../../models/enum/authorityNames";
import { useTestCasesQuery } from "../../../queries/TestCaseQuery";
import { formatEnumWithoutLowerUnderline } from "../../../utils/format.utils";

interface TestCaseCount {
  type: TestCasePriority;
  count: number;
}

const TestCaseStatisticsChart: React.FC<UserRoleProps> = ({
  currentUserRole,
}) => {
  const theme = useTheme();
  const colorPalette = [
    theme.palette.secondary.dark,
    theme.palette.secondary.main,
    theme.palette.secondary.light,
  ];

  const renderCaptionTypography = () => {
    switch (currentUserRole) {
      case AuthorityName.ADMIN:
        return "Total number of test cases for all projects in the system";
      case AuthorityName.DEVELOPER:
        return "Total number of test cases for my projects";
      case AuthorityName.TESTER:
        return "Total number of my test cases";
      default:
        return <Box>Access Denied</Box>;
    }
  };

  const { testCases, isLoading: isLoadingTestCase } = useTestCasesQuery();

  const testCounts: TestCaseCount[] = [
    { type: TestCasePriority.LOW, count: 0 },
    { type: TestCasePriority.MEDIUM, count: 0 },
    { type: TestCasePriority.HIGH, count: 0 },
  ];

  if (testCases) {
    testCases.forEach((testCase) => {
      const severityCount = testCounts.find(
        (count) => count.type === testCase.priority
      );
      if (severityCount) {
        severityCount.count++;
      }
    });
  }

  const seriesData = testCounts.map((tc) => ({
    id: tc.type,
    label: formatEnumWithoutLowerUnderline(tc.type),
    data: [tc.count],
  }));

  if (isLoadingTestCase) {
    return <Box>Loading...</Box>;
  }

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography
          component="h2"
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Test case statistics
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", mb: 2, display: "block" }}
        >
          {renderCaptionTypography()}
        </Typography>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "band",
              data: ["Test case counts"],
            },
          ]}
          series={seriesData}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default TestCaseStatisticsChart;
