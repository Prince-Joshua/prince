import Hero from "@/components/custom/Hero";
import MotionBox from "@/components/custom/MotionBox";
import NavBar from "@/components/custom/NavBar";
import SecLabel from "@/components/custom/SecLabel";
import { projects } from "@/constant/projects";

import FilterBar from "@/sections/projectsPage/FilterBar";
import Footer from "@/sections/projectsPage/Footer";

import ProjectCard from "@/sections/projectsPage/ProjectCard";
import StatsBar from "@/sections/projectsPage/StatsBar";
import { blink } from "@/utils/animations";
import { tokens } from "@/utils/tokens";
import { Box, Flex, Grid, HStack, Link, Text } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const AllProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState("Any Status");

  const filtered = projects.filter((p) => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const statusMatch =
      activeStatus === "Any Status" || p.status === activeStatus;
    return catMatch && statusMatch;
  });

  return (
    <Box minH="100vh" bg={tokens.bg}>
      <Hero
        headline={{ solid: "All", ghost: "Projects", accent: "& Builds" }}
        subtitle="Every project I've shipped — from production backends to pixel-precise UIs. Click any card to expand the full technical breakdown."
        badge={null}
        minH="40vh"
        showScrollHint={false}
        stats={[
          { label: "Total Projects", value: `${projects.length} Builds` },
          { label: "Status", value: "3 Live / Complete" },
          { label: "Stack", value: "MERN · Full-Stack" },
          { label: "Approach", value: "Solo · Architecture-First" },
        ]}
      />

      <Box maxW="1200px" mx="auto" px={{ base: "24px", md: "60px" }} py="90px">
        <SecLabel>All Projects</SecLabel>

        <StatsBar />

        <Box mt="32px" mb="0">
          <FilterBar
            activeCategory={activeCategory}
            activeStatus={activeStatus}
            onCategory={(c) => {
              setActiveCategory(c);
              setExpandedId(null);
            }}
            onStatus={(s) => {
              setActiveStatus(s);
              setExpandedId(null);
            }}
          />
        </Box>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <MotionBox
              key={activeCategory + activeStatus}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap="2px"
              >
                {filtered.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </Grid>
            </MotionBox>
          ) : (
            <MotionBox
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
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
                  No projects match this filter.
                </Text>
                <Box
                  as="button"
                  onClick={() => {
                    setActiveCategory("All");
                    setActiveStatus("Any Status");
                  }}
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
                  Clear Filters
                </Box>
              </Flex>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* More coming banner */}
        <MotionBox
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          mt="6px"
          bg={tokens.surface}
          border="1px solid"
          borderColor={tokens.border}
          borderLeft="2px solid"
          borderLeftColor="rgba(232,255,71,0.4)"
          px={{ base: "32px", md: "48px" }}
          py="36px"
        >
          <Flex
            align="center"
            justify="space-between"
            flexWrap="wrap"
            gap="20px"
          >
            <Box>
              <Flex align="center" gap="8px" mb="6px">
                <Box
                  w="7px"
                  h="7px"
                  borderRadius="full"
                  bg={tokens.accent}
                  animation={`${blink} 2s ease-in-out infinite`}
                />
                <Text
                  fontSize="10px"
                  letterSpacing="0.25em"
                  textTransform="uppercase"
                  color={tokens.accent}
                  fontFamily="mono"
                >
                  More Shipping Soon
                </Text>
              </Flex>
              <Text
                fontFamily="heading"
                fontWeight="700"
                fontSize="16px"
                mb="4px"
              >
                New projects added as they ship.
              </Text>
              <Text
                fontSize="13px"
                color={tokens.muted2}
                lineHeight="1.7"
                maxW="440px"
              >
                Currently building. Check back or reach out if you want to see
                something specific.
              </Text>
            </Box>
            <HStack gap="8px">
              <Link
                href="/contact"
                px="20px"
                py="10px"
                bg={tokens.accent}
                color={tokens.bg}
                fontFamily="heading"
                fontWeight="700"
                fontSize="10px"
                letterSpacing="0.15em"
                textTransform="uppercase"
                _hover={{ opacity: 0.85, textDecoration: "none" }}
                transition="opacity 0.2s"
              >
                Get in Touch →
              </Link>
              <Link
                href="/case-studies"
                px="20px"
                py="10px"
                bg="transparent"
                color={tokens.muted}
                border="1px solid"
                borderColor={tokens.border}
                fontFamily="heading"
                fontWeight="700"
                fontSize="10px"
                letterSpacing="0.15em"
                textTransform="uppercase"
                _hover={{
                  borderColor: tokens.accent,
                  color: tokens.accent,
                  textDecoration: "none",
                }}
                transition="all 0.2s"
              >
                Case Studies →
              </Link>
            </HStack>
          </Flex>
        </MotionBox>
      </Box>

      <Footer />
    </Box>
  );
};

export default AllProjectsPage;
