import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin/SignIn.tsx";
import SignUp from "./pages/signup/SignUp.tsx";
import AppTheme from "./theme/AppTheme.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import Main from "./pages/main/Main.tsx";
import Home from "./pages/home/Home.tsx";
import ForgotPasswordCode from "./components/signin/ForgotPasswordCode";
import GlobalNavigationGuard from "./components/guards/GlobalNavigationGuard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ProjectsPage from "./pages/projects/ProjectsPage.tsx";
import NotFoundPage from "./pages/notfound/NotFoundPage.tsx";
import TestsPage from "./pages/tests/TestsPage.tsx";
import TestCasesPage from "./pages/testcases/TestCasesPage.tsx";
import BugReportsPage from "./pages/bugreports/BugReportsPage.tsx";
import ProfilePage from "./pages/user/ProfilePage.tsx";
import TestCaseCreatePage from "./pages/testcases/TestCaseCreatePage.tsx";
import TestCreatePage from "./pages/tests/TestCreatePage.tsx";
import ProjectCreatePage from "./pages/projects/ProjectCreatePage.tsx";
import BugReportCreatePage from "./pages/bugreports/BugReportCreatePage.tsx";
import RatingPage from "./pages/user/rating/RatingPage.tsx";
import HelpAndSupport from "./pages/user/HelpAndSupport.tsx";
import ProjectPage from "./pages/projects/ProjectPage.tsx";
import BugReportPage from "./pages/bugreports/BugReportPage.tsx";
import TestPage from "./pages/tests/TestPage.tsx";
import TestCasePage from "./pages/testcases/TestCasePage.tsx";
import UserAdminPanel from "./pages/user/panel/UserAdminPanel.tsx";
import FeedbackPage from "./pages/feedbacks/FeedbackPage.tsx";
import Layout from "./components/layout/Layout.tsx";
import Blog from "./pages/blog/PostsPage.tsx";
import "./i18n";
import PostCreatePage from "./pages/blog/PostCreatePage.tsx";
import PostPage from "./pages/blog/PostPage.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <AuthProvider>
          <BrowserRouter>
            <GlobalNavigationGuard>
              <Layout>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route
                    path="/reset-password"
                    element={<ForgotPasswordCode />}
                  />
                  <Route path="/home" element={<Home />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/test-cases" element={<TestCasesPage />} />
                  <Route path="/tests" element={<TestsPage />} />
                  <Route path="/bug-reports" element={<BugReportsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/users" element={<UserAdminPanel />} />
                  <Route path="/feedbacks" element={<FeedbackPage />} />
                  <Route path="/rating" element={<RatingPage />} />
                  <Route path="/help" element={<HelpAndSupport />} />
                  <Route
                    path="/test-cases/new"
                    element={<TestCaseCreatePage />}
                  />
                  <Route path="/tests/new" element={<TestCreatePage />} />
                  <Route path="/projects/new" element={<ProjectCreatePage />} />
                  <Route
                    path="/bug-reports/new"
                    element={<BugReportCreatePage />}
                  />
                  <Route path="/blog/new" element={<PostCreatePage />} />
                  <Route path="/projects/:id" element={<ProjectPage />} />
                  <Route path="/bug-reports/:id" element={<BugReportPage />} />
                  <Route path="/tests/:id" element={<TestPage />} />
                  <Route path="/test-cases/:id" element={<TestCasePage />} />
                  <Route path="/blog/:id" element={<PostPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            </GlobalNavigationGuard>
          </BrowserRouter>
        </AuthProvider>
      </AppTheme>
    </QueryClientProvider>
  );
}

export default App;
