import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Grid,
  CircularProgress,
  Box,
  Alert,
  LinearProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";

import { API } from "../../services/api.service";
import { PostResponse } from "../../models/post/PostResponse";
import { FileEntityType } from "../../models/enum/fileEntityType";
import BreadcrumbNav from "../../components/blog/general/BreadcrumbNav";
import HeroSection from "../../components/blog/general/HeroSection";
import PostMain from "../../components/blog/general/PostMain";
import PostDetails from "../../components/blog/general/PostDetails";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<PostResponse | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [heroUrl, setHeroUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [scrollPct, setScrollPct] = useState(0);

  // Function to load post data
  const loadPostData = useCallback(async () => {
    try {
      setLoading(true);
      if (!id || isNaN(Number(id))) {
        setError("Invalid post ID");
        return;
      }

      // Step 1: Fetch post data first
      const postRes = await API.posts.getById(Number(id));
      setPost(postRes.data);

      // Step 2: Fetch header image
      try {
        const headerRes = await API.files.fileByEntityTypeAndId(
          FileEntityType.POST,
          postRes.data.id,
          "header"
        );
        setHeroUrl(headerRes.data.fileUrl || "");
      } catch (headerErr) {}

      // Step 3: Fetch author details if available
      if (postRes.data.owner && postRes.data.owner.id) {
        try {
          const avatarRes = await API.files.fileByEntityTypeAndId(
            FileEntityType.USER,
            postRes.data.owner.id,
            "avatar"
          );
          setAvatarUrl(avatarRes.data.fileUrl || "");
        } catch (avatarErr) {
          console.error("Error loading avatar:", avatarErr);
        }
      } else {
        console.warn("No owner ID found in post data");
      }
    } catch (e) {
      console.error("Error loading post:", e);
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Initial load
  useEffect(() => {
    loadPostData();
  }, [loadPostData]);

  // Handle post updates
  const handlePostUpdated = (updatedPost: PostResponse) => {
    setPost(updatedPost);
  };

  // scroll indicator
  useEffect(() => {
    const onScroll = () => {
      const p =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      setScrollPct(p);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading)
    return (
      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (!post) return <Alert severity="error">Post not found</Alert>;

  return (
    <>
      <LinearProgress
        variant="determinate"
        value={scrollPct}
        sx={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
      />
      <HeroSection post={post} imageUrl={heroUrl} />
      <Container sx={{ my: 4 }}>
        <BreadcrumbNav title={post.title} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <PostMain post={post} />
          </Grid>
          <Grid item xs={12} md={4}>
            {post.owner && (
              <PostDetails
                author={post.owner}
                avatarUrl={avatarUrl}
                post={post}
                onPostUpdated={handlePostUpdated}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
