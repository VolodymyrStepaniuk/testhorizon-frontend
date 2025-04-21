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
import { BugReportResponse } from "../../../models/bugreport/BugReportResponse";
import { formatDate } from "../../../utils/format.utils";

interface BugReportDetailsProps {
  bugReport: BugReportResponse;
}

const BugReportDetails: React.FC<BugReportDetailsProps> = ({ bugReport }) => {
  return (
    <Card
      elevation={0}
      variant="outlined"
      sx={{
        height: "auto",
        maxHeight: "fit-content",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Bug Report Details
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Reporter
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt={`${bugReport.reporter.firstName} ${bugReport.reporter.lastName}`}
                src={"https://via.placeholder.com/100"}
                sx={{ width: 24, height: 24, mr: 1 }}
              />
              <Typography variant="body2">
                {bugReport.reporter.firstName} {bugReport.reporter.lastName}
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
              href={`/projects/${bugReport.project.id}`}
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              {bugReport.project.title}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Created
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">
              {formatDate(bugReport.createdAt)}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Last updated
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">
              {formatDate(bugReport.updatedAt)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BugReportDetails;
