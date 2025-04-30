import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { API } from "../../../services/api.service";
import { PostResponse } from "../../../models/post/PostResponse";
import { PostCategoryName } from "../../../models/enum/postCategoryName";

// Context interface
interface PostsContextType {
  posts: PostResponse[];
  featuredPosts: PostResponse[];
  latestPosts: PostResponse[];
  filteredPosts: PostResponse[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: PostCategoryName | null;
  setSelectedCategory: (category: PostCategoryName | null) => void;
  categories: PostCategoryName[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  refreshPosts: () => Promise<void>;
}

// Create the context
const PostsContext = createContext<PostsContextType | undefined>(undefined);

// Provider component
export const PostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<PostResponse[]>([]);
  const [latestPosts, setLatestPosts] = useState<PostResponse[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<PostCategoryName | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // All available post categories from enum
  const categories = Object.values(PostCategoryName);

  // Fetch all posts initially
  useEffect(() => {
    fetchPosts();
  }, []);

  // Apply search and category filters when they change
  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        fetchFilteredPosts();
      },
      searchTerm ? 300 : 0
    ); // Add small delay for typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory, currentPage, pageSize]);

  // Fetch all posts
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get all posts first - we'll use this for filtering locally if possible
      const allPostsResponse = await API.posts.getAll({ size: 100 });
      setPosts(allPostsResponse.data._embedded.posts);
      setFilteredPosts(allPostsResponse.data._embedded.posts);

      // Get featured posts
      const featuredResponse = await API.posts.getAll({ size: 6 });
      setFeaturedPosts(featuredResponse.data._embedded.posts);

      // Get latest posts
      const latestResponse = await API.posts.getAll({ size: 10 });
      setLatestPosts(latestResponse.data._embedded.posts);

      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setError("Failed to load posts. Please try again later.");
      setIsLoading(false);
    }
  };

  // Fetch filtered posts
  const fetchFilteredPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Prepare API params
      const params: {
        page?: number;
        size?: number;
        title?: string;
        category?: PostCategoryName;
      } = {
        page: currentPage - 1,
        size: pageSize,
      };

      // Add search term if present (for API filtering)
      if (searchTerm) {
        params.title = searchTerm;
      }

      // Add category filter if present and not null (for API filtering)
      if (selectedCategory !== null) {
        params.category = selectedCategory;
      }

      // Make API call with filters
      const response = await API.posts.getAll(params);

      // Always set filteredPosts from response (empty array is valid - means no results)
      setFilteredPosts(response.data._embedded.posts);
      setTotalPages(Math.max(1, response.data.page.totalPages));
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch filtered posts:", err);

      // Don't show the error message about failed filters - just show empty results
      setFilteredPosts([]);
      setTotalPages(1);
      setIsLoading(false);
    }
  };

  // Refresh posts (can be called after creating or updating a post)
  const refreshPosts = async () => {
    await fetchPosts();
    await fetchFilteredPosts();
  };

  const value = {
    posts,
    featuredPosts,
    latestPosts,
    filteredPosts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    isLoading,
    error,
    totalPages,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    refreshPosts,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

// Custom hook to use the posts context
export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
};
