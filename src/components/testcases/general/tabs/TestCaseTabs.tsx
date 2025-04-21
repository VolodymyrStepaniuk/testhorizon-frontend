import React, { useState, useEffect } from "react";
import { Paper, Tabs, Tab } from "@mui/material";
import { Description, InsertDriveFile } from "@mui/icons-material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { TestCaseResponse } from "../../../../models/testcase/TestCaseResponse";
import TabPanel from "../../../universal/tabs/TabPanel";
import FilesTab from "../../../universal/tabs/FilesTab";
import { FileEntityType } from "../../../../models/enum/fileEntityType";
import { API } from "../../../../services/api.service";
import { TestResponse } from "../../../../models/test/TestResponse";
import OverviewTab from "./OverviewTab";
import TestsTab from "./TestsTab";

interface TestCaseTabsProps {
  testCase: TestCaseResponse;
  isAdmin: boolean;
  isAuthor: boolean;
}

const TestCaseTabs: React.FC<TestCaseTabsProps> = ({
  testCase,
  isAdmin,
  isAuthor,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [tests, setTests] = useState<TestResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const response = await API.tests.getAll({ testCaseId: testCase.id });
        setTests(response.data._embedded.tests || []);
      } catch (err) {
        console.error("Error fetching tests:", err);
      } finally {
        setLoading(false);
      }
    };

    if (tabValue === 1 && tests.length === 0) {
      fetchTests();
    }
  }, [tabValue, testCase.id]);

  return (
    <Paper>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab icon={<Description />} label="Overview" />
        <Tab icon={<PlayArrowIcon />} label="Tests" />
        <Tab icon={<InsertDriveFile />} label="Attachments" />
      </Tabs>

      <TabPanel value={tabValue} index={0} minHeight="400px">
        <OverviewTab testCase={testCase} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <TestsTab tests={tests} testCaseId={testCase.id} loading={loading} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <FilesTab
          entityType={FileEntityType.TEST_CASE}
          entityId={testCase.id}
          isAdmin={isAdmin}
          isOwner={isAuthor}
        />
      </TabPanel>
    </Paper>
  );
};

export default TestCaseTabs;
