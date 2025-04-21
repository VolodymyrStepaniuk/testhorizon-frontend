import React from "react";
import { Box, Typography, Button } from "@mui/material";

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box sx={{ maxWidth: 460, p: 2 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "140px",
            fontWeight: 700,
            mb: 2,
            "& span": { color: "primary.light" },
          }}
        >
          4<span>0</span>4
        </Typography>

        <Typography sx={{ mb: 3 }}>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </Typography>

        <Button
          variant="contained"
          href="/home"
          color="primary"
          sx={{
            px: 3,
            py: 1,
            fontWeight: 700,
          }}
        >
          Home Page
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
