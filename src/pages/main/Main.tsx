import React from "react";
import Hero from "../../components/main/Hero";
import LogoCollection from "../../components/main/LogoCollection";
import Divider from "@mui/material/Divider";
import Testimonials from "../../components/main/Testimonials";
import Highlights from "../../components/main/highlights/Highlights";
import FAQ from "../../components/main/FAQ";
import About from "../../components/main/about/About";
import Header from "../../components/universal/Header";
import Footer from "../../components/universal/Footer";

const Main: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <LogoCollection />
      <Divider />
      <About />
      <Divider />
      <Testimonials />
      <Divider />
      <Highlights />
      <Divider />
      <FAQ />
      <Divider />
      <Footer />
    </>
  );
};

export default Main;
