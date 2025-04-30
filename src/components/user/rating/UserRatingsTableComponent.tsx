import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Box,
  Typography,
  Avatar,
  Chip,
} from "@mui/material";
import { useTranslation } from "react-i18next";

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

interface UserRatingsTableComponentProps {
  users: UserRating[];
  currentUser: UserRating | null;
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadingCounts: boolean;
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

const UserRatingsTableComponent: React.FC<UserRatingsTableComponentProps> = ({
  users,
  currentUser,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  loadingCounts,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ minWidth: 80 }}>
              {t("userRatings.table.rank")}
            </TableCell>
            <TableCell sx={{ minWidth: 150 }}>
              {t("userRatings.table.user")}
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 100 }}>
              {t("userRatings.table.rating")}
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 100 }}>
              {t("userRatings.table.testsCreated")}
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 130 }}>
              {t("userRatings.table.testCasesCreated")}
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 130 }}>
              {t("userRatings.table.bugReportsCreated")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Chip
                  label={`#${user.rank}`}
                  size="small"
                  {...getRankChipProps(user.rank)}
                  sx={{
                    backgroundColor:
                      currentUser?.id === user.id ? "orange" : undefined,
                  }}
                />
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar src={user.avatar} />
                  <Typography>{user.name}</Typography>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Typography color={getRatingColor(user.rating)}>
                  {formatRating(user.rating)}
                </Typography>
              </TableCell>
              <TableCell align="center">
                {loadingCounts ? (
                  <CircularProgress size={16} />
                ) : (
                  user.completedTests
                )}
              </TableCell>
              <TableCell align="center">
                {loadingCounts ? (
                  <CircularProgress size={16} />
                ) : (
                  user.createdTestCases
                )}
              </TableCell>
              <TableCell align="center">
                {loadingCounts ? (
                  <CircularProgress size={16} />
                ) : (
                  user.createdBugReports
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage={t("dataGrid.rowsPerPage")}
        labelDisplayedRows={({ from, to, count }) =>
          t("dataGrid.pageStatus", { from, to, count })
        }
      />
    </>
  );
};

export default UserRatingsTableComponent;
