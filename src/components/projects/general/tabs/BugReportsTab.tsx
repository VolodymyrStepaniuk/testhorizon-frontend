import React from "react";
import {
  Typography,
  List,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import BugReportItem from "../../../universal/tabs/items/BugReportItem";
import { useTranslation } from "react-i18next";

interface BugReportsTabProps {
  bugReports: any[];
  loading: boolean;
}

const BugReportsTab: React.FC<BugReportsTabProps> = ({
  bugReports,
  loading,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {t("projects.tabs.bugReports.title")}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : bugReports.length > 0 ? (
        <List>
          {bugReports.map((item, i) => (
            <React.Fragment key={item.id}>
              <BugReportItem bugReport={item} />
              {i < bugReports.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Alert severity="info">
          {t("projects.tabs.bugReports.noBugReports")}
        </Alert>
      )}
    </>
  );
};

export default BugReportsTab;
