// TestItem.tsx
import React from "react";
import { Typography, Box } from "@mui/material";
import { Test } from "../../../models/Test";

interface TestItemProps {
  test: Test;
}

const TestItem: React.FC<TestItemProps> = ({ test }) => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        {test.title}
      </Typography>
      <Typography variant="body2">
        <strong>Результат:</strong> {test.result}
      </Typography>
    </Box>
  );
};

export default TestItem;
