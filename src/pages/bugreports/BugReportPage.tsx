import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import { BugReportResponse } from "../../models/bugreport/BugReportResponse";
import { useParams } from "react-router-dom";
import { API } from "../../services/api.service";
import Comments from "../../components/comments/Comments";
import { CommentEntityType } from "../../models/enum/commentEntityTypes";
import { getAutoritiesFromToken } from "../../utils/auth.utils";
import { AuthorityName } from "../../models/enum/authorityNames";
import BugReportDetails from "../../components/bugreports/general/BugReportDetails";
import BugReportHeader from "../../components/bugreports/general/header/BugReportHeader";
import BugReportTabs from "../../components/bugreports/general/tabs/BugReportTabs";
import { useTranslation } from "react-i18next";

const BugReportPage: React.FC = () => {
  const [bugReport, setBugReport] = useState<BugReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();

  const authorities = getAutoritiesFromToken();
  const currentUserRole = authorities[0] as AuthorityName;
  const isAdmin = currentUserRole === AuthorityName.ADMIN;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await API.users.getMe();
        setUser(userResponse.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  const isBugReportReporter = (bugReport: BugReportResponse) => {
    return user?.id === bugReport.reporter.id;
  };

  useEffect(() => {
    const fetchBugReportData = async () => {
      try {
        setLoading(true);

        if (!id || isNaN(Number(id))) {
          setError("Invalid bug report ID");
          setLoading(false);
          return;
        }

        const bugReportResponse = await API.bugReports.getById(Number(id));
        setBugReport(bugReportResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bug report data:", err);
        setError(t("bugReportPages.details.loadError"));
        setLoading(false);
      }
    };

    fetchBugReportData();
  }, [id, t]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          {t("bugReportPages.details.loading")}
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!bugReport) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">{t("bugReportPages.details.notFound")}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <BugReportHeader
        bugReport={bugReport}
        isAdmin={isAdmin}
        isReporter={user ? isBugReportReporter(bugReport) : false}
        currentUserId={user?.id}
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={9}>
          <BugReportTabs
            bugReport={bugReport}
            isAdmin={isAdmin}
            isReporter={user ? isBugReportReporter(bugReport) : false}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <BugReportDetails bugReport={bugReport} />
        </Grid>
      </Grid>

      <Comments
        entityId={Number(id)}
        entityType={CommentEntityType.BUG_REPORT}
      />
    </Box>
  );
};

export default BugReportPage;
