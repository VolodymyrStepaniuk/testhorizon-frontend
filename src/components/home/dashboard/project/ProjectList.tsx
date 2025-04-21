import React from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { useProjectsQuery } from "../../../../queries/ProjectQuery";

const ProjectList: React.FC = () => {
  const { projects, isLoading } = useProjectsQuery();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          py: 2,
          "&::-webkit-scrollbar": {
            height: 8,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "#555",
            },
          },
        }}
      >
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress />
          </Box>
        ) : projects && projects.length > 0 ? (
          <Box sx={{ display: "flex", gap: 2, minWidth: "min-content" }}>
            {projects.map((project) => (
              <Box key={project.id} sx={{ minWidth: 350 }}>
                <ProjectCard {...project} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box>No projects found</Box>
        )}
      </Box>
    </Container>
  );
};

export default ProjectList;
