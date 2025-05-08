import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  CircularProgress,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import ProjectCard from "../../components/projects/ProjectCard";
import { ProjectResponse } from "../../models/project/ProjectResponse";
import { API } from "../../services/api.service";
import { ProjectStatus } from "../../models/enum/projectStatuses";
import { AuthorityName } from "../../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../../utils/auth.utils";
import { useTranslation } from "react-i18next";
import { translateEnum } from "../../utils/i18n.utils";

const ProjectsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const projectsPerPage = 5;
  const [status, setStatus] = useState<string>("");
  const authorities = getAutoritiesFromToken();
  const currentUserRole = authorities[0] as AuthorityName;
  const { t } = useTranslation();

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const response = await API.projects.getAll({
          page: page - 1,
          size: projectsPerPage,
          title: searchTerm || undefined,
          status: (status as ProjectStatus) || undefined,
        });
        setProjects(response.data._embedded?.projects || []);
        setTotalItems(response.data.page.totalElements);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [page, searchTerm, status]);

  const totalPages = Math.ceil(totalItems / projectsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
    setPage(1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{ mb: 6, fontWeight: "bold" }}
      >
        {t("projectPages.list.title")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={t("projectPages.list.search")}
            value={searchTerm}
            onChange={handleSearch}
          />
          <FormControl sx={{ minWidth: 200 }} size="medium">
            <InputLabel id="status-select-label">
              {t("projectPages.list.status")}
            </InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={status}
              label={t("projectPages.list.status")}
              onChange={handleStatusChange}
            >
              <MenuItem value="">{t("projectPages.list.all")}</MenuItem>
              {Object.values(ProjectStatus).map((statusVal) => (
                <MenuItem key={statusVal} value={statusVal}>
                  {translateEnum("enums.project.status", statusVal)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {currentUserRole !== AuthorityName.TESTER && (
          <Button
            variant="contained"
            color="primary"
            href="/projects/new"
            sx={{ ml: 2, whiteSpace: "nowrap" }}
          >
            {t("projectPages.list.createNew")}
          </Button>
        )}
      </Box>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {projects.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="50vh"
            >
              <Typography variant="h6">
                {t("projectPages.list.noProjects")}
              </Typography>
            </Box>
          ) : (
            <Box>
              {projects.map((project) => (
                <Box key={project.id} sx={{ minWidth: 350 }}>
                  <ProjectCard {...project} />
                </Box>
              ))}
            </Box>
          )}
          {projects.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default ProjectsPage;
