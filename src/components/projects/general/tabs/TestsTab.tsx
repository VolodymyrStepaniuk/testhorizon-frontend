import React from "react";
import {
  Typography,
  List,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import TestItem from "../../../universal/tabs/items/TestItem";
import { useTranslation } from "react-i18next";

interface TestsTabProps {
  tests: any[];
  loading: boolean;
}

const TestsTab: React.FC<TestsTabProps> = ({ tests, loading }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {t("projects.tabs.tests.title")}
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
        <Alert severity="info">{t("projects.tabs.tests.noTests")}</Alert>
      )}
    </>
  );
};

export default TestsTab;
