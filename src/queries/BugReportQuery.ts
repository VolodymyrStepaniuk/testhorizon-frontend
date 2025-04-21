import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../services/api.service";
import { PaginatedResponse } from "../models/pagination";
import { AuthorityName } from "../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../utils/auth.utils";
import { useAuth } from "../contexts/AuthContext";
import { BugReportResponse } from "../models/bugreport/BugReportResponse";
import { useProjectsQuery } from "./ProjectQuery";

export const useBugReportsQuery = () => {
  const queryClient = useQueryClient();
  const { user, isUserLoading } = useAuth();
  const authorities = getAutoritiesFromToken();

  const isAdmin = authorities.includes(AuthorityName.ADMIN);
  const isTester = authorities.includes(AuthorityName.TESTER);
  const isDeveloper = authorities.includes(AuthorityName.DEVELOPER);

  const { projects, isLoading: isProjectsLoading } = useProjectsQuery();
  const projectIds =
    isDeveloper && !isProjectsLoading ? projects.map((p) => p.id) : [];

  const shouldFetchBugReports =
    !!user &&
    !isUserLoading &&
    (isAdmin || isTester || (isDeveloper && !isProjectsLoading));

  const { data, isLoading } = useQuery<
    PaginatedResponse<BugReportResponse, "bugReports">
  >({
    queryKey: ["bugReports", user?.id, isAdmin, isTester, projectIds],
    enabled: shouldFetchBugReports,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
    queryFn: async () => {
      if (!user) {
        return emptyBugReportsResponse();
      }

      if (isAdmin) {
        const response = await API.bugReports.getAll();
        return response.data;
      }

      if (isTester) {
        const response = await API.bugReports.getAll({ reporterId: user.id });
        return response.data;
      }

      if (isDeveloper) {
        if (!projectIds || projectIds.length === 0) {
          return emptyBugReportsResponse();
        }
        const response = await API.bugReports.getAll({ projectIds });
        return response.data;
      }

      return emptyBugReportsResponse();
    },
  });

  const bugReports = data?._embedded?.bugReports ?? [];
  const totalElements = data?.page?.totalElements ?? 0;
  const totalPages = data?.page?.totalPages ?? 0;

  const addBugReport = (newBugReport: BugReportResponse) => {
    queryClient.setQueryData<
      PaginatedResponse<BugReportResponse, "bugReports">
    >(["bugReports", user?.id, isAdmin, isTester, projectIds], (old) => {
      if (!old) {
        return {
          _embedded: { bugReports: [newBugReport] },
          page: {
            totalElements: 1,
            totalPages: 1,
            size: 1,
            number: 0,
          },
          _links: { self: { href: "/bug-reports" } },
        };
      }

      return {
        ...old,
        _embedded: {
          bugReports: [...old._embedded.bugReports, newBugReport],
        },
        page: {
          ...old.page,
          totalElements: old.page.totalElements + 1,
        },
        _links: old._links ?? { self: { href: "/bug-reports" } },
      };
    });
  };

  return {
    bugReports,
    isLoading,
    totalElements,
    totalPages,
    addBugReport,
  };
};

function emptyBugReportsResponse(): PaginatedResponse<
  BugReportResponse,
  "bugReports"
> {
  return {
    _embedded: { bugReports: [] },
    page: {
      totalElements: 0,
      totalPages: 0,
      size: 0,
      number: 0,
    },
    _links: { self: { href: "/bug-reports" } },
  };
}
