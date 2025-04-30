import React from "react";
import { Typography, Box, Alert, CircularProgress } from "@mui/material";
import TestCaseItem from "../../../universal/tabs/items/TestCaseItem";
import { TestCaseResponse } from "../../../../models/testcase/TestCaseResponse";
import { useTranslation } from "react-i18next";

interface TestCaseTabProps {
  testCase: TestCaseResponse | null;
  loading: boolean;
}

const TestCaseTab: React.FC<TestCaseTabProps> = ({ testCase, loading }) => {
  const { t } = useTranslation();

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
        {t("tests.details.tabs.relatedTestCase")}
      </Typography>
      {!testCase ? (
        <Alert severity="info">{t("tests.details.tabs.noTestCase")}</Alert>
      ) : (
        <TestCaseItem testCase={testCase} />
      )}
    </Box>
  );
};

export default TestCaseTab;
