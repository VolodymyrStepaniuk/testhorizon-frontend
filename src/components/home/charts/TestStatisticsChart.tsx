import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { TestType } from "../../../models/enum/testTypes";
import { UserRoleProps } from "../../../models/userProps";
import { Box } from "@mui/material";
import { AuthorityName } from "../../../models/enum/authorityNames";
import { formatEnumWithLowerUnderline } from "../../../utils/format.utils";
import { useTestsQuery } from "../../../queries/TestQuery";
import { useTranslation } from "react-i18next";

interface TestCount {
  type: TestType;
  count: number;
}

const TestStatisticsChart: React.FC<UserRoleProps> = ({ currentUserRole }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const colorPalette = [
    theme.palette.primary.dark,
    theme.palette.primary.main,
    theme.palette.primary.light,
    theme.palette.secondary.dark,
    theme.palette.secondary.main,
    theme.palette.secondary.light,
    theme.palette.info.main,
  ];

  const renderCaptionTypography = () => {
    switch (currentUserRole) {
      case AuthorityName.ADMIN:
        return t("charts.testStatistics.captions.admin");
      case AuthorityName.MENTOR:
        return t("charts.testStatistics.captions.mentor");
      case AuthorityName.TESTER:
        return t("charts.testStatistics.captions.tester");
      default:
        return <Box>Access Denied</Box>;
    }
  };

  const { tests, isLoading: isLoadingTest } = useTestsQuery();

  const testCounts: TestCount[] = [
    { type: TestType.UNIT, count: 0 },
    { type: TestType.INTEGRATION, count: 0 },
    { type: TestType.FUNCTIONAL, count: 0 },
    { type: TestType.END_TO_END, count: 0 },
    { type: TestType.ACCEPTANCE, count: 0 },
    { type: TestType.PERFORMANCE, count: 0 },
    { type: TestType.SMOKE, count: 0 },
  ];

  if (tests) {
    tests.forEach((test) => {
      const severityCount = testCounts.find(
        (count) => count.type === test.type
      );
      if (severityCount) {
        severityCount.count++;
      }
    });
  }

  const seriesData = testCounts.map((t) => ({
    id: t.type,
    label: formatEnumWithLowerUnderline(t.type),
    data: [t.count],
  }));

  if (isLoadingTest) {
    return <Box>{t("charts.testStatistics.loading")}</Box>;
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
          {t("charts.testStatistics.title")}
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
              data: [t("charts.testStatistics.testCounts")],
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

export default TestStatisticsChart;
