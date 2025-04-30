import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaShareAlt } from "react-icons/fa";
import { Settings } from "@mui/icons-material";
import { AuthorityName } from "../../../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../../../utils/auth.utils";
import { PostResponse } from "../../../models/post/PostResponse";
import { useEffect, useState } from "react";
import SettingsMenu from "../../universal/menu/SettingsMenu";
import DeletePostDialog from "./settings/DeletePostDialog";
import UpdatePostDialog from "./settings/UpdatePostDialog";
import { API } from "../../../services/api.service";
import { UserInfo } from "../../../models/info/UserInfo";

interface Props {
  author: UserInfo;
  avatarUrl: string;
  post: PostResponse;
  onPostUpdated?: (updatedPost: PostResponse) => void;
}
export default function PostDetails({
  author,
  avatarUrl,
  post,
  onPostUpdated,
}: Props) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const open = Boolean(anchorEl);

  const auths = getAutoritiesFromToken();
  const isAdmin = auths.includes(AuthorityName.ADMIN);
  const [user, setUser] = useState<any>(null);
  const isOwner = user?.id === post.owner?.id;
  const canModify = isAdmin || isOwner;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await API.users.getMe();
        setUser(userResponse.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setUpdateDialogOpen(true);
    handleCloseMenu();
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
    handleCloseMenu();
  };

  const handlePostUpdated = (updatedPost: PostResponse) => {
    if (onPostUpdated) {
      onPostUpdated(updatedPost);
    }
  };

  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t("blog.author")}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar src={avatarUrl} sx={{ width: 56, height: 56, mr: 2 }}>
            {author.firstName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1">
              {author?.firstName} {author?.lastName}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" startIcon={<FaShareAlt />} onClick={share}>
            {t("blog.share")}
          </Button>

          {canModify && (
            <>
              <Button
                variant="outlined"
                startIcon={<Settings />}
                onClick={handleSettingsClick}
              >
                {t("projects.header.settings")}
              </Button>

              <SettingsMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              <DeletePostDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                postId={post.id}
                postTitle={post.title}
              />

              <UpdatePostDialog
                open={updateDialogOpen}
                onClose={() => setUpdateDialogOpen(false)}
                post={post}
                onPostUpdated={handlePostUpdated}
              />
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
