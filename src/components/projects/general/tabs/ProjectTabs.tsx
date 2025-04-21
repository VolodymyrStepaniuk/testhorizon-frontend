import { useState, useEffect } from "react";
import { Paper, Tabs, Tab } from "@mui/material";
import { Description, InsertDriveFile, BugReport } from "@mui/icons-material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { API } from "../../../../services/api.service";
import TabPanel from "../../../universal/tabs/TabPanel";

import OverviewTab from "./OverviewTab";
import TestCasesTab from "./TestCasesTab";
import TestsTab from "./TestsTab";
import BugReportsTab from "./BugReportsTab";
import FilesTab from "../../../universal/tabs/FilesTab";
import { FileEntityType } from "../../../../models/enum/fileEntityType";
import { ProjectResponse } from "../../../../models/project/ProjectResponse";
import { TestCaseResponse } from "../../../../models/testcase/TestCaseResponse";
import { TestResponse } from "../../../../models/test/TestResponse";
import { BugReportResponse } from "../../../../models/bugreport/BugReportResponse";

interface ProjectTabsProps {
  project: ProjectResponse;
  isAdmin: boolean;
  isOwner: boolean;
}

const ProjectTabs = ({ project, isAdmin, isOwner }: ProjectTabsProps) => {
  const [tabValue, setTabValue] = useState(0);
  const [testCases, setTestCases] = useState<TestCaseResponse[]>([]);
  const [tests, setTests] = useState<TestResponse[]>([]);
  const [bugReports, setBugReports] = useState<BugReportResponse[]>([]);
  const [loading, setLoading] = useState({
    testCases: false,
    tests: false,
    bugs: false,
  });

  const fetchData = async (type: string) => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    try {
      if (type === "testCases") {
        const res = await API.testCases.getAll({
          projectIds: [project.id],
          size: 100,
        });
        setTestCases(res.data._embedded.testCases || []);
      }
      if (type === "tests") {
        const res = await API.tests.getAll({
          projectIds: [project.id],
          size: 100,
        });
        setTests(res.data._embedded.tests || []);
      }
      if (type === "bugs") {
        const res = await API.bugReports.getAll({
          projectIds: [project.id],
          size: 100,
        });
        setBugReports(res.data._embedded.bugReports || []);
      }
    } catch (err) {
      console.error(`Failed to fetch ${type}:`, err);
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  useEffect(() => {
    if (tabValue === 1 && testCases.length === 0) fetchData("testCases");
    if (tabValue === 2 && tests.length === 0) fetchData("tests");
    if (tabValue === 3 && bugReports.length === 0) fetchData("bugs");
  }, [tabValue]);

  return (
    <Paper>
      <Tabs
        value={tabValue}
        onChange={(_, val) => setTabValue(val)}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab icon={<Description />} label="Overview" />
        <Tab icon={<TaskAltIcon />} label="Test Cases" />
        <Tab icon={<PlayArrowIcon />} label="Tests" />
        <Tab icon={<BugReport />} label="Bug Reports" />
        <Tab icon={<InsertDriveFile />} label="Attachments" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <OverviewTab project={project} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <TestCasesTab testCases={testCases} loading={loading.testCases} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <TestsTab tests={tests} loading={loading.tests} />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <BugReportsTab bugReports={bugReports} loading={loading.bugs} />
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <FilesTab
          entityType={FileEntityType.PROJECT}
          entityId={project.id}
          isAdmin={isAdmin}
          isOwner={isOwner}
        />
      </TabPanel>
    </Paper>
  );
};

export default ProjectTabs;
