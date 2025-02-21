import Home from "./pages/Home/Home.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
import SignIn from "./pages/Signin/SignIn.tsx";
import SignUp from "./pages/Signup/SignUp.tsx";
import AppTheme from "./theme/AppTheme.tsx";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AppTheme>
  );
}

export default App;
