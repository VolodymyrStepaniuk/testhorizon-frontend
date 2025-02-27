import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";

export default function CountBarChart() {
  const theme = useTheme();
  const colorPalette = [
    theme.palette.primary.dark,
    theme.palette.primary.main,
    theme.palette.primary.light,
  ];

  const counts = {
    tests: 42,
    testCases: 128,
    bugReports: 8,
  };

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Project statistics
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", mb: 2, display: "block" }}
        >
          Total number of Tests, Test Cases and Bug Reports
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
}
