import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { UserRoleProps } from "../../../constants/userProps";
import { Box } from "@mui/material";
import { AuthorityName } from "../../../constants/enum/authorityNames";

const ProjectStatisticsChart: React.FC<UserRoleProps> = ({
  currentUserRole,
}) => {
  const theme = useTheme();
  const colorPalette = [
    theme.palette.primary.dark,
    theme.palette.primary.main,
    theme.palette.primary.light,
  ];

  const renderCaptionTypography = () => {
    switch (currentUserRole) {
      case AuthorityName.ADMIN:
        return "Total number of Tests, Test Cases and Bug Reports in the system";
      case AuthorityName.DEVELOPER:
        return "Total number of Tests, Test Cases and Bug Reports in my projects";
      case AuthorityName.TESTER:
        return "Total number of my Tests, Test Cases and Bug Reports";
      default:
        return <Box>Access Denied</Box>;
    }
  };

  const counts = {
    tests: 42,
    testCases: 128,
    bugReports: 8,
  };

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography
          component="h2"
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Project statistics
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
              data: ["Total counts"],
            },
          ]}
          series={[
            {
              id: "tests",
              label: "Tests",
              data: [counts.tests],
            },
            {
              id: "testCases",
              label: "Test Cases",
              data: [counts.testCases],
            },
            {
              id: "bugReports",
              label: "BugReports",
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
