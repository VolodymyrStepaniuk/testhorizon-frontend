import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Latest from "../../components/blog/search/Latest";
import MainContent from "../../components/blog/search/MainContent";
import PostList from "../../components/blog/search/PostList";
import PostsFilter from "../../components/blog/search/PostsFilter";
import Footer from "../../components/universal/Footer";
import AppAppBar from "../../components/universal/Header";
import AppTheme from "../../theme/AppTheme";
import {
  PostsProvider,
  usePosts,
} from "../../components/blog/search/PostsContext";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { PostCategoryName } from "../../models/enum/postCategoryName";

export default function Blog() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "featured";
  const categoryParam = searchParams.get("category");
  const searchTerm = searchParams.get("search");

  // Parse categoryParam as PostCategoryName enum value or null
  let initialCategory: PostCategoryName | null = null;
  if (
    categoryParam &&
    Object.values(PostCategoryName).includes(categoryParam as PostCategoryName)
  ) {
    initialCategory = categoryParam as PostCategoryName;
  }

  return (
    <AppTheme>
      <PostsProvider>
        <BlogContent
          view={view}
          initialCategory={initialCategory}
          initialSearch={searchTerm || ""}
        />
      </PostsProvider>
    </AppTheme>
  );
}

// Separated to use context hooks
function BlogContent({
  view,
  initialCategory,
  initialSearch,
}: {
  view: string;
  initialCategory: PostCategoryName | null;
  initialSearch: string;
}) {
  const { setSelectedCategory, setSearchTerm } = usePosts();

  // Set initial search and category filters from URL params
  useEffect(() => {
    // For category, explicitly check if it's null
    setSelectedCategory(initialCategory);

    if (initialSearch) {
      setSearchTerm(initialSearch);
    }
  }, [initialCategory, initialSearch, setSelectedCategory, setSearchTerm]);

  return (
    <>
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        {view === "featured" ? (
          <>
            <MainContent />
            <Latest />
          </>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <PostsFilter />
            <PostList variant={view === "list" ? "list" : "grid"} />
          </Box>
        )}
      </Container>
      <Footer />
    </>
  );
}
