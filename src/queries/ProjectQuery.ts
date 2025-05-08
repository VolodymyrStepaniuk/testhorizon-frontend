import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../services/api.service";
import { ProjectResponse } from "../models/project/ProjectResponse";
import { AuthorityName } from "../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../utils/auth.utils";
import { PaginatedResponse } from "../models/pagination";
import { useAuth } from "../contexts/AuthContext";

export const useProjectsQuery = () => {
  const queryClient = useQueryClient();
  const { user, isUserLoading } = useAuth();
  const authorities = getAutoritiesFromToken();

  const isAdmin = authorities.includes(AuthorityName.ADMIN);
  const isMentor = authorities.includes(AuthorityName.MENTOR);
  const shouldFetchProjects = (isAdmin || isMentor) && user?.id;

  const { data, isLoading } = useQuery<
    PaginatedResponse<ProjectResponse, "projects">
  >({
    queryKey: ["projects", user?.id, isAdmin],
    queryFn: async () => {
      if (!user?.id) {
        return {
          _embedded: { projects: [] },
          page: {
            totalElements: 0,
            totalPages: 0,
            size: 0,
            number: 0,
          },
          _links: { self: { href: "/projects" } },
        };
      }

      const response = await API.projects.getAll({
        ownerId: isAdmin ? undefined : user.id,
      });
      return response.data;
    },
    enabled: Boolean(shouldFetchProjects && !isUserLoading),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
  });

  const addProject = (newProject: ProjectResponse) => {
    queryClient.setQueryData<PaginatedResponse<ProjectResponse, "projects">>(
      ["projects"],
      (old) => {
        if (!old) {
          return {
            _embedded: {
              projects: [newProject],
            },
            page: {
              totalElements: 1,
              totalPages: 1,
              size: 1,
              number: 0,
            },
            _links: { self: { href: "/projects" } },
          };
        }

        return {
          ...old,
          _embedded: {
            projects: [...old._embedded.projects, newProject],
          },
          page: {
            ...old.page,
            totalElements: old.page.totalElements + 1,
          },
          _links: old._links ?? { self: { href: "/projects" } },
        };
      }
    );
  };

  return {
    projects: data?._embedded?.projects ?? [],
    isLoading,
    addProject,
    totalElements: data?.page?.totalElements ?? 0,
    totalPages: data?.page?.totalPages ?? 0,
  };
};
