import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Avatar,
  Link,
} from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { TestResponse } from "../../../models/test/TestResponse";
import { formatDate } from "../../../utils/format.utils";
import { useTranslation } from "react-i18next";

interface TestDetailsProps {
  test: TestResponse;
}

const TestDetails: React.FC<TestDetailsProps> = ({ test }) => {
  const { t } = useTranslation();

  return (
    <Card
      variant="outlined"
      sx={{
        height: "auto",
        maxHeight: "fit-content",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {t("tests.details.title")}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              {t("tests.details.author")}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt={`${test.author.firstName} ${test.author.lastName}`}
                src={"https://via.placeholder.com/100"}
                sx={{ width: 24, height: 24, mr: 1 }}
              />
              <Typography variant="body2">
                {test.author.firstName} {test.author.lastName}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              {t("tests.details.project")}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="body2"
              component={Link}
              href={`/projects/${test.project.id}`}
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              {test.project.title}
            </Typography>
          </Grid>

          {test.testCase && (
            <>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  {t("tests.details.testCase")}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="body2"
                  component={Link}
                  href={`/test-cases/${test.testCase.id}`}
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  {test.testCase.title}
                </Typography>
              </Grid>
            </>
          )}

          {test.githubUrl && (
            <>
              <Grid item xs={4}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <GitHub fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {t("tests.details.github")}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body2"
                    component={Link}
                    href={test.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "180px",
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
                  >
                    {t("tests.details.repositoryLink")}
                  </Typography>
                </Box>
              </Grid>
            </>
          )}

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              {t("tests.details.created")}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">
              {formatDate(test.createdAt)}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              {t("tests.details.lastUpdated")}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">
              {formatDate(test.updatedAt)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TestDetails;
