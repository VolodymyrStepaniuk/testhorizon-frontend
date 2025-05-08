import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../services/api.service";
import { TestResponse } from "../models/test/TestResponse";
import { PaginatedResponse } from "../models/pagination";
import { AuthorityName } from "../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../utils/auth.utils";
import { useAuth } from "../contexts/AuthContext";
import { useProjectsQuery } from "./ProjectQuery";

export const useTestsQuery = () => {
  const queryClient = useQueryClient();
  const { user, isUserLoading } = useAuth();
  const authorities = getAutoritiesFromToken();

  const isAdmin = authorities.includes(AuthorityName.ADMIN);
  const isTester = authorities.includes(AuthorityName.TESTER);
  const isMentor = authorities.includes(AuthorityName.MENTOR);

  const { projects, isLoading: isProjectsLoading } = useProjectsQuery();
  const projectIds =
    isMentor && !isProjectsLoading ? projects.map((p) => p.id) : [];

  const shouldFetchTests =
    !!user &&
    !isUserLoading &&
    (isAdmin || isTester || (isMentor && !isProjectsLoading));

  const { data, isLoading } = useQuery<
    PaginatedResponse<TestResponse, "tests">
  >({
    queryKey: ["tests", user?.id, isAdmin, isTester, projectIds],
    enabled: shouldFetchTests,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
    queryFn: async () => {
      if (!user) {
        return emptyTestsResponse();
      }

      if (isAdmin) {
        const response = await API.tests.getAll();
        return response.data;
      }

      if (isTester) {
        const response = await API.tests.getAll({ authorId: user.id });
        return response.data;
      }

      if (isMentor) {
        if (!projectIds || projectIds.length === 0) {
          return emptyTestsResponse();
        }
        const response = await API.tests.getAll({ projectIds: projectIds });
        return response.data;
      }

      return emptyTestsResponse();
    },
  });

  const tests = data?._embedded?.tests ?? [];
  const totalElements = data?.page?.totalElements ?? 0;
  const totalPages = data?.page?.totalPages ?? 0;

  const addTest = (newTest: TestResponse) => {
    queryClient.setQueryData<PaginatedResponse<TestResponse, "tests">>(
      ["tests", user?.id, isAdmin, isTester, projectIds],
      (old) => {
        if (!old) {
          return {
            _embedded: { tests: [newTest] },
            page: {
              totalElements: 1,
              totalPages: 1,
              size: 1,
              number: 0,
            },
            _links: { self: { href: "/tests" } },
          };
        }

        return {
          ...old,
          _embedded: {
            tests: [...old._embedded.tests, newTest],
          },
          page: {
            ...old.page,
            totalElements: old.page.totalElements + 1,
          },
          _links: old._links ?? { self: { href: "/tests" } },
        };
      }
    );
  };

  return {
    tests,
    isLoading,
    totalElements,
    totalPages,
    addTest,
  };
};

function emptyTestsResponse(): PaginatedResponse<TestResponse, "tests"> {
  return {
    _embedded: { tests: [] },
    page: {
      totalElements: 0,
      totalPages: 0,
      size: 0,
      number: 0,
    },
    _links: { self: { href: "/tests" } },
  };
}
