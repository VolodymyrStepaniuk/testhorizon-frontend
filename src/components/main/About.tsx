import React from "react";
import { Box, Container, Typography, Grid, Card, Stack } from "@mui/material";
import { FaUsers, FaCode, FaChartLine } from "react-icons/fa";

const aboutFeatures = [
  {
    icon: <FaUsers size={32} />,
    title: "Who We Are",
    description:
      "A community of aspiring developers and testers, collaborating to gain practical experience and improve their skills through real-world projects.",
  },
  {
    icon: <FaCode size={32} />,
    title: "What We Do",
    description:
      "We provide a platform for beginners to share their projects and collaborate with others, gaining hands-on experience in software testing and development.",
  },
  {
    icon: <FaChartLine size={32} />,
    title: "Our Vision",
    description:
      "To create the largest platform where beginners can learn and grow through real-world testing opportunities, building a solid foundation for their careers.",
  },
];

const About: React.FC = () => {
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
            About Us
          </Typography>
          <Typography component="h6" variant="h6" gutterBottom>
            Empowering the next generation of software professionals
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {aboutFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={2}
                useFlexGap
                sx={{
                  p: 2,
                  border: "1px solid hsl(220deg 20% 25% / 60%)",
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    opacity: "80%",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {feature.icon}
                </Box>
                <Box>
                  <Typography
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontSize: "1rem" }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
