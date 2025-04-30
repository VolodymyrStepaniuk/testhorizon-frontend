import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { PostCategoryName } from "../../../models/enum/postCategoryName";
import CategoryChips from "./CategoryChips";
import PostItem from "./PostItem";
import { usePosts } from "./PostsContext";
import { useAuth } from "../../../contexts/AuthContext";

export function Search() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSearchTerm } = usePosts();
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim().length > 2) {
      setSearchTerm(value);
      navigate(`/blog?view=grid`, { replace: true });
    } else if (value.trim().length === 0) {
      setSearchTerm("");
    }
  };

  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder={t("blog.search")}
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { featuredPosts, setSelectedCategory, isLoading, error } = usePosts();
  const [selectedCategory, setSelectedCategoryLocal] =
    React.useState<PostCategoryName | null>(null);
  const { user } = useAuth();

  const handleCategoryClick = (category: PostCategoryName | null) => {
    setSelectedCategoryLocal(category);
    setSelectedCategory(category);
    navigate(`/blog?view=grid`);
  };

  const handlePostClick = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  // Array of category options
  const categories = [
    null, // Representing "All"
    PostCategoryName.QUALITY_ASSURANCE,
    PostCategoryName.AUTOMATION_QA,
    PostCategoryName.PERFORMANCE_TESTING,
    PostCategoryName.SECURITY_TESTING,
    PostCategoryName.MANUAL_TESTING,
  ];

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

  // Show placeholder if no featured posts
  if (featuredPosts.length === 0) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom>
          {t("blog.title")}
        </Typography>
        <Typography gutterBottom>{t("blog.subtitle")}</Typography>
        <Alert severity="info" sx={{ mt: 4 }}>
          {t("blog.noFeaturedPosts")}
        </Alert>
      </Box>
    );
  }

  const numPostsToShow = Math.min(4, featuredPosts.length);
  const postsToDisplay = featuredPosts.slice(0, numPostsToShow);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          {t("blog.title")}
        </Typography>
        <Typography>{t("blog.subtitle")}</Typography>
      </div>

      {/* Mobile search */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
        }}
      >
        <Search />
      </Box>

      {/* Categories and desktop search */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
        <CategoryChips
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryClick}
          categories={categories}
        />

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}
        >
          <Search />
        </Box>
      </Box>

      {user && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => navigate("/blog/new")}
          >
            {t("blog.createPost")}
          </Button>
        </Box>
      )}

      {/* Featured posts grid - display 3 posts per row */}
      <Grid container spacing={2}>
        {postsToDisplay.map((post) => (
          <Grid item xs={12} sm={6} md={6} key={post.id}>
            <PostItem post={post} onClick={() => handlePostClick(post.id)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
