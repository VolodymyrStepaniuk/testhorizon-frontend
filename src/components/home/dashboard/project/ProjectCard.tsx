import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProjectResponse } from "../../../../models/project/ProjectResponse";
import { ProjectStatusChip } from "../../../../theme/customization/chips";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
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

const ProjectCard: React.FC<ProjectResponse> = (props) => {
  const { id, title, owner, githubUrl, status, description } = props;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/projects/${id}`);
  };

  const handleGithubClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    if (githubUrl) {
      window.open(githubUrl, "_blank", "noopener,noreferrer");
    }
  };

  const truncateDescription = (
    text: string,
    maxLength: number = 85
  ): string => {
    if (!text) return "";

    if (text.length <= maxLength) return text;

    const lastSpace = text.lastIndexOf(" ", maxLength);

    if (lastSpace === -1 || lastSpace < maxLength / 2) {
      return `${text.substring(0, maxLength)}...`;
    }

    return `${text.substring(0, lastSpace)} ...`;
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <CardContent>
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            alt={`${owner.firstName} ${owner.lastName}`}
            src={"https://via.placeholder.com/100"}
            sx={{ mr: 2 }}
          />
          <Typography variant="subtitle1">
            {`${owner.firstName} ${owner.lastName}`}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 0.5,
            height: "60px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {truncateDescription(description)}
        </Typography>
        {githubUrl && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title="View on GitHub" arrow>
              <IconButton
                onClick={handleGithubClick}
                aria-label="GitHub repository link"
                size="large"
              >
                <FaGithub />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default ProjectCard;
