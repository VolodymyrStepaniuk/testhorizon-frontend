import React, { memo } from "react";
import type { MouseEvent } from "react";
import {
  Card,
  Typography,
  Avatar,
  Box,
  Button,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { TestResponse } from "../../models/test/TestResponse";
import { formatDate, truncateText } from "../../utils/format.utils";
import { FaGithub } from "react-icons/fa";
import { TestTypeChip } from "../../theme/customization/chips";
import { useTranslation } from "react-i18next";

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

const TestCard: React.FC<TestResponse> = memo(
  ({
    id,
    project,
    testCase,
    author,
    title,
    description,
    type,
    githubUrl,
    createdAt,
    updatedAt,
  }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleGithubClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (githubUrl) {
        window.open(githubUrl, "_blank", "noopener,noreferrer");
      }
    };

    const handleNavigateToTest = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      navigate(`/tests/${id}`);
    };

    return (
      <StyledCard role="article" aria-label={`Test: ${title}`}>
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>
            <TestTypeChip testtype={type} />
          </Box>

          <Typography variant="body2" color="text.secondary" paragraph>
            {truncateText(description || "")}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {t("tests.card.project")}{" "}
              <Button
                variant="text"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  navigate(`/projects/${project.id}`);
                }}
                sx={{ textTransform: "none", padding: 0 }}
              >
                {project.title}
              </Button>
            </Typography>
            {testCase && (
              <Typography variant="body2" color="text.secondary">
                {t("tests.card.testCase")}{" "}
                <Button
                  variant="text"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    navigate(`/test-cases/${testCase.id}`);
                  }}
                  sx={{ textTransform: "none", padding: 0 }}
                >
                  {testCase.title}
                </Button>
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            {author && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt={`${author.firstName} ${author.lastName}`}
                  src={"https://via.placeholder.com/100"}
                  sx={{ mr: 2 }}
                />
                <Typography variant="subtitle1">
                  {`${author.firstName} ${author.lastName}`}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                onClick={handleNavigateToTest}
                sx={{ fontWeight: "bold", padding: "8px 16px", height: "42px" }}
                size="large"
              >
                {t("tests.card.viewTest")}
              </Button>
              {githubUrl && (
                <Tooltip title={t("tests.card.viewSourceCode")} arrow>
                  <IconButton
                    aria-label="GitHub repository"
                    onClick={handleGithubClick}
                    size="large"
                    sx={{ ml: 1 }}
                  >
                    <FaGithub size={24} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>

          <Box sx={{ mt: 2, borderTop: "1px solid #e0e0e0", pt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {t("tests.card.created")} {formatDate(createdAt)}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
              {t("tests.card.updated")} {formatDate(updatedAt)}
            </Typography>
          </Box>
        </CardContent>
      </StyledCard>
    );
  }
);

export default TestCard;
