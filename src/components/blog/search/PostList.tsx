import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import { usePosts } from "./PostsContext";
import PostItem from "./PostItem";
import { Button } from "@mui/material";
import { translateEnum } from "../../../utils/i18n.utils";

interface PostListProps {
  variant?: "grid" | "list";
}

export default function PostList({ variant = "grid" }: PostListProps) {
  const { t } = useTranslation();
  const {
    filteredPosts,
    isLoading,
    error,
    totalPages,
    currentPage,
    setCurrentPage,
    searchTerm,
    selectedCategory,
    setSearchTerm,
    setSelectedCategory,
  } = usePosts();

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{ my: 4 }}
        action={
          <Button color="inherit" size="small" onClick={handleClearFilters}>
            Clear filters
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          {t("blog.noResults")}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {searchTerm && selectedCategory
            ? t("blog.noResultsForCategoryAndSearch", {
                category: translateEnum(
                  "enums.post.category",
                  selectedCategory
                ),
                search: searchTerm,
              })
            : searchTerm
            ? t("blog.noResultsForSearch", { search: searchTerm })
            : selectedCategory
            ? t("blog.noResultsForCategory", {
                category: translateEnum(
                  "enums.post.category",
                  selectedCategory
                ),
              })
            : t("blog.noPostsAvailable")}
        </Typography>

        {/* Add Clear Filters button */}
        {(searchTerm || selectedCategory) && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleClearFilters}
            sx={{ mt: 2 }}
          >
            {t("blog.clearFilters")}
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" color="text.secondary">
          {t("blog.showingResults", { count: filteredPosts.length })}
          {searchTerm && (
            <>
              {" "}
              {t("blog.forSearch")} "<strong>{searchTerm}</strong>"
            </>
          )}
          {selectedCategory && (
            <>
              {" "}
              {t("blog.inCategory")}{" "}
              <strong>
                {translateEnum("enums.post.category", selectedCategory)}
              </strong>
            </>
          )}
        </Typography>
      </Box>

      {variant === "grid" ? (
        <Grid container spacing={3}>
          {filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <PostItem post={post} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {filteredPosts.map((post) => (
            <PostItem post={post} variant="horizontal" key={post.id} />
          ))}
        </Box>
      )}

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
