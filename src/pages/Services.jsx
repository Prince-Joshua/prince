import { Box, Flex, Grid, VStack, Text, Heading, Link } from "@chakra-ui/react";

import Hero from "@/components/custom/Hero";
import { tokens } from "@/utils/tokens";
import Services from "@/sections/servicesPage/Services";
import Process from "@/sections/servicesPage/Process";
import StatsBar from "@/sections/servicesPage/StatsBar";
import Banner from "@/sections/servicesPage/Banner";

/* ─────────────────────────────────────────
   FOOTER  (mirrors App.jsx)
───────────────────────────────────────── */
const Footer = () => (
  <Box
    as="footer"
    px={{ base: "24px", md: "60px" }}
    py="50px"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    flexWrap="wrap"
    gap="20px"
  >
    <Text fontFamily="heading" fontSize="16px" fontWeight="700">
      Prince{" "}
      <Box as="span" color="brand.accent">
        Joshua
      </Box>
    </Text>
    <Text fontSize="11px" color="brand.muted">
      Full-Stack Engineer · MERN Stack · Built with precision · 2024
    </Text>
  </Box>
);

/* ─────────────────────────────────────────
   NOISE OVERLAY
───────────────────────────────────────── */
const NoiseOverlay = () => (
  <Box
    position="fixed"
    inset="0"
    backgroundImage={`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`}
    pointerEvents="none"
    zIndex="1000"
    opacity="0.6"
  />
);

const ServicesPage = () => {
  return (
    <Box>
      <NoiseOverlay />
      <Hero
        headline={{ solid: "What I", ghost: "Can Do", accent: "For You" }}
        subtitle="Focused engagements. Honest timelines. Systems that don't embarrass you six months after launch."
        badge="Available for new engagements"
        accentColor={tokens.accent4}
        minH="60vh"
        ctas={[
          { label: "Start a Project", href: "/contact" },
          { label: "See Case Study", href: "/case-studies" },
        ]}
      />
      <StatsBar />
      <Services />
      <Process />
      <Banner />
      <Footer />
    </Box>
  );
};

export default ServicesPage;
