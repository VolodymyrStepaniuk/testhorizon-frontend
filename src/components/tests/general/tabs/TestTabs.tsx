import React, { useState, useEffect } from "react";
import { Paper, Tabs, Tab } from "@mui/material";
import { Description, InsertDriveFile } from "@mui/icons-material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { TestResponse } from "../../../../models/test/TestResponse";
import TabPanel from "../../../universal/tabs/TabPanel";
import OverviewTab from "./OverviewTab";
import FilesTab from "../../../universal/tabs/FilesTab";
import { FileEntityType } from "../../../../models/enum/fileEntityType";
import { API } from "../../../../services/api.service";
import { TestCaseResponse } from "../../../../models/testcase/TestCaseResponse";
import TestCaseTab from "./TestCaseTab";
import { useTranslation } from "react-i18next";

interface TestTabsProps {
  test: TestResponse;
  isAdmin: boolean;
  isAuthor: boolean;
}

const TestTabs: React.FC<TestTabsProps> = ({ test, isAdmin, isAuthor }) => {
  const [tabValue, setTabValue] = useState(0);
  const [testCase, setTestCase] = useState<TestCaseResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const testCaseId = test.testCase?.id;

  useEffect(() => {
    const fetchTestCase = async () => {
      if (!testCaseId) return;
      setLoading(true);
      try {
        const response = await API.testCases.getById(testCaseId);
        setTestCase(response.data);
      } catch (err) {
        console.error("Error fetching test case:", err);
      } finally {
        setLoading(false);
      }
    };

    if (tabValue === 1 && testCaseId && !testCase) {
      fetchTestCase();
    }
  }, [tabValue, testCaseId]);

  return (
    <Paper>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab icon={<Description />} label={t("tests.details.tabs.overview")} />
        <Tab icon={<TaskAltIcon />} label={t("tests.details.tabs.testCase")} />
        <Tab
          icon={<InsertDriveFile />}
          label={t("tests.details.tabs.attachments")}
        />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <OverviewTab test={test} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <TestCaseTab testCase={testCase} loading={loading} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <FilesTab
          entityType={FileEntityType.TEST}
          entityId={test.id}
          isAdmin={isAdmin}
          isOwner={isAuthor}
        />
      </TabPanel>
    </Paper>
  );
};

export default TestTabs;
