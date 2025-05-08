import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../services/api.service";
import { PaginatedResponse } from "../models/pagination";
import { AuthorityName } from "../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../utils/auth.utils";
import { useAuth } from "../contexts/AuthContext";
import { useProjectsQuery } from "./ProjectQuery";
import { TestCaseResponse } from "../models/testcase/TestCaseResponse";

export const useTestCasesQuery = () => {
  const queryClient = useQueryClient();
  const { user, isUserLoading } = useAuth();
  const authorities = getAutoritiesFromToken();

  const isAdmin = authorities.includes(AuthorityName.ADMIN);
  const isTester = authorities.includes(AuthorityName.TESTER);
  const isMentor = authorities.includes(AuthorityName.MENTOR);

  const { projects, isLoading: isProjectsLoading } = useProjectsQuery();
  const projectIds =
    isMentor && !isProjectsLoading ? projects.map((p) => p.id) : [];

  const shouldFetchTestCases =
    !!user &&
    !isUserLoading &&
    (isAdmin || isTester || (isMentor && !isProjectsLoading));

  const { data, isLoading } = useQuery<
    PaginatedResponse<TestCaseResponse, "testCases">
  >({
    queryKey: ["testCases", user?.id, isAdmin, isTester, projectIds],
    enabled: shouldFetchTestCases,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
    queryFn: async () => {
      if (!user) {
        return emptyTestCasesResponse();
      }

      if (isAdmin) {
        const response = await API.testCases.getAll();
        return response.data;
      }

      if (isTester) {
        const response = await API.testCases.getAll({ authorId: user.id });
        return response.data;
      }

      if (isMentor) {
        if (!projectIds || projectIds.length === 0) {
          return emptyTestCasesResponse();
        }
        const response = await API.testCases.getAll({ projectIds });
        return response.data;
      }

      return emptyTestCasesResponse();
    },
  });

  const testCases = data?._embedded?.testCases ?? [];
  const totalElements = data?.page?.totalElements ?? 0;
  const totalPages = data?.page?.totalPages ?? 0;

  const addTestCase = (newTestCase: TestCaseResponse) => {
    queryClient.setQueryData<PaginatedResponse<TestCaseResponse, "testCases">>(
      ["testCases", user?.id, isAdmin, isTester, projectIds],
      (old) => {
        if (!old) {
          return {
            _embedded: { testCases: [newTestCase] },
            page: {
              totalElements: 1,
              totalPages: 1,
              size: 1,
              number: 0,
            },
            _links: { self: { href: "/test-cases" } },
          };
        }

        return {
          ...old,
          _embedded: {
            testCases: [...old._embedded.testCases, newTestCase],
          },
          page: {
            ...old.page,
            totalElements: old.page.totalElements + 1,
          },
          _links: old._links ?? { self: { href: "/test-cases" } },
        };
      }
    );
  };

  return {
    testCases,
    isLoading,
    totalElements,
    totalPages,
    addTestCase,
  };
};

function emptyTestCasesResponse(): PaginatedResponse<
  TestCaseResponse,
  "testCases"
> {
  return {
    _embedded: { testCases: [] },
    page: {
      totalElements: 0,
      totalPages: 0,
      size: 0,
      number: 0,
    },
    _links: { self: { href: "/test-cases" } },
  };
}
