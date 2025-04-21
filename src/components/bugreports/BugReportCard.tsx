import React, { memo } from "react";
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
import { BugReportResponse } from "../../models/bugreport/BugReportResponse";
import { formatDate, truncateText } from "../../utils/format.utils";
import {
  BugReportSeverityChip,
  BugReportStatusChip,
} from "../../theme/customization/chips";

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

const BugReportCard: React.FC<BugReportResponse> = memo(
  ({
    id,
    project,
    reporter,
    title,
    description,
    environment,
    severity,
    status,
    createdAt,
    updatedAt,
  }) => {
    const navigate = useNavigate();

    const handleNavigateToProject = (
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
      e.stopPropagation();
      navigate(`/projects/${project.id}`);
    };

    const handleNavigateToBugReport = (
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
      e.stopPropagation();
      navigate(`/bug-reports/${id}`);
    };

    return (
      <StyledCard role="article" aria-label={`Bug Report: ${title}`}>
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
            <Box>
              <BugReportSeverityChip severity={severity} />
              <BugReportStatusChip status={status} />
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" paragraph>
            {truncateText(description || "")}
          </Typography>

          <Box sx={{ mb: 2 }}>
            {environment && (
              <Typography variant="body2" color="text.secondary" paragraph>
                Environment: {environment}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              Project:{" "}
              <Button
                variant="text"
                onClick={handleNavigateToProject}
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
            {reporter && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt={`${reporter.firstName} ${reporter.lastName}`}
                  src={"https://via.placeholder.com/100"}
                  sx={{ mr: 2 }}
                />
                <Typography variant="subtitle1">
                  {`${reporter.firstName} ${reporter.lastName}`}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                onClick={handleNavigateToBugReport}
                sx={{ fontWeight: "bold", padding: "8px 16px", height: "42px" }}
                size="large"
              >
                View Bug Report
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 2, borderTop: "1px solid #e0e0e0", pt: 1 }}>
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
  }
);

export default BugReportCard;
