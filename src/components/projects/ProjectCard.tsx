import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProjectResponse } from "../../models/project/ProjectResponse";
import { formatDate, truncateText } from "../../utils/format.utils";
import { ProjectStatusChip } from "../../theme/customization/chips";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  transition: "all 0.3s ease",
  cursor: "pointer",
  margin: theme.spacing(2),
  "&:hover": {
    transform: "translateY(-4px)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

const ProjectCard: React.FC<ProjectResponse> = ({
  id,
  title,
  owner,
  githubUrl,
  status,
  description,
  createdAt,
  updatedAt,
}) => {
  const navigate = useNavigate();

  const handleGithubClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (githubUrl) {
      window.open(githubUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleNavigateToProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/projects/${id}`);
  };

  return (
    <StyledCard role="article" aria-label={`Project: ${title}`}>
      <CardContent sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <ProjectStatusChip status={status} />
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>
          {truncateText(description)}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          {owner && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt={`${owner.firstName} ${owner.lastName}`}
                src={"https://via.placeholder.com/100"}
                sx={{ mr: 2 }}
              />
              <Typography variant="subtitle1">
                {`${owner.firstName} ${owner.lastName}`}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="outlined"
              onClick={handleNavigateToProject}
              sx={{ fontWeight: "bold", padding: "8px 16px", height: "42px" }}
              size="large"
            >
              View Project
            </Button>
            <Tooltip title="View Source Code" arrow>
              <IconButton
                aria-label="GitHub repository"
                onClick={handleGithubClick}
                size="large"
                sx={{ ml: 1 }}
              >
                <FaGithub size={24} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box sx={{ mt: 3, borderTop: "1px solid #e0e0e0", pt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Created: {formatDate(createdAt)}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
            Updated: {formatDate(updatedAt)}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ProjectCard;
