import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import { ProjectResponse } from "../../models/project/ProjectResponse";
import { useParams } from "react-router-dom";
import { API } from "../../services/api.service";
import Comments from "../../components/comments/Comments";
import { CommentEntityType } from "../../models/enum/commentEntityTypes";
import ProjectHeader from "../../components/projects/general/header/ProjectHeader";
import ProjectDetails from "../../components/projects/general/ProjectDetails";
import ProjectTabs from "../../components/projects/general/tabs/ProjectTabs";
import { getAutoritiesFromToken } from "../../utils/auth.utils";
import { AuthorityName } from "../../models/enum/authorityNames";
import { useTranslation } from "react-i18next";

const ProjectDetailsPage: React.FC = () => {
  const [project, setProject] = useState<ProjectResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();

  const authorities = getAutoritiesFromToken();
  const currentUserRole = authorities[0] as AuthorityName;
  const isAdmin = currentUserRole === AuthorityName.ADMIN;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await API.users.getMe();
        setUser(userResponse.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  const isProjectOwner = (project: ProjectResponse) => {
    return user?.id === project.owner.id;
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);

        if (!id || isNaN(Number(id))) {
          setError("Invalid project ID");
          setLoading(false);
          return;
        }

        const projectResponse = await API.projects.getById(Number(id));
        setProject(projectResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project data:", err);
        setError(t("projectPages.details.loadError"));
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id, t]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          {t("projectPages.details.loading")}
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!project) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">{t("projectPages.details.notFound")}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <ProjectHeader
        project={project}
        isAdmin={isAdmin}
        isOwner={user ? isProjectOwner(project) : false}
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={9}>
          <ProjectTabs
            project={project}
            isAdmin={isAdmin}
            isOwner={user ? isProjectOwner(project) : false}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <ProjectDetails project={project} />
        </Grid>
      </Grid>

      <Comments entityId={Number(id)} entityType={CommentEntityType.PROJECT} />
    </Box>
  );
};

export default ProjectDetailsPage;
