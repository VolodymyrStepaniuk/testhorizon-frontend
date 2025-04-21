import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { TestResponse } from "../../../../models/test/TestResponse";

interface OverviewTabProps {
  test: TestResponse;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ test }) => {
  return (
    <>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {test.description || "No description provided."}
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Instructions
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {test.instructions || "No instructions provided."}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default OverviewTab;
