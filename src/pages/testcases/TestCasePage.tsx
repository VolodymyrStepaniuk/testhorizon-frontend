import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import { TestCaseResponse } from "../../models/testcase/TestCaseResponse";
import { useParams } from "react-router-dom";
import { API } from "../../services/api.service";
import Comments from "../../components/comments/Comments";
import { CommentEntityType } from "../../models/enum/commentEntityTypes";
import TestCaseHeader from "../../components/testcases/general/header/TestCaseHeader";
import TestCaseDetails from "../../components/testcases/general/TestCaseDetails";
import TestCaseTabs from "../../components/testcases/general/tabs/TestCaseTabs";
import { getAutoritiesFromToken } from "../../utils/auth.utils";
import { AuthorityName } from "../../models/enum/authorityNames";
import { useTranslation } from "react-i18next";

const TestCasePage: React.FC = () => {
  const [testCase, setTestCase] = useState<TestCaseResponse | null>(null);
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

  const isTestCaseAuthor = (testCase: TestCaseResponse) => {
    return user?.id === testCase.author.id;
  };

  useEffect(() => {
    const fetchTestCaseData = async () => {
      try {
        setLoading(true);

        if (!id || isNaN(Number(id))) {
          setError("Invalid test case ID");
          setLoading(false);
          return;
        }

        const testCaseResponse = await API.testCases.getById(Number(id));
        setTestCase(testCaseResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching test case data:", err);
        setError(t("testCasePages.details.loadError"));
        setLoading(false);
      }
    };

    fetchTestCaseData();
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
          {t("testCasePages.details.loading")}
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

  if (!testCase) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">{t("testCasePages.details.notFound")}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <TestCaseHeader
        testCase={testCase}
        setTestCase={setTestCase}
        isAdmin={isAdmin}
        isAuthor={user ? isTestCaseAuthor(testCase) : false}
        currentUserId={user?.id}
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={9}>
          <TestCaseTabs
            testCase={testCase}
            isAdmin={isAdmin}
            isAuthor={user ? isTestCaseAuthor(testCase) : false}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TestCaseDetails testCase={testCase} />
        </Grid>
      </Grid>

      <Comments
        entityId={Number(id)}
        entityType={CommentEntityType.TEST_CASE}
      />
    </Box>
  );
};

export default TestCasePage;
