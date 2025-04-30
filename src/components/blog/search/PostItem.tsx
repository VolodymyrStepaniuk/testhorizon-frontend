import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { PostResponse } from "../../../models/post/PostResponse";
import CategoryChip from "../CardCategoryChip";
import { useState, useEffect } from "react";
import { API } from "../../../services/api.service";
import { FileEntityType } from "../../../models/enum/fileEntityType";
import { formatDate } from "../../../utils/format.utils";

interface PostItemProps {
  post: PostResponse;
  variant?: "horizontal" | "vertical" | "simple";
  onClick?: () => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.paper,
  height: "100%",
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const HorizontalCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

function Author({
  post,
  avatarUrl,
}: {
  post: PostResponse;
  avatarUrl: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Avatar
          alt={`${post.owner.firstName} ${post.owner.lastName}`}
          src={avatarUrl || "/static/images/avatar/default.jpg"}
          sx={{ width: 24, height: 24 }}
        />
        <Typography variant="caption">{`${post.owner.firstName} ${post.owner.lastName}`}</Typography>
      </Box>
      <Typography variant="caption">{formatDate(post.createdAt)}</Typography>
    </Box>
  );
}

export default function PostItem({
  post,
  variant = "vertical",
  onClick,
}: PostItemProps) {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [headerUrl, setHeaderUrl] = useState("");
  const [, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  // Fetch avatar and header images
  useEffect(() => {
    const fetchImages = async () => {
      // Fetch post header image first (most important)
      try {
        console.log(`Fetching header image for post: ${post.id}`);
        const headerResponse = await API.files.fileByEntityTypeAndId(
          FileEntityType.POST,
          post.id,
          "header"
        );

        if (headerResponse.data && headerResponse.data.fileUrl) {
          setHeaderUrl(headerResponse.data.fileUrl);
          console.log(`Header image URL set: ${headerResponse.data.fileUrl}`);

          // Pre-load the image to check if it can be loaded
          const img = new Image();
          img.onload = () => setImageLoaded(true);
          img.onerror = () => {
            console.error(`Failed to load header image for post ${post.id}`);
            setImageFailed(true);
          };
          img.src = headerResponse.data.fileUrl;
        }
      } catch (error) {
        console.log(`No header image for post: ${post.id}`, error);
      }

      // Fetch user avatar (less important)
      if (post.owner?.id) {
        try {
          const avatarResponse = await API.files.fileByEntityTypeAndId(
            FileEntityType.USER,
            post.owner.id,
            "avatar"
          );
          if (avatarResponse.data && avatarResponse.data.fileUrl) {
            setAvatarUrl(avatarResponse.data.fileUrl);
          }
        } catch (error) {
          console.log(`No avatar for user: ${post.owner.id}`, error);
        }
      }
    };

    fetchImages();
  }, [post.id, post.owner?.id]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/blog/posts/${post.id}`);
    }
  };

  // Generate a placeholder style with a random color background
  const placeholderColor = `hsl(${Math.random() * 360}, 70%, 85%)`;

  if (variant === "horizontal") {
    return (
      <HorizontalCard variant="outlined" onClick={handleClick} tabIndex={0}>
        {headerUrl && !imageFailed && (
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100%", sm: 200 },
              height: { xs: 180, sm: "auto" },
              objectFit: "cover",
              bgcolor: placeholderColor,
            }}
            image={headerUrl}
            alt={post.title}
          />
        )}
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <StyledCardContent>
            <CategoryChip
              categoryName={post.category}
              sx={{ mb: 1, alignSelf: "flex-start" }}
            />
            <Typography variant="h6" component="h2">
              {post.title}
            </Typography>
            <StyledTypography variant="body2" color="text.secondary">
              {post.description}
            </StyledTypography>
          </StyledCardContent>
          <Author post={post} avatarUrl={avatarUrl} />
        </Box>
      </HorizontalCard>
    );
  } else if (variant === "simple") {
    return (
      <Card variant="outlined" onClick={handleClick} tabIndex={0} sx={{ p: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <CategoryChip
            categoryName={post.category}
            sx={{ alignSelf: "flex-start" }}
          />
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {post.description}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              alt={`${post.owner.firstName} ${post.owner.lastName}`}
              src={avatarUrl || "/static/images/avatar/default.jpg"}
              sx={{ width: 20, height: 20 }}
            />
            <Typography variant="caption" color="text.secondary">
              {`${post.owner.firstName} ${post.owner.lastName}`} ·{" "}
              {formatDate(post.createdAt)}
            </Typography>
          </Box>
        </Box>
      </Card>
    );
  }

  // Default vertical layout
  return (
    <StyledCard variant="outlined" onClick={handleClick} tabIndex={0}>
      {headerUrl && !imageFailed && (
        <CardMedia
          component="img"
          alt={post.title}
          image={headerUrl}
          sx={{
            aspectRatio: "16 / 9",
            height: 200,
            objectFit: "cover",
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: placeholderColor,
          }}
        />
      )}
      <StyledCardContent>
        <CategoryChip categoryName={post.category} sx={{ mb: 1 }} />
        <Typography gutterBottom variant="h6" component="div">
          {post.title}
        </Typography>
        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
          {post.description}
        </StyledTypography>
      </StyledCardContent>
      <Author post={post} avatarUrl={avatarUrl} />
    </StyledCard>
  );
}
