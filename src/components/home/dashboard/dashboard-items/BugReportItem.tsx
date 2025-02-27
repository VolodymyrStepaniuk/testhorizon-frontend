// BugReportItem.tsx
import React from "react";
import { Typography, Box } from "@mui/material";
import { BugReport } from "../../../models/BugReport";

interface BugReportItemProps {
  bug: BugReport;
}

const BugReportItem: React.FC<BugReportItemProps> = ({ bug }) => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        {bug.title}
      </Typography>
      <Typography variant="body2">
        <strong>Серйозність:</strong> {bug.severity}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {bug.description}
      </Typography>
    </Box>
  );
};

export default BugReportItem;
