import React, { useState } from "react";
import { Paper, Tabs, Tab } from "@mui/material";
import { Description, InsertDriveFile } from "@mui/icons-material";
import TabPanel from "../../../universal/tabs/TabPanel";
import { BugReportResponse } from "../../../../models/bugreport/BugReportResponse";
import { FileEntityType } from "../../../../models/enum/fileEntityType";
import FilesTab from "../../../universal/tabs/FilesTab";
import BugReportDescription from "./OverviewTab";
import { useTranslation } from "react-i18next";

interface BugReportTabsProps {
  bugReport: BugReportResponse;
  isAdmin: boolean;
  isReporter: boolean;
}

const BugReportTabs: React.FC<BugReportTabsProps> = ({
  bugReport,
  isAdmin,
  isReporter,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const { t } = useTranslation();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab icon={<Description />} label={t("bugReports.tabs.description")} />
        <Tab
          icon={<InsertDriveFile />}
          label={t("bugReports.tabs.attachments")}
        />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <BugReportDescription bugReport={bugReport} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <FilesTab
          entityType={FileEntityType.BUG_REPORT}
          entityId={bugReport.id}
          isAdmin={isAdmin}
          isOwner={isReporter}
        />
      </TabPanel>
    </Paper>
  );
};

export default BugReportTabs;
