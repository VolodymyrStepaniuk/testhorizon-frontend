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
import { useTranslation } from "react-i18next";

interface TestCasesTabProps {
  testCases: TestCaseResponse[];
  loading: boolean;
}

const TestCasesTab: React.FC<TestCasesTabProps> = ({ testCases, loading }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {t("projects.tabs.testCases.title")}
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
        <Alert severity="info">
          {t("projects.tabs.testCases.noTestCases")}
        </Alert>
      )}
    </>
  );
};

export default TestCasesTab;
