import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { BugReportResponse } from "../../../../models/bugreport/BugReportResponse";

interface BugReportDescriptionProps {
  bugReport: BugReportResponse;
}

const BugReportDescription: React.FC<BugReportDescriptionProps> = ({
  bugReport,
}) => {
  return (
    <>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Description</Typography>
          <Typography paragraph sx={{ whiteSpace: "pre-line" }}>
            {bugReport.description || "No description."}
          </Typography>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Environment
          </Typography>
          <Typography paragraph sx={{ whiteSpace: "pre-line" }}>
            {bugReport.environment || "No environment information provided."}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default BugReportDescription;
