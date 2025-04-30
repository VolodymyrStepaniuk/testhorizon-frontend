import { useLocation, matchPath } from "react-router-dom";

export const useIs404 = (): boolean => {
  const location = useLocation();

  // Check if the current path matches any valid routes
  const validRoutes = [
    "/",
    "/sign-in",
    "/sign-up",
    "/reset-password",
    "/home",
    "/projects",
    "/test-cases",
    "/tests",
    "/bug-reports",
    "/profile",
    "/blog",
    "/users",
    "/feedbacks",
    "/rating",
    "/help",
    "/test-cases/new",
    "/tests/new",
    "/projects/new",
    "/bug-reports/new",
    "/blog/new",
  ];

  // Also check for dynamic route patterns
  const dynamicPatterns = [
    "/projects/:id",
    "/bug-reports/:id",
    "/tests/:id",
    "/test-cases/:id",
    "/blog/:id",
  ];

  // Check if the path is a valid static route
  const isValidStaticRoute = validRoutes.includes(location.pathname);

  // Check if the path matches any dynamic route pattern
  const matchesDynamicRoute = dynamicPatterns.some(
    (pattern) => matchPath(pattern, location.pathname) !== null
  );

  // If it's neither a valid static route nor matches a dynamic pattern, it's a 404
  return !(isValidStaticRoute || matchesDynamicRoute);
};
