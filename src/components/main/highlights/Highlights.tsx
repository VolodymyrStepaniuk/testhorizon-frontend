import { Box, Container, Typography, Grid } from "@mui/material";
import {
  AutoGraph as AutoGraphIcon,
  Security as SecurityIcon,
  TouchApp as TouchAppIcon,
  Schedule as ScheduleIcon,
  Build as BuildIcon,
  PrecisionManufacturing as PrecisionManufacturingIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import HighlightCard from "./HighlightCard";

export default function Highlights() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <BuildIcon fontSize="large" />,
      title: t("highlights.items.0.title"),
      description: t("highlights.items.0.description"),
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: t("highlights.items.1.title"),
      description: t("highlights.items.1.description"),
    },
    {
      icon: <TouchAppIcon fontSize="large" />,
      title: t("highlights.items.2.title"),
      description: t("highlights.items.2.description"),
    },
    {
      icon: <ScheduleIcon fontSize="large" />,
      title: t("highlights.items.3.title"),
      description: t("highlights.items.3.description"),
    },
    {
      icon: <PrecisionManufacturingIcon fontSize="large" />,
      title: t("highlights.items.4.title"),
      description: t("highlights.items.4.description"),
    },
    {
      icon: <AutoGraphIcon fontSize="large" />,
      title: t("highlights.items.5.title"),
      description: t("highlights.items.5.description"),
    },
  ];

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
            variant="h2"
            sx={{ fontWeight: 700 }}
            gutterBottom
          >
            {t("highlights.title")}
          </Typography>
          <Typography variant="body1">{t("highlights.subtitle")}</Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((feat, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <HighlightCard
                icon={feat.icon}
                title={feat.title}
                description={feat.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
