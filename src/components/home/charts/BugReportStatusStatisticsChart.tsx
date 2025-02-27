import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { BugReportStatus } from "../../../constants/enum/bugReportStatuses";
import { UserRoleProps } from "../../../constants/userProps";
import { Box } from "@mui/material";
import { AuthorityName } from "../../../constants/enum/authorityNames";

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

  // Тимчасові захардкоджені дані
  const testCounts: BugReportCount[] = [
    { type: BugReportStatus.OPENED, count: 12 },
    { type: BugReportStatus.IN_PROGRESS, count: 8 },
    { type: BugReportStatus.CLOSED, count: 14 },
    { type: BugReportStatus.RESOLVED, count: 9 },
  ];

  // Перетворюємо дані так, що кожен тип тесту стає окремою серією
  const seriesData = testCounts.map((tc) => ({
    id: tc.type,
    label: tc.type,
    data: [tc.count],
  }));

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
