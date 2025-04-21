import React from "react";
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  List,
  Divider,
} from "@mui/material";
import { TestResponse } from "../../../../models/test/TestResponse";
import TestItem from "../../../universal/tabs/items/TestItem";

interface TestsTabProps {
  tests: TestResponse[];
  testCaseId: number;
  loading: boolean;
}

const TestsTab: React.FC<TestsTabProps> = ({ tests, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5">Tests Based on this Test Case</Typography>
      </Box>

      {tests.length === 0 ? (
        <Alert severity="info">
          No tests have been created based on this test case yet.
        </Alert>
      ) : (
        <List>
          {tests.map((test, i) => (
            <React.Fragment key={test.id}>
              <TestItem test={test} />
              {i < tests.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}
    </>
  );
};

export default TestsTab;
