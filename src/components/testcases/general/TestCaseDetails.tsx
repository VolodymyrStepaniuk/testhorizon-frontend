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

interface TestCaseDetailsProps {
  testCase: TestCaseResponse;
}

const TestCaseDetails: React.FC<TestCaseDetailsProps> = ({ testCase }) => {
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
          Test Case Details
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Author
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
              Project
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
              Created
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">
              {formatDate(testCase.createdAt)}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Last updated
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
