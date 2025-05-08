import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { BugReportSeverity } from "../../../models/enum/bugReportSeverities";
import { UserRoleProps } from "../../../models/userProps";
import { Box } from "@mui/material";
import { AuthorityName } from "../../../models/enum/authorityNames";
import { useBugReportsQuery } from "../../../queries/BugReportQuery";
import { formatEnumWithoutLowerUnderline } from "../../../utils/format.utils";
import { useTranslation } from "react-i18next";

interface BugReportCount {
  type: BugReportSeverity;
  count: number;
}

const BugReportSeverityStatisticsChart: React.FC<UserRoleProps> = ({
  currentUserRole,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const colorPalette = [
    theme.palette.primary.dark,
    theme.palette.secondary.main,
    theme.palette.secondary.light,
    theme.palette.info.main,
  ];

  const renderCaptionTypography = () => {
    switch (currentUserRole) {
      case AuthorityName.ADMIN:
        return t("charts.bugReportSeverity.captions.admin");
      case AuthorityName.MENTOR:
        return t("charts.bugReportSeverity.captions.mentor");
      case AuthorityName.TESTER:
        return t("charts.bugReportSeverity.captions.tester");
      default:
        return <Box>Access Denied</Box>;
    }
  };

  const { bugReports, isLoading: isLoadingBugReports } = useBugReportsQuery();

  const bugReportCounts: BugReportCount[] = [
    { type: BugReportSeverity.LOW, count: 0 },
    { type: BugReportSeverity.MEDIUM, count: 0 },
    { type: BugReportSeverity.HIGH, count: 0 },
    { type: BugReportSeverity.CRITICAL, count: 0 },
  ];

  if (bugReports) {
    bugReports.forEach((report) => {
      const severityCount = bugReportCounts.find(
        (count) => count.type === report.severity
      );
      if (severityCount) {
        severityCount.count++;
      }
    });
  }

  const seriesData = bugReportCounts.map((br) => ({
    id: br.type,
    label: formatEnumWithoutLowerUnderline(br.type),
    data: [br.count],
  }));

  if (isLoadingBugReports) {
    return <Box>{t("charts.bugReportSeverity.loading")}</Box>;
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
          {t("charts.bugReportSeverity.title")}
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", mb: 2, display: "block" }}
          >
            {renderCaptionTypography()}
          </Typography>
        </Typography>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "band",
              data: [t("charts.bugReportSeverity.severityCounts")],
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

export default BugReportSeverityStatisticsChart;
