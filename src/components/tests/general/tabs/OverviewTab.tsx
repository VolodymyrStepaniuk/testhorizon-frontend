import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { TestResponse } from "../../../../models/test/TestResponse";
import { useTranslation } from "react-i18next";

interface OverviewTabProps {
  test: TestResponse;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ test }) => {
  const { t } = useTranslation();

  return (
    <>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t("tests.details.tabs.description")}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {test.description || t("tests.details.tabs.noDescription")}
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t("tests.details.tabs.instructions")}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {test.instructions || t("tests.details.tabs.noInstructions")}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default OverviewTab;
