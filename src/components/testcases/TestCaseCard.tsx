import React from "react";
import type { MouseEvent } from "react";
import {
  Card,
  Typography,
  Avatar,
  Box,
  Button,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { TestCaseResponse } from "../../models/testcase/TestCaseResponse";
import { formatDate, truncateText } from "../../utils/format.utils";
import { TestCasePriorityChip } from "../../theme/customization/chips";
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

const TestCaseCard: React.FC<TestCaseResponse> = ({
  id,
  project,
  author,
  title,
  description,
  priority,
  createdAt,
  updatedAt,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigateToTestCase = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/test-cases/${id}`);
  };

  return (
    <StyledCard role="article" aria-label={`Test Case: ${title}`}>
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
          <TestCasePriorityChip priority={priority} />
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>
          {truncateText(description)}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {t("testCases.card.project")}{" "}
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
              onClick={handleNavigateToTestCase}
              sx={{ fontWeight: "bold", padding: "8px 16px", height: "42px" }}
              size="large"
            >
              {t("testCases.card.viewTestCase")}
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 2, borderTop: "1px solid #e0e0e0", pt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {t("testCases.card.created")} {formatDate(createdAt)}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
            {t("testCases.card.updated")} {formatDate(updatedAt)}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default TestCaseCard;
