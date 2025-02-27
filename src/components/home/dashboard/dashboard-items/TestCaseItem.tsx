// TestCaseItem.tsx
import React from "react";
import { Typography, Box } from "@mui/material";
import { TestCase } from "../../../models/TestCase";

interface TestCaseItemProps {
  testCase: TestCase;
}

const TestCaseItem: React.FC<TestCaseItemProps> = ({ testCase }) => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        {testCase.title}
      </Typography>
      <Typography variant="body2">
        <strong>Кроки:</strong> {testCase.steps}
      </Typography>
      <Typography variant="body2">
        <strong>Очікуваний результат:</strong> {testCase.expectedResult}
      </Typography>
      {testCase.description && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <strong>Опис:</strong> {testCase.description}
        </Typography>
      )}
    </Box>
  );
};

export default TestCaseItem;
