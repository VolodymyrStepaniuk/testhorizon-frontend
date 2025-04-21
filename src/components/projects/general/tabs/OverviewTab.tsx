import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface OverviewTabProps {
  project: any;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ project }) => {
  return (
    <>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Description</Typography>
          <Typography paragraph sx={{ whiteSpace: "pre-line" }}>
            {project.description || "No description."}
          </Typography>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Instructions
          </Typography>
          <Typography paragraph sx={{ whiteSpace: "pre-line" }}>
            {project.instructions || "No instructions."}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default OverviewTab;
