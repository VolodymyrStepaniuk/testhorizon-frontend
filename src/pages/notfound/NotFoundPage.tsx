import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

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

        <Typography sx={{ mb: 3 }}>{t("notFound.description")}</Typography>

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
          {t("notFound.homeButton")}
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
