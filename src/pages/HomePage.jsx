import Hero from "@/components/custom/Hero";
import SubNav from "@/components/custom/SubNav";
import About from "@/sections/homePage/About";
import CaseStudy from "@/sections/homePage/CaseStudy";
import Contact from "@/sections/homePage/Contact";
import Footer from "@/sections/homePage/Footer";

import Projects from "@/sections/homePage/Projects";
import Skills from "@/sections/homePage/Skills";
import { Box } from "@chakra-ui/react";
import React from "react";

const HomePage = () => {
  return (
    <Box maxW={"1520px"} minH={"100vh"}>
      <SubNav
        subLinks={[
          { label: "About", id: "about" },
          { label: "Skills", id: "skills" },
          { label: "Contact", id: "contact" },
        ]}
      />
      <Hero
        headline={{ solid: "Prince", ghost: "Joshua", accent: "Engineer" }}
        subtitle="Full-Stack engineer specialising in the MERN stack — building production-grade systems with strong architecture, clean APIs, and interfaces that hold up at scale."
        badge="Available for opportunities"
        ctas={[
          { label: "View Case Study", path: "/case-studies" },
          { label: "See Projects", path: "/projects" },
        ]}
        stats={[
          { label: "Stack", value: "MERN · Node · React" },
          { label: "Focus", value: "Full-Stack · Backend Arch" },
          { label: "Market", value: "Global · Nigeria" },
          { label: "Status", value: "Open to Hire" },
        ]}
      />

      {[About, Skills, Projects, CaseStudy, Contact].map((Section, i) => (
        <Box key={i} maxW="1100px" mx="auto" px={{ base: "24px", md: "60px" }}>
          <Section />
        </Box>
      ))}
      <Footer />
    </Box>
  );
};

export default HomePage;
