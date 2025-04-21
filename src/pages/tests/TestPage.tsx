import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import { TestResponse } from "../../models/test/TestResponse";
import { useParams } from "react-router-dom";
import { API } from "../../services/api.service";
import Comments from "../../components/comments/Comments";
import { CommentEntityType } from "../../models/enum/commentEntityTypes";
import TestHeader from "../../components/tests/general/header/TestHeader";
import TestDetails from "../../components/tests/general/TestDetails";
import TestTabs from "../../components/tests/general/tabs/TestTabs";
import { getAutoritiesFromToken } from "../../utils/auth.utils";
import { AuthorityName } from "../../models/enum/authorityNames";

const TestPage: React.FC = () => {
  const [test, setTest] = useState<TestResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

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

  const isTestAuthor = (test: TestResponse) => {
    return user?.id === test.author.id;
  };

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        setLoading(true);

        if (!id || isNaN(Number(id))) {
          setError("Invalid test ID");
          setLoading(false);
          return;
        }

        const testResponse = await API.tests.getById(Number(id));
        setTest(testResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching test data:", err);
        setError("Failed to load test data. Please try again later.");
        setLoading(false);
      }
    };

    fetchTestData();
  }, [id]);

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
          Loading test data...
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

  if (!test) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">Test not found or no longer available.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <TestHeader
        test={test}
        setTest={setTest}
        isAdmin={isAdmin}
        isAuthor={user ? isTestAuthor(test) : false}
        currentUserId={user?.id}
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={9}>
          <TestTabs
            test={test}
            isAdmin={isAdmin}
            isAuthor={user ? isTestAuthor(test) : false}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TestDetails test={test} />
        </Grid>
      </Grid>

      <Comments entityId={Number(id)} entityType={CommentEntityType.TEST} />
    </Box>
  );
};

export default TestPage;
