import { Container, Box, Typography, styled, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PostResponse } from "../../../models/post/PostResponse";
import { FaClock } from "react-icons/fa";
import { formatDistanceLocalized } from "../../../utils/format.utils";
import CategoryChip from "../CardCategoryChip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const HeroRoot = styled(Box)<{ bg: string }>(({ bg }) => ({
  position: "relative",
  height: 400,
  color: "#fff",
  background: `url(${bg}) center/cover no-repeat`,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  display: "flex",
  alignItems: "center",
}));

interface Props {
  post: PostResponse;
  imageUrl: string;
}
export default function HeroSection({ post, imageUrl }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <HeroRoot bg={imageUrl}>
      <Container>
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            variant="text"
            sx={{ mb: 2, color: "#fff" }}
          >
            {t("blog.back")}
          </Button>

          <Typography variant="h2" gutterBottom>
            {post.title}
          </Typography>

          {/* Category badge */}
          <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            <CategoryChip categoryName={post.category} />
          </Box>

          {/* Author and publication time - text style instead of Avatar */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "medium", opacity: 0.9 }}
            >
              {t("blog.writtenBy")} {post.owner?.firstName}{" "}
              {post.owner?.lastName}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                opacity: 0.8,
              }}
            >
              <FaClock size={12} />
              {formatDistanceLocalized(new Date(post.createdAt))}
            </Typography>
          </Box>
        </Box>
      </Container>
    </HeroRoot>
  );
}
