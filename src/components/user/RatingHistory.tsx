import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Pagination,
  Stack,
  Divider,
  Paper,
  useTheme,
  Chip,
  Avatar,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { alpha } from "@mui/system";
import { gray } from "../../theme/themePrimitives";
import { RatingResponse } from "../../models/rating/RatingResponse";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { formatDate } from "../../utils/format.utils";

interface RatingHistoryProps {
  ratings: RatingResponse[];
  loading: boolean;
}

const RatingHistory: React.FC<RatingHistoryProps> = ({ ratings, loading }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const ratingsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(ratings.length / ratingsPerPage);
  const startIndex = (page - 1) * ratingsPerPage;
  const currentRatings = ratings.slice(startIndex, startIndex + ratingsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const getRatingColorAndIcon = (value: number) => {
    if (value > 0) {
      return {
        color: theme.palette.success.main,
        backgroundColor: alpha(theme.palette.success.main, 0.1),
        icon: <ThumbUpIcon fontSize="small" />,
      };
    } else if (value < 0) {
      return {
        color: theme.palette.error.main,
        backgroundColor: alpha(theme.palette.error.main, 0.1),
        icon: <ThumbDownIcon fontSize="small" />,
      };
    } else {
      return {
        color: theme.palette.text.primary,
        backgroundColor: alpha(gray[500], 0.1),
        icon: null,
      };
    }
  };

  if (loading) {
    return (
      <Paper elevation={2} sx={{ p: 4, width: "100%" }}>
        <Typography variant="body1" align="center">
          {t("userRatings.loading")}
        </Typography>
      </Paper>
    );
  }

  return (
    <Card
      elevation={3}
      sx={{ width: "100%", background: alpha(gray[700], 0.1), p: 3 }}
    >
      <Typography variant="h5" gutterBottom>
        {t("userRatings.historyTitle")}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {ratings.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ py: 4 }}>
          {t("userRatings.noRatings")}
        </Typography>
      ) : (
        <>
          <Stack spacing={2}>
            {currentRatings.map((rating) => {
              const { color, backgroundColor, icon } = getRatingColorAndIcon(
                rating.ratingPoints
              );

              return (
                <Card
                  key={rating.id}
                  variant="outlined"
                  sx={{
                    borderLeft: `4px solid ${color}`,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 2,
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(rating.createdAt)}
                        </Typography>
                      </Box>

                      <Chip
                        avatar={
                          icon ? (
                            <Avatar sx={{ bgcolor: "transparent" }}>
                              {icon}
                            </Avatar>
                          ) : undefined
                        }
                        label={`${rating.ratingPoints > 0 ? "+" : ""}${
                          rating.ratingPoints
                        }`}
                        sx={{
                          color: color,
                          backgroundColor: backgroundColor,
                          fontWeight: "bold",
                          minWidth: "60px",
                        }}
                      />
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        sizes="small"
                        alt={
                          `${rating.ratedByUser.firstName} ${rating.ratedByUser.lastName}` ||
                          ""
                        }
                        src={"/static/images/avatar/7.jpg"}
                        sx={{ width: 36, height: 36 }}
                      />

                      <Typography variant="body2">
                        {rating.ratedByUser.firstName}{" "}
                        {rating.ratedByUser.lastName}
                      </Typography>
                    </Box>

                    {rating.comment && (
                      <Box
                        sx={{
                          mt: 2,
                          p: 1.5,
                          borderRadius: 1,
                          backgroundColor: alpha(
                            theme.palette.background.paper,
                            0.5
                          ),
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontStyle: "italic" }}
                        >
                          "{rating.comment}"
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </Stack>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="medium"
            />
          </Box>
        </>
      )}
    </Card>
  );
};

export default RatingHistory;
