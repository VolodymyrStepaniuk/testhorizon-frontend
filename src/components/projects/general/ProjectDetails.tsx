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
import { ProjectResponse } from "../../../models/project/ProjectResponse";
import { formatDate } from "../../../utils/format.utils";

interface ProjectDetailsProps {
  project: ProjectResponse;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
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
          Project Details
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Owner
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt={`${project.owner.firstName} ${project.owner.lastName}`}
                src={"https://via.placeholder.com/100"}
                sx={{ width: 24, height: 24, mr: 1 }}
              />
              <Typography variant="body2">
                {project.owner.firstName} {project.owner.lastName}
              </Typography>
            </Box>
          </Grid>

          {project.githubUrl && (
            <>
              <Grid item xs={4}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <GitHub fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    GitHub
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body2"
                    component={Link}
                    href={project.githubUrl}
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
                    Repository Link
                  </Typography>
                </Box>
              </Grid>
            </>
          )}

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Created
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">
              {formatDate(project.createdAt)}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Last updated
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">
              {formatDate(project.updatedAt)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProjectDetails;
