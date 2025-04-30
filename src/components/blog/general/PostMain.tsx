import { Paper, Typography, Divider, Box } from "@mui/material";
import { CommentEntityType } from "../../../models/enum/commentEntityTypes";
import { PostResponse } from "../../../models/post/PostResponse";
import Comments from "../../comments/Comments";
import PostContent from "./PostContent";

interface Props {
  post: PostResponse;
}
export default function PostMain({ post }: Props) {
  return (
    <>
      <Paper
        sx={{
          p: { xs: 3, sm: 4, md: 5 }, // Increased padding for larger screens
          mb: 4,
          minHeight: { xs: "auto", md: "500px" }, // Minimum height on desktop
          width: "100%",
        }}
      >
        {post.description && (
          <>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 2, fontStyle: "italic" }}
            >
              {post.description}
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </>
        )}

        <Box sx={{ mb: 4 }}>
          <PostContent
            dangerouslySetInnerHTML={{ __html: post.content }}
            sx={{ fontSize: "1.05rem", lineHeight: 1.8 }} // Slightly larger text for better readability
          />
        </Box>
      </Paper>

      <Comments entityType={CommentEntityType.POST} entityId={post.id} />
    </>
  );
}
