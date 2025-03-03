import React from "react";
import Hero from "../../components/home/Hero";
import LogoCollection from "../../components/home/LogoCollection";
import Divider from "@mui/material/Divider";
import Testimonials from "../../components/home/Testimonials";
import Highlights from "../../components/home/Highlights";
import FAQ from "../../components/home/FAQ";
import About from "../../components/home/About";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <LogoCollection />
      <Divider sx={{ backgroundColor: "hsl(220deg 20% 25% / 60%)" }} />
      <About />
      <Divider sx={{ backgroundColor: "hsl(220deg 20% 25% / 60%)" }} />
      <Testimonials />
      <Divider sx={{ backgroundColor: "hsl(220deg 20% 25% / 60%)" }} />
      <Highlights />
      <Divider sx={{ backgroundColor: "hsl(220deg 20% 25% / 60%)" }} />
      <FAQ />
    </>
  );
};

export default Home;
