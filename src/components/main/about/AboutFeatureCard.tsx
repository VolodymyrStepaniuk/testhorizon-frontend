import React from "react";
import { Card, Box, Stack, Typography, useMediaQuery } from "@mui/material";

export interface AboutFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AboutFeatureCard: React.FC<AboutFeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  const isUnder1050 = useMediaQuery("(max-width:1050px)", { noSsr: true });
  let cardHeight = isUnder1050 ? 300 : 250;

  return (
    <Card
      sx={{
        p: 2,
        border: "1px solid hsl(220deg 20% 25% / 60%)",
        backgroundColor: "transparent",
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        height: cardHeight,
        boxSizing: "border-box",
      }}
    >
      <Stack direction="column" spacing={2} sx={{ flex: 1 }}>
        <Box sx={{ opacity: 0.8, color: "white", textAlign: "center", pt: 2 }}>
          {icon}
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              textAlign: "center",
              color: "white",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "1rem",
              flex: 1,
              overflow: "auto",
            }}
          >
            {description}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default AboutFeatureCard;
