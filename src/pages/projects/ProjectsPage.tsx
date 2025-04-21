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
import { formatEnumWithoutLowerUnderline } from "../../utils/format.utils";
import { AuthorityName } from "../../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../../utils/auth.utils";

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
        Projects
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
            placeholder="Search projects by name or description..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FormControl sx={{ minWidth: 200 }} size="medium">
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={status}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="">All</MenuItem>
              {Object.values(ProjectStatus).map((statusVal) => (
                <MenuItem key={statusVal} value={statusVal}>
                  {formatEnumWithoutLowerUnderline(statusVal)}
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
            Create New
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
              <Typography variant="h6">No projects found</Typography>
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
