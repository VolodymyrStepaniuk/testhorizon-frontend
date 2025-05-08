import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { UserRoleProps } from "../../../models/userProps";
import { Box } from "@mui/material";
import { AuthorityName } from "../../../models/enum/authorityNames";
import { useBugReportsQuery } from "../../../queries/BugReportQuery";
import { useTestCasesQuery } from "../../../queries/TestCaseQuery";
import { useTestsQuery } from "../../../queries/TestQuery";
import { useTranslation } from "react-i18next";

const ProjectStatisticsChart: React.FC<UserRoleProps> = ({
  currentUserRole,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const colorPalette = [
    theme.palette.primary.dark,
    theme.palette.primary.main,
    theme.palette.primary.light,
  ];

  const renderCaptionTypography = () => {
    switch (currentUserRole) {
      case AuthorityName.ADMIN:
        return t("charts.projectStatistics.captions.admin");
      case AuthorityName.MENTOR:
        return t("charts.projectStatistics.captions.mentor");
      case AuthorityName.TESTER:
        return t("charts.projectStatistics.captions.tester");
      default:
        return <Box>Access Denied</Box>;
    }
  };

  const { tests, isLoading: isLoadingTest } = useTestsQuery();
  const { testCases, isLoading: isLoadingTestCase } = useTestCasesQuery();
  const { bugReports, isLoading: isLoadingBugReport } = useBugReportsQuery();

  const counts = {
    tests: tests ? tests.length : 0,
    testCases: testCases ? testCases.length : 0,
    bugReports: bugReports ? bugReports.length : 0,
  };

  if (isLoadingTest || isLoadingTestCase || isLoadingBugReport) {
    return <Box>{t("charts.projectStatistics.loading")}</Box>;
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
          {t("charts.projectStatistics.title")}
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
              data: [t("charts.projectStatistics.totalCounts")],
            },
          ]}
          series={[
            {
              id: "tests",
              label: t("charts.projectStatistics.tests"),
              data: [counts.tests],
            },
            {
              id: "testCases",
              label: t("charts.projectStatistics.testCases"),
              data: [counts.testCases],
            },
            {
              id: "bugReports",
              label: t("charts.projectStatistics.bugReports"),
              data: [counts.bugReports],
            },
          ]}
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

export default ProjectStatisticsChart;
