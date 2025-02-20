import Header from "./components/universal/Header/Header.tsx";
import Footer from "./components/universal/Footer/Footer.tsx";
import Home from "./pages/Home/Home.tsx";
import Divider from "@mui/material/Divider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Divider sx={{ backgroundColor: "hsl(220deg 20% 25% / 60%)" }} />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
