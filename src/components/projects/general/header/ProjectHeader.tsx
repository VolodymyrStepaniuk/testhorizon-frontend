import React, { useState } from "react";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { ProjectResponse } from "../../../../models/project/ProjectResponse";
import ProjectSettingsMenu from "../../../universal/menu/SettingsMenu";
import DeleteProjectDialog from "./DeleteProjectDialog";
import UpdateProjectDialog from "./UpdateProjectDialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { ProjectStatusChip } from "../../../../theme/customization/chips";
import { ExportEntityType } from "../../../../models/enum/exportEntityTypes";
import { useTranslation } from "react-i18next";
import ExportButton from "../../../universal/file/ExportButton";

interface ProjectHeaderProps {
  project: ProjectResponse;
  isAdmin: boolean;
  isOwner: boolean;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  isAdmin,
  isOwner,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] =
    useState<ProjectResponse>(project);
  const canModifyProject = isAdmin || isOwner;
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setUpdateDialogOpen(true);
    handleCloseMenu();
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
    handleCloseMenu();
  };

  const handleProjectUpdated = (updatedProject: ProjectResponse) => {
    setCurrentProject(updatedProject);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        variant="text"
        sx={{ mb: 2 }}
      >
        {t("projects.header.back")}
      </Button>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {currentProject.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <ProjectStatusChip status={currentProject.status} />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", md: "flex-end" },
            gap: 1,
          }}
        >
          <ExportButton
            entityType={ExportEntityType.PROJECT}
            entityId={currentProject.id}
          />

          {canModifyProject && (
            <>
              <Button
                variant="outlined"
                startIcon={<Settings />}
                onClick={handleSettingsClick}
              >
                {t("projects.header.settings")}
              </Button>
              <ProjectSettingsMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              <DeleteProjectDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                projectId={currentProject.id}
                projectTitle={currentProject.title}
              />

              <UpdateProjectDialog
                open={updateDialogOpen}
                onClose={() => setUpdateDialogOpen(false)}
                project={currentProject}
                onProjectUpdated={handleProjectUpdated}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProjectHeader;
