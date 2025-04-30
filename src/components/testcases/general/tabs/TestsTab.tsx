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
import { useTranslation } from "react-i18next";

interface TestsTabProps {
  tests: TestResponse[];
  testCaseId: number;
  loading: boolean;
}

const TestsTab: React.FC<TestsTabProps> = ({ tests, loading }) => {
  const { t } = useTranslation();

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
        <Typography variant="h5">
          {t("testCases.tabs.testsBasedOnThisTestCase")}
        </Typography>
      </Box>

      {tests.length === 0 ? (
        <Alert severity="info">{t("testCases.tabs.noTests")}</Alert>
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
