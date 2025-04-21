import React from "react";
import {
  Typography,
  List,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import TestCaseItem from "../../../universal/tabs/items/TestCaseItem";
import { TestCaseResponse } from "../../../../models/testcase/TestCaseResponse";

interface TestCasesTabProps {
  testCases: TestCaseResponse[];
  loading: boolean;
}

const TestCasesTab: React.FC<TestCasesTabProps> = ({ testCases, loading }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Test Cases
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : testCases.length > 0 ? (
        <List>
          {testCases.map((item, i) => (
            <React.Fragment key={item.id}>
              <TestCaseItem testCase={item} />
              {i < testCases.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Alert severity="info">No test cases yet.</Alert>
      )}
    </>
  );
};

export default TestCasesTab;
