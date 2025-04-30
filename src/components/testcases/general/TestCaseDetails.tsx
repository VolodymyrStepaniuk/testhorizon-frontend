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
import { TestCaseResponse } from "../../../models/testcase/TestCaseResponse";
import { formatDate } from "../../../utils/format.utils";
import { useTranslation } from "react-i18next";

interface TestCaseDetailsProps {
  testCase: TestCaseResponse;
}

const TestCaseDetails: React.FC<TestCaseDetailsProps> = ({ testCase }) => {
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
          {t("testCases.details.title")}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              {t("testCases.details.author")}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt={`${testCase.author.firstName} ${testCase.author.lastName}`}
                src={"https://via.placeholder.com/100"}
                sx={{ width: 24, height: 24, mr: 1 }}
              />
              <Typography variant="body2">
                {testCase.author.firstName} {testCase.author.lastName}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              {t("testCases.details.project")}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="body2"
              component={Link}
              href={`/projects/${testCase.project.id}`}
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              {testCase.project.title}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              {t("testCases.details.created")}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">
              {formatDate(testCase.createdAt)}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              {t("testCases.details.lastUpdated")}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">
              {formatDate(testCase.updatedAt)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TestCaseDetails;
