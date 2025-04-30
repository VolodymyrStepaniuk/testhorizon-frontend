import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CategoryChip from "../CardCategoryChip";
import { usePosts } from "./PostsContext";
import { formatDate } from "../../../utils/format.utils";

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  textDecoration: "none",
  "&:hover": { cursor: "pointer" },
  "& .arrow": {
    visibility: "hidden",
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
  },
  "&:hover .arrow": {
    visibility: "visible",
    opacity: 0.7,
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "3px",
    borderRadius: "8px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    width: 0,
    height: "1px",
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.text.primary,
    opacity: 0.3,
    transition: "width 0.3s ease, opacity 0.3s ease",
  },
  "&:hover::before": {
    width: "100%",
  },
}));

export default function Latest() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { latestPosts, isLoading, error } = usePosts();
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );
  const [page, setPage] = React.useState(1);
  const postsPerPage = 6;

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handlePostClick = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  const handleViewAllClick = () => {
    navigate("/blog?view=grid");
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Calculate pagination
  const totalPages = Math.ceil(latestPosts.length / postsPerPage);
  const currentPosts = latestPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 4 }}>
        {error}
      </Alert>
    );
  }

  if (latestPosts.length === 0) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          {t("latestPosts.title")}
        </Typography>
        <Alert severity="info">{t("blog.noLatestPosts")}</Alert>
      </Box>
    );
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" gutterBottom>
          {t("latestPosts.title")}
        </Typography>
        <Button
          variant="outlined"
          endIcon={<NavigateNextRoundedIcon />}
          onClick={handleViewAllClick}
        >
          {t("latestPosts.viewAll")}
        </Button>
      </Box>
      <Grid container spacing={4} columns={12} sx={{ my: 4 }}>
        {currentPosts.map((post, index) => (
          <Grid key={post.id} item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <CategoryChip
                  categoryName={post.category}
                  sx={{ mb: 1, alignSelf: "flex-start" }}
                />
                <CardActionArea
                  component="div"
                  onClick={() => handlePostClick(post.id)}
                  onFocus={() => handleFocus(index)}
                  onBlur={handleBlur}
                  sx={{
                    display: "inline-block",
                    p: 0,
                    "&:focus-visible": {
                      outline: "3px solid",
                      outlineColor: "hsla(210, 98%, 48%, 0.5)",
                      outlineOffset: "3px",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <TitleTypography
                    gutterBottom
                    variant="h6"
                    className={focusedCardIndex === index ? "Mui-focused" : ""}
                  >
                    {post.title}
                    <NavigateNextRoundedIcon
                      className="arrow"
                      sx={{ fontSize: "1rem" }}
                    />
                  </TitleTypography>
                </CardActionArea>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {post.description}
                </StyledTypography>

                <Box sx={{ mt: "auto", pt: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="caption">
                      {`${post.owner.firstName} ${post.owner.lastName}`}
                    </Typography>
                    <Typography variant="caption">
                      {formatDate(post.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 4,
          justifyContent: "center",
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
}
