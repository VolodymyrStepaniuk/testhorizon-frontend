import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface GlobalNavigationGuardProps {
  children: React.ReactNode;
}

export default function GlobalNavigationGuard({
  children,
}: GlobalNavigationGuardProps) {
  const location = useLocation();
  const { isAuth } = useAuth();

  const publicRoutes = ["/sign-in", "/sign-up", "/reset-password", "/"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  if (!isAuth && !isPublicRoute) {
    return <Navigate to="/sign-in" replace />;
  }

  if (isAuth && isPublicRoute && location.pathname !== "/") {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
