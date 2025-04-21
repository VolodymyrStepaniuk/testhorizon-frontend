import React from "react";
import {
  Typography,
  List,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import TestItem from "../../../universal/tabs/items/TestItem";

interface TestsTabProps {
  tests: any[];
  loading: boolean;
}

const TestsTab: React.FC<TestsTabProps> = ({ tests, loading }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Tests
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : tests.length > 0 ? (
        <List>
          {tests.map((item, i) => (
            <React.Fragment key={item.id}>
              <TestItem test={item} />
              {i < tests.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Alert severity="info">No tests yet.</Alert>
      )}
    </>
  );
};

export default TestsTab;
