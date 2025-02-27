const API_CONFIG = {
  development: {
    baseURL: "http://localhost:3010",
    endpoints: {
      users: "/users",
      testCases: "/test-cases",
      tests: "/tests",
      auth: "/auth",
      ratings: "/ratings",
      projects: "/projects",
      comments: "/comments",
      bugReports: "/bug-reports",
      files: "/files",
    },
  },
  production: {
    baseURL: "https://your-production-api.com/api",
    endpoints: {
      users: "/users",
      testCases: "/test-cases",
      tests: "/tests",
      auth: "/auth",
      ratings: "/ratings",
      projects: "/projects",
      comments: "/comments",
      bugReports: "/bug-reports",
      files: "/files",
    },
  },
};

const environment = process.env.NODE_ENV || "development";
export const apiConfig = API_CONFIG[environment as keyof typeof API_CONFIG];
