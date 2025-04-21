import React from "react";
import {
  Typography,
  List,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import BugReportItem from "../../../universal/tabs/items/BugReportItem";

interface BugReportsTabProps {
  bugReports: any[];
  loading: boolean;
}

const BugReportsTab: React.FC<BugReportsTabProps> = ({
  bugReports,
  loading,
}) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Bug Reports
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
        <Alert severity="info">No bugs reported yet.</Alert>
      )}
    </>
  );
};

export default BugReportsTab;
