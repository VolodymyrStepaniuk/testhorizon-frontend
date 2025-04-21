import React, { useState } from "react";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { BugReportResponse } from "../../../../models/bugreport/BugReportResponse";
import {
  BugReportSeverityChip,
  BugReportStatusChip,
} from "../../../../theme/customization/chips";
import SettingsMenu from "../../../universal/menu/SettingsMenu";
import DeleteBugReportDialog from "./DeleteBugReportDialog";
import UpdateBugReportDialog from "./UpdateBugReportDialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import NotificationSnackbar from "../../../universal/notification/NotificationSnackbar";
import ExportButton from "../../../universal/ExportButton";
import { ExportEntityType } from "../../../../models/enum/exportEntityTypes";
import RatingButton from "../../../universal/rating/RatingButton";

interface BugReportHeaderProps {
  bugReport: BugReportResponse;
  isAdmin: boolean;
  isReporter: boolean;
  currentUserId: number; // Add this prop to identify the current user
}

const BugReportHeader: React.FC<BugReportHeaderProps> = ({
  bugReport,
  isAdmin,
  isReporter,
  currentUserId,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [currentBugReport, setCurrentBugReport] =
    useState<BugReportResponse>(bugReport);
  const navigate = useNavigate();
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const canModify = isAdmin || isReporter;
  const open = Boolean(anchorEl);

  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setUpdateDialogOpen(true);
    handleCloseMenu();
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
    handleCloseMenu();
  };

  const handleBugReportUpdated = (updatedBugReport: BugReportResponse) => {
    setCurrentBugReport(updatedBugReport);
    setNotification({
      open: true,
      message: "Bug report updated successfully",
      severity: "success",
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  // Check if current user is the project owner
  const isProjectOwner =
    bugReport.project && bugReport.project.ownerId === currentUserId;

  // User can rate if they're an admin or the project owner
  const canRateUser =
    (isAdmin || isProjectOwner) &&
    bugReport.reporter &&
    bugReport.reporter.id !== currentUserId; // Can't rate yourself

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        variant="text"
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {currentBugReport.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <BugReportStatusChip status={currentBugReport.status} />
            <Box sx={{ width: 8 }} />
            <BugReportSeverityChip severity={currentBugReport.severity} />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", md: "flex-end" },
            gap: 1,
          }}
        >
          <ExportButton
            entityType={ExportEntityType.BUG_REPORT}
            entityId={currentBugReport.id}
          />

          {canRateUser && (
            <RatingButton
              userId={currentBugReport.reporter.id}
              entityType="Bug Report"
              entityTitle={currentBugReport.title}
            />
          )}

          {canModify && (
            <>
              <Button
                variant="outlined"
                startIcon={<Settings />}
                onClick={handleSettingsClick}
              >
                Settings
              </Button>
              <SettingsMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              <DeleteBugReportDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                bugReportId={currentBugReport.id}
                bugReportTitle={currentBugReport.title}
              />

              <UpdateBugReportDialog
                open={updateDialogOpen}
                onClose={() => setUpdateDialogOpen(false)}
                bugReport={currentBugReport}
                onBugReportUpdated={handleBugReportUpdated}
              />
            </>
          )}
        </Grid>
      </Grid>

      <NotificationSnackbar
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </Paper>
  );
};

export default BugReportHeader;
