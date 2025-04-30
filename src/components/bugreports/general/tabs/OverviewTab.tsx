import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { BugReportResponse } from "../../../../models/bugreport/BugReportResponse";
import { useTranslation } from "react-i18next";

interface BugReportDescriptionProps {
  bugReport: BugReportResponse;
}

const BugReportDescription: React.FC<BugReportDescriptionProps> = ({
  bugReport,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">
            {t("bugReports.tabs.descriptionTab.title")}
          </Typography>
          <Typography paragraph sx={{ whiteSpace: "pre-line" }}>
            {bugReport.description ||
              t("bugReports.tabs.descriptionTab.noDescription")}
          </Typography>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" sx={{ mt: 1 }}>
            {t("bugReports.tabs.descriptionTab.environment")}
          </Typography>
          <Typography paragraph sx={{ whiteSpace: "pre-line" }}>
            {bugReport.environment ||
              t("bugReports.tabs.descriptionTab.noEnvironment")}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default BugReportDescription;
