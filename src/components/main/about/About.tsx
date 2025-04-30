import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { FaUsers, FaCode, FaChartLine } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import AboutFeatureCard, { AboutFeatureCardProps } from "./AboutFeatureCard";

const About: React.FC = () => {
  const { t } = useTranslation();

  const aboutFeatures: AboutFeatureCardProps[] = [
    {
      icon: <FaUsers size={32} />,
      title: t("about.features.whoWeAre.title"),
      description: t("about.features.whoWeAre.description"),
    },
    {
      icon: <FaCode size={32} />,
      title: t("about.features.whatWeDo.title"),
      description: t("about.features.whatWeDo.description"),
    },
    {
      icon: <FaChartLine size={32} />,
      title: t("about.features.ourVision.title"),
      description: t("about.features.ourVision.description"),
    },
  ];

  return (
    <Box
      id="about"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
            {t("about.title")}
          </Typography>
          <Typography component="h6" variant="h6" gutterBottom>
            {t("about.subtitle")}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {aboutFeatures.map((feat, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <AboutFeatureCard
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
};

export default About;
