// ProjectItem.tsx
import React from "react";
import { Typography, Box } from "@mui/material";
import { ProjectResponse } from "../../../../models/project/ProjectResponse";

interface ProjectItemProps {
  project: ProjectResponse;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        {project.title}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {project.description}
      </Typography>
    </Box>
  );
};

export default ProjectItem;
