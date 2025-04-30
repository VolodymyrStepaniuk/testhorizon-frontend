import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface OverviewTabProps {
  project: any;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ project }) => {
  const { t } = useTranslation();

  return (
    <>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">
            {t("projects.tabs.overview.description")}
          </Typography>
          <Typography paragraph sx={{ whiteSpace: "pre-line" }}>
            {project.description || t("projects.tabs.overview.noDescription")}
          </Typography>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" sx={{ mt: 1 }}>
            {t("projects.tabs.overview.instructions")}
          </Typography>
          <Typography paragraph sx={{ whiteSpace: "pre-line" }}>
            {project.instructions || t("projects.tabs.overview.noInstructions")}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default OverviewTab;
