import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Alert,
  Paper,
  Card,
  CardContent,
  CircularProgress,
  Avatar,
  Chip,
} from "@mui/material";
import { API } from "../../../services/api.service";
import { UserResponse } from "../../../models/user/UserResponse";
import UserRatingsTableComponent from "../../../components/user/rating/UserRatingsTableComponent";
import { FileEntityType } from "../../../models/enum/fileEntityType";

interface UserRating {
  id: number;
  name: string;
  avatar?: string;
  rating: number;
  completedTests: number;
  createdTestCases: number;
  createdBugReports: number;
  rank: number;
}

const getRankChipProps = (rank: number) => {
  if (rank <= 3) {
    return { color: "warning" as const, variant: "filled" as const };
  } else if (rank <= 10) {
    return { color: "primary" as const, variant: "filled" as const };
  } else {
    return { color: "default" as const, variant: "outlined" as const };
  }
};

const formatRating = (rating: number): string => {
  return rating >= 0 ? `+${rating}` : `${rating}`;
};

const getRatingColor = (rating: number): string => {
  return rating >= 0 ? "success.main" : "error.main";
};

const UserRatingsTable: React.FC = () => {
  const [users, setUsers] = useState<UserRating[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentUser, setCurrentUser] = useState<UserRating | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingCounts, setLoadingCounts] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentUserAvatar, setCurrentUserAvatar] = useState<string>("");

  // Function to fetch user avatar (same as SideMenu)
  const fetchUserAvatar = async (userId: number) => {
    try {
      const avatarFileName = "avatar";
      const response = await API.files.fileByEntityTypeAndId(
        FileEntityType.USER,
        userId,
        avatarFileName
      );

      if (response.data && response.data.fileUrl) {
        setCurrentUserAvatar(response.data.fileUrl);
      }
    } catch (error) {
      // Silently handle missing avatar
    }
  };

  // Helper function to fetch activity counts for a given user
  const getUserActivityCounts = async (userId: number) => {
    try {
      const [testCasesResponse, testsResponse, bugReportsResponse] =
        await Promise.all([
          API.testCases.getAll({ authorId: userId, size: 1 }),
          API.tests.getAll({ authorId: userId, size: 1 }),
          API.bugReports.getAll({ reporterId: userId, size: 1 }),
        ]);

      return {
        createdTestCases: testCasesResponse.data.page?.totalElements || 0,
        completedTests: testsResponse.data.page?.totalElements || 0,
        createdBugReports: bugReportsResponse.data.page?.totalElements || 0,
      };
    } catch (err) {
      console.error(`Error fetching activity counts for user ${userId}:`, err);
      return {
        createdTestCases: 0,
        completedTests: 0,
        createdBugReports: 0,
      };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch top users by rating for the current page
        const topUsersResponse = await API.users.getTopByRating({
          page: page,
          size: rowsPerPage,
        });

        // Fetch current user info
        const currentUserResponse = await API.users.getMe();

        const transformedUsers: UserRating[] =
          topUsersResponse.data._embedded?.users?.map(
            (user: UserResponse, index: number) => ({
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              avatar: user._links?.avatar ? user._links.avatar.href : undefined,
              rating: user.totalRating,
              completedTests: 0,
              createdTestCases: 0,
              createdBugReports: 0,
              rank: page * rowsPerPage + index + 1,
            })
          ) || [];

        setTotalCount(topUsersResponse.data.page?.totalElements || 0);
        setUsers(transformedUsers);
        setLoading(false);

        setLoadingCounts(true);

        // Update currentUser info with activity counts
        const currentUserInfo: UserRating = {
          id: currentUserResponse.data.id,
          name: `${currentUserResponse.data.firstName} ${currentUserResponse.data.lastName}`,
          avatar: undefined, // We'll fetch this separately like in SideMenu
          rating: currentUserResponse.data.totalRating,
          completedTests: 0,
          createdTestCases: 0,
          createdBugReports: 0,
          rank:
            transformedUsers.findIndex(
              (u) => u.id === currentUserResponse.data.id
            ) +
            1 +
            page * rowsPerPage,
        };

        // If rank was not found (or is 0), fetch overall rank from all users
        if (currentUserInfo.rank <= 0) {
          try {
            const allUsersResponse = await API.users.getTopByRating({
              page: 0,
              size: 1000,
            });
            if (allUsersResponse.data._embedded?.users) {
              const currentUserRank =
                allUsersResponse.data._embedded.users.findIndex(
                  (u: UserResponse) => u.id === currentUserResponse.data.id
                );
              currentUserInfo.rank =
                currentUserRank !== -1 ? currentUserRank + 1 : totalCount + 1;
            }
          } catch (err) {
            console.error("Error fetching user rank:", err);
            currentUserInfo.rank = totalCount + 1;
          }
        }

        // Fetch activity counts for current user
        const currentUserCounts = await getUserActivityCounts(
          currentUserInfo.id
        );
        setCurrentUser({
          ...currentUserInfo,
          ...currentUserCounts,
        });

        // Fetch avatar for current user like in SideMenu
        fetchUserAvatar(currentUserInfo.id);

        // For each user in the list, fetch their activity counts in parallel
        const userCountPromises = transformedUsers.map(async (user) => {
          const counts = await getUserActivityCounts(user.id);
          return {
            ...user,
            ...counts,
          };
        });

        const usersWithCounts = await Promise.all(userCountPromises);
        setUsers(usersWithCounts);
        setLoadingCounts(false);
      } catch (err) {
        console.error("Error fetching user ratings:", err);
        setError("Failed to load user ratings. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {error && (
        <Alert severity="error" sx={{ mt: 4, mb: 2 }}>
          {error}
        </Alert>
      )}

      {currentUser && (
        <Card sx={{ mb: 4, mt: 4 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={3}>
              <Avatar
                src={currentUserAvatar || "/static/images/avatar/7.jpg"}
                sx={{ width: 80, height: 80 }}
              />
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Your Rating Profile
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h6" color="text.secondary">
                    Rating:
                  </Typography>
                  <Typography
                    variant="h6"
                    color={getRatingColor(currentUser.rating)}
                  >
                    {formatRating(currentUser.rating)}
                  </Typography>
                </Box>
                <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
                  <Chip
                    label={`Rank #${currentUser.rank}`}
                    {...getRankChipProps(currentUser.rank)}
                    sx={{ fontWeight: "bold" }}
                  />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        User Ratings
      </Typography>

      <Paper>
        <Box sx={{ padding: "1rem", mb: 4 }}>
          <UserRatingsTableComponent
            users={users}
            currentUser={currentUser}
            totalCount={totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            loadingCounts={loadingCounts}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default UserRatingsTable;
