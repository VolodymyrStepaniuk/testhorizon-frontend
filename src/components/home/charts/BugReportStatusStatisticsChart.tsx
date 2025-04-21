import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { BugReportStatus } from "../../../models/enum/bugReportStatuses";
import { UserRoleProps } from "../../../models/userProps";
import { Box } from "@mui/material";
import { AuthorityName } from "../../../models/enum/authorityNames";
import { useBugReportsQuery } from "../../../queries/BugReportQuery";
import { formatEnumWithLowerUnderline } from "../../../utils/format.utils";

interface BugReportCount {
  type: BugReportStatus;
  count: number;
}

const BugReportStatusStatisticsChart: React.FC<UserRoleProps> = ({
  currentUserRole,
}) => {
  const theme = useTheme();
  const colorPalette = [
    theme.palette.primary.dark,
    theme.palette.secondary.main,
    theme.palette.secondary.light,
    theme.palette.info.main,
  ];

  const renderCaptionTypography = () => {
    switch (currentUserRole) {
      case AuthorityName.ADMIN:
        return "Total number of bug reports by status for all projects in the system";
      case AuthorityName.DEVELOPER:
        return "Total number of bug reports by status for my projects";
      case AuthorityName.TESTER:
        return "Total number of my bug reports by status";
      default:
        return <Box>Access Denied</Box>;
    }
  };

  const { bugReports, isLoading: isLoadingBugReports } = useBugReportsQuery();

  const bugReportCounts: BugReportCount[] = [
    { type: BugReportStatus.OPENED, count: 0 },
    { type: BugReportStatus.IN_PROGRESS, count: 0 },
    { type: BugReportStatus.CLOSED, count: 0 },
    { type: BugReportStatus.RESOLVED, count: 0 },
  ];

  if (bugReports) {
    bugReports.forEach((report) => {
      const severityCount = bugReportCounts.find(
        (count) => count.type === report.status
      );
      if (severityCount) {
        severityCount.count++;
      }
    });
  }

  const seriesData = bugReportCounts.map((br) => ({
    id: br.type,
    label: formatEnumWithLowerUnderline(br.type),
    data: [br.count],
  }));

  if (isLoadingBugReports) {
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
          Bug report statistics by status
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
              data: ["Status counts"],
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

export default BugReportStatusStatisticsChart;
