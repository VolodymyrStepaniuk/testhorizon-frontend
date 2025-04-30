import React from "react";
import { Card, Box, Stack, Typography, useMediaQuery } from "@mui/material";

interface HighlightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  icon,
  title,
  description,
}) => {
  // ——— Recreate your size logic here ———
  const isUnder1050 = useMediaQuery("(max-width:1050px)");
  const isUnder900 = useMediaQuery("(max-width:900px)");
  const isBetween600And720 = useMediaQuery(
    "(min-width:600px) and (max-width:720px)"
  );

  let cardHeight = 225;
  if (isUnder1050) {
    if (isUnder900) {
      cardHeight = isBetween600And720 ? 320 : 270;
    } else {
      cardHeight = 320;
    }
  }

  return (
    <Card
      sx={{
        p: 2,
        border: "1px solid hsl(220 20% 25% / 60%)",
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

export default HighlightCard;
