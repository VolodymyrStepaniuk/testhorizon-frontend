import React from "react";
import { Typography, Box, Alert, CircularProgress } from "@mui/material";
import TestCaseItem from "../../../universal/tabs/items/TestCaseItem";
import { TestCaseResponse } from "../../../../models/testcase/TestCaseResponse";

interface TestCaseTabProps {
  testCase: TestCaseResponse | null;
  loading: boolean;
}

const TestCaseTab: React.FC<TestCaseTabProps> = ({ testCase, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Test Case related to this test
      </Typography>
      {!testCase ? (
        <Alert severity="info">No test case available.</Alert>
      ) : (
        <TestCaseItem testCase={testCase} />
      )}
    </Box>
  );
};

export default TestCaseTab;
