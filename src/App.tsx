import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
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

const queryClient = new QueryClient();

function App() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <GlobalNavigationGuard>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route
                  path="/reset-password"
                  element={<ForgotPasswordCode />}
                />
                <Route path="/home" element={<Home />} />
              </Routes>
            </GlobalNavigationGuard>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </AppTheme>
  );
}

export default App;
