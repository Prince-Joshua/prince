import Hero from "@/components/custom/Hero";
import NavBar from "@/components/custom/NavBar";
import SecLabel from "@/components/custom/SecLabel";
import ComingSoon from "@/sections/allCaseStudiesPage/ComingSoon";
import FeaturedCard from "@/sections/allCaseStudiesPage/FeaturedCard";
import FilterBar from "@/sections/allCaseStudiesPage/FilterBar";
import Footer from "@/sections/allCaseStudiesPage/Footer";

import StudyCard from "@/sections/allCaseStudiesPage/StudyCard";
import { tokens } from "@/utils/tokens";
import { Box, Grid } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const caseStudies = [
  {
    id: "sassyblend-api",
    index: "01",
    featured: true,
    status: "complete",
    type: "Backend Architecture · E-Commerce",
    title: "SassyBlend API",
    subtitle: "A production-grade MERN e-commerce backend",
    description:
      "A full-stack food/restaurant e-commerce platform engineered for financial integrity, database performance, and real-time scalability. Covers Paystack payment pipelines, atomic MongoDB operations, cursor-based pagination, Socket.io foundation, HMAC webhook verification, and a centralised Zod validation layer — designed and built solo.",
    chips: [
      { label: "Solo Project", variant: "y" },
      { label: "Full-Stack", variant: "b" },
      { label: "Production-Ready", variant: "o" },
    ],
    tags: [
      "Node.js",
      "Express",
      "MongoDB",
      "React",
      "Redux Toolkit",
      "Socket.io",
      "Paystack",
      "Cloudinary",
      "Resend",
    ],
    metrics: [
      { label: "Response Time", value: "<100ms" },
      { label: "Ghost Orders", value: "Zero" },
      { label: "Sections", value: "13" },
    ],
    highlights: [
      "Triple-verified Paystack pipeline",
      "Cursor-based pagination at scale",
      "Atomic MongoDB operations",
      "HMAC webhook verification",
    ],
    href: "/case-studies/sassyblend-api",
    // Image placeholder config
    image: {
      aspect: "16/9",
      label: "System Architecture Diagram",
      hint: "1200 × 675px recommended",
    },
  },
  {
    id: "aurum-app",
    index: "02",
    featured: false,
    status: "complete",
    type: "UI/UX · Mobile Design",
    title: "Aurum",
    subtitle: "A luxury finance mobile app interface",
    description:
      "A high-end mobile finance application UI built as a standalone creative exercise. Explores premium dark-mode aesthetics, typography hierarchy, and micro-interaction patterns suited for a wealth management context. Demonstrates the frontend depth behind the full-stack engineering.",
    chips: [
      { label: "UI/UX", variant: "p" },
      { label: "Mobile Design", variant: "b" },
      { label: "React Native", variant: "y" },
    ],
    tags: [
      "React Native",
      "Framer Motion",
      "Typography",
      "Dark UI",
      "Design Systems",
    ],
    metrics: [
      { label: "Platform", value: "Mobile" },
      { label: "Aesthetic", value: "Luxury" },
      { label: "Screens", value: "12+" },
    ],
    highlights: [
      "Pixel-precise layout system",
      "Custom dark-mode palette",
      "Premium typography pairing",
      "Animated micro-interactions",
    ],
    href: "/case-studies/aurum",
    image: {
      aspect: "9/16",
      label: "Mobile App Screens",
      hint: "675 × 1200px recommended · portrait",
    },
  },
  {
    id: "admin-dashboard",
    index: "03",
    featured: false,
    status: "wip",
    type: "Frontend Architecture · Admin",
    title: "Admin Dashboard",
    subtitle: "Full-scale admin panel for the e-commerce platform",
    description:
      "An eight-section admin shell wiring together overview, orders, revenue, cart analytics, security auditing, coupons, support, and notifications. Features an animated sidebar, global search, dark/light mode, and a Redux Toolkit state layer managing cross-cutting concerns across all panels.",
    chips: [
      { label: "Frontend Arch", variant: "b" },
      { label: "React", variant: "y" },
      { label: "Redux", variant: "p" },
    ],
    tags: [
      "React",
      "Chakra UI",
      "Redux Toolkit",
      "Framer Motion",
      "MongoDB",
      "Socket.io",
    ],
    metrics: [
      { label: "Dashboard Pages", value: "8" },
      { label: "Global State", value: "Redux" },
      { label: "Real-Time", value: "Socket.io" },
    ],
    highlights: [
      "Animated sidebar with collapse",
      "Role-based route protection",
      "Cross-panel search system",
      "Bulk action modal patterns",
    ],
    href: "/case-studies/admin-dashboard",
    image: {
      aspect: "16/9",
      label: "Dashboard Screenshot",
      hint: "1440 × 810px recommended",
    },
  },
];

const filterMap = {
  All: () => true,
  Backend: (s) => s.type.toLowerCase().includes("backend"),
  Frontend: (s) =>
    s.type.toLowerCase().includes("frontend") ||
    s.type.toLowerCase().includes("ui"),
  "UI/UX": (s) => s.type.toLowerCase().includes("ui"),
  "Full-Stack": (s) =>
    s.type.toLowerCase().includes("full-stack") ||
    s.type.toLowerCase().includes("e-commerce"),
};

const MotionBox = motion.create(Box);
const AllCaseStudiesPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const featured = caseStudies.find((s) => s.featured);
  const rest = caseStudies.filter((s) => !s.featured);

  const visibleFeatured = filterMap[activeFilter](featured) ? featured : null;
  const visibleRest = rest.filter((s) => filterMap[activeFilter](s));

  return (
    <Box minH="100vh" bg={tokens.bg}>
      <Hero
        headline={{ solid: "Case", ghost: "Studies", accent: "& Work" }}
        subtitle="Deep technical breakdowns of every system I've built — architecture decisions, engineering trade-offs, and the honest assessment of what's left to improve."
        badge={null}
        accentColor={tokens.accent2}
        minH="40vh"
        showScrollHint={false}
        stats={[
          { label: "Total Case Studies", value: "3 Published" },
          { label: "Stack", value: "MERN · Full-Stack" },
          { label: "Depth", value: "Architecture Level" },
          { label: "More Coming", value: "Continuously" },
        ]}
      />

      {/* Main content */}
      <Box maxW="1200px" mx="auto" px={{ base: "24px", md: "60px" }} py="90px">
        {/* ── Filter ── */}
        <MotionBox
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <SecLabel>All Case Studies</SecLabel>
          <FilterBar active={activeFilter} onChange={setActiveFilter} />
        </MotionBox>

        {/* ── Featured ── */}
        <AnimatePresence mode="wait">
          {visibleFeatured && (
            <MotionBox
              key="featured"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              mb="2px"
            >
              <FeaturedCard study={visibleFeatured} />
            </MotionBox>
          )}
        </AnimatePresence>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          {visibleRest.length > 0 && (
            <MotionBox
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap="2px"
                mt="2px"
              >
                {visibleRest.map((study, i) => (
                  <StudyCard key={study.id} study={study} delay={i * 0.1} />
                ))}
              </Grid>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!visibleFeatured && visibleRest.length === 0 && (
          <Flex
            direction="column"
            align="center"
            justify="center"
            py="80px"
            gap="16px"
            border="1px dashed"
            borderColor={tokens.border}
          >
            <Text
              fontFamily="heading"
              fontWeight="700"
              fontSize="18px"
              color={tokens.muted}
            >
              No case studies match this filter yet.
            </Text>
            <Box
              as="button"
              onClick={() => setActiveFilter("All")}
              px="20px"
              py="10px"
              bg={tokens.accent}
              color={tokens.bg}
              fontFamily="mono"
              fontSize="10px"
              letterSpacing="0.15em"
              textTransform="uppercase"
              border="none"
              cursor="pointer"
              _hover={{ opacity: 0.85 }}
              transition="opacity 0.2s"
            >
              Show All
            </Box>
          </Flex>
        )}

        <ComingSoon />
      </Box>

      <Footer />
    </Box>
  );
};

export default AllCaseStudiesPage;
