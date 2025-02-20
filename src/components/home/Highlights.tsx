import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import SecurityIcon from "@mui/icons-material/Security";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BuildIcon from "@mui/icons-material/Build";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

const items = [
  {
    icon: <BuildIcon />,
    title: "A practical approach",
    description:
      "Focus on real tasks without unnecessary complexity - only useful experience and practice.",
  },
  {
    icon: <SecurityIcon />,
    title: "Reliability in every test",
    description:
      "Gain access to a stable and durable platform designed for ongoing practice.",
  },
  {
    icon: <TouchAppIcon />,
    title: "Convenient learning experience",
    description:
      "Master software testing with an intuitive and easy-to-use interface.",
  },
  {
    icon: <ScheduleIcon />,
    title: "Innovative opportunities",
    description:
      "Practice any type of test at your own time and pace, without being tied to any schedules or requirements.",
  },
  {
    icon: <PrecisionManufacturingIcon />,
    title: "Precision in every detail",
    description:
      "Our system is designed to maximise learning efficiency, with every element contributing to your development.",
  },
  {
    icon: <AutoGraphIcon />,
    title: "Adaptable performance",
    description:
      "Our system can be easily adapted to your needs, helping you to master your testing skills efficiently.",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "100%", md: "60%" },
            textAlign: "center",
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            gutterBottom
            className="nunito-bold"
          >
            Highlights
          </Typography>
          <Typography variant="body1" className="nunito-regular">
            Find out why our product stands out: flexibility, reliability,
            user-friendly interface, and innovation. Get the opportunity to
            improve your testing skills through real-life, hands-on tasks.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: "inherit",
                  p: 3,
                  display: "flex",
                  flexGrow: 1,
                  flexShrink: 1,
                  border: "1px solid hsl(220deg 20% 25% / 60%)",
                  backgroundColor: "hsl(220, 30%, 6%)",
                  overflow: "hidden",
                }}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <Box>
                  <Typography
                    gutterBottom
                    sx={{ fontWeight: "medium" }}
                    className="nunito-bold"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "grey.400" }}
                    className="nunito-regular"
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
