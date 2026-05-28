import React from "react";
import {
  useParams,
  useNavigate,
  Link as RouterLink,
  href,
} from "react-router-dom";

import {
  Box,
  Flex,
  Grid,
  Text,
  Wrap,
  WrapItem,
  HStack,
  Link,
} from "@chakra-ui/react";
import { accentPalette, statusStyles, tokens } from "@/utils/tokens";
import { scanline, blink } from "@/utils/animations";
import { projects } from "@/constant/projects";
import SecLabel from "@/components/custom/SecLabel";
import NavBar from "@/components/custom/NavBar";
import MotionBox from "@/components/custom/MotionBox";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Breadcrumb = ({ title }) => (
  <Flex
    align="center"
    gap="10px"
    fontFamily="mono"
    fontSize="10px"
    letterSpacing="0.2em"
    textTransform="uppercase"
    color={tokens.muted}
  >
    <Link
      as={RouterLink}
      to="/projects"
      color={tokens.muted}
      _hover={{ color: tokens.accent, textDecoration: "none" }}
      transition="color 0.2s"
    >
      Projects
    </Link>
    <Box color={tokens.border}>—</Box>
    <Text color={tokens.accent2} noOfLines={1}>
      {title}
    </Text>
  </Flex>
);

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <Box minH="100vh" bg={tokens.bg}>
        <NavBar />
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="60vh"
          gap="16px"
        >
          <Text
            fontFamily="heading"
            fontWeight="800"
            fontSize="32px"
            color={tokens.muted}
          >
            Project not found.
          </Text>
          <Box
            as="button"
            onClick={() => navigate("/projects")}
            px="24px"
            py="12px"
            bg={tokens.accent}
            color={tokens.bg}
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.15em"
            textTransform="uppercase"
            cursor="pointer"
            border="none"
            _hover={{ opacity: 0.85 }}
            transition="opacity 0.2s"
          >
            ← Back to Projects
          </Box>
        </Flex>
      </Box>
    );
  }

  const a = accentPalette[project.image.accent % 3];
  const s = statusStyles[project.status];

  return (
    <Box minH="100vh" bg={tokens.bg}>
      {/* Hero */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        borderBottom="1px solid"
        borderColor={tokens.border}
      >
        <Grid
          maxW="1200px"
          mx="auto"
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          minH={{ base: "auto", lg: "480px" }}
        >
          {/* Image side */}
          <Box
            borderRight={{ lg: "1px solid" }}
            borderBottom={{ base: "1px solid", lg: "none" }}
            borderColor={tokens.border}
            position="relative"
            bg={a.color}
            overflow="hidden"
            minH={{ base: "260px", lg: "unset" }}
          >
            <Box
              position="absolute"
              inset="0"
              backgroundImage={`linear-gradient(${a.border} 1px, transparent 1px), linear-gradient(90deg, ${a.border} 1px, transparent 1px)`}
              backgroundSize="40px 40px"
              opacity="0.4"
            />
            <Box
              position="absolute"
              left="0"
              right="0"
              h="2px"
              background={`linear-gradient(90deg, transparent, ${a.border}, transparent)`}
              animation={`${scanline} 5s linear infinite`}
              opacity="0.5"
            />
            <Flex
              position="absolute"
              inset="0"
              direction="column"
              align="center"
              justify="center"
              gap="14px"
            >
              <Box
                w="64px"
                h="64px"
                border="1px solid"
                borderColor={a.border}
                bg={a.color}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="28px"
              >
                {project.icon}
              </Box>
              <Box textAlign="center">
                <Text
                  fontSize="10px"
                  fontFamily="mono"
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                  color={a.dot}
                  mb="4px"
                >
                  {project.image.label}
                </Text>
                <Text
                  fontSize="9px"
                  fontFamily="mono"
                  color={tokens.muted}
                  letterSpacing="0.05em"
                >
                  {project.image.hint}
                </Text>
              </Box>
            </Flex>

            {/* Corner markers */}
            {[
              {
                top: "20px",
                left: "20px",
                borderTop: `2px solid ${a.border}`,
                borderLeft: `2px solid ${a.border}`,
              },
              {
                top: "20px",
                right: "20px",
                borderTop: `2px solid ${a.border}`,
                borderRight: `2px solid ${a.border}`,
              },
              {
                bottom: "20px",
                left: "20px",
                borderBottom: `2px solid ${a.border}`,
                borderLeft: `2px solid ${a.border}`,
              },
              {
                bottom: "20px",
                right: "20px",
                borderBottom: `2px solid ${a.border}`,
                borderRight: `2px solid ${a.border}`,
              },
            ].map((pos, i) => (
              <Box key={i} position="absolute" w="18px" h="18px" {...pos} />
            ))}

            {/* Blinking status dot */}
            <Flex
              position="absolute"
              bottom="20px"
              left="46px"
              align="center"
              gap="8px"
              zIndex="1"
            >
              <Box
                w="6px"
                h="6px"
                borderRadius="full"
                bg={a.dot}
                animation={`${blink} 2s ease-in-out infinite`}
              />
              <Text
                fontFamily="mono"
                fontSize="9px"
                letterSpacing="0.15em"
                textTransform="uppercase"
                color={tokens.muted}
              >
                {project.type}
              </Text>
            </Flex>
          </Box>

          {/* Info side */}
          <MotionBox
            variants={container}
            initial="hidden"
            animate="show"
            px={{ base: "28px", md: "48px" }}
            py={{ base: "36px", md: "52px" }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <MotionBox variants={item}>
              <Text
                fontFamily="mono"
                fontSize="10px"
                letterSpacing="0.25em"
                textTransform="uppercase"
                color={tokens.accent2}
                mb="10px"
              >
                {project.type}
              </Text>
            </MotionBox>

            <MotionBox variants={item}>
              <Text
                fontFamily="heading"
                fontWeight="800"
                fontSize={{ base: "28px", md: "38px" }}
                letterSpacing="-0.025em"
                lineHeight="1.1"
                mb="8px"
              >
                {project.title}
              </Text>
            </MotionBox>

            <MotionBox variants={item}>
              <Text
                fontFamily="serif"
                fontStyle="italic"
                fontSize="15px"
                color={tokens.muted2}
                mb="20px"
              >
                {project.tagline}
              </Text>
            </MotionBox>

            <MotionBox variants={item}>
              <Text
                fontSize="13px"
                color={tokens.muted2}
                lineHeight="1.9"
                mb="28px"
              >
                {project.description}
              </Text>
            </MotionBox>

            {/* Metrics */}
            <MotionBox variants={item}>
              <Flex
                gap="28px"
                flexWrap="wrap"
                py="20px"
                borderTop="1px solid"
                borderBottom="1px solid"
                borderColor={tokens.border}
                mb="24px"
              >
                {project.metrics.map((m) => (
                  <Box key={m.label}>
                    <Text
                      fontSize="9px"
                      letterSpacing="0.2em"
                      textTransform="uppercase"
                      color={tokens.muted}
                      mb="3px"
                    >
                      {m.label}
                    </Text>
                    <Text
                      fontFamily="heading"
                      fontWeight="700"
                      fontSize="22px"
                      color={tokens.accent}
                      lineHeight="1"
                    >
                      {m.value}
                    </Text>
                  </Box>
                ))}
              </Flex>
            </MotionBox>

            {/* Links */}
            <MotionBox variants={item}>
              <HStack gap="12px" flexWrap="wrap">
                {project.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    px={l.label === "Case Study" ? "20px" : "0"}
                    py={l.label === "Case Study" ? "10px" : "0"}
                    bg={
                      l.label === "Case Study" ? tokens.accent : "transparent"
                    }
                    color={l.label === "Case Study" ? tokens.bg : tokens.muted}
                    borderBottom={
                      l.label !== "Case Study" ? "1px solid" : "none"
                    }
                    borderColor={tokens.border}
                    fontFamily="heading"
                    fontWeight={l.label === "Case Study" ? "700" : "500"}
                    fontSize="10px"
                    letterSpacing="0.15em"
                    textTransform="uppercase"
                    _hover={
                      l.label === "Case Study"
                        ? { opacity: 0.85, textDecoration: "none" }
                        : {
                            color: tokens.accent,
                            borderColor: tokens.accent,
                            textDecoration: "none",
                          }
                    }
                    transition="all 0.2s"
                  >
                    {l.label} →
                  </Link>
                ))}
              </HStack>
            </MotionBox>
          </MotionBox>
        </Grid>
      </MotionBox>

      {/* Body */}
      <Box maxW="1200px" mx="auto" px={{ base: "24px", md: "60px" }} py="80px">
        {/* Overview */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          mb="64px"
        >
          <SecLabel>Overview</SecLabel>
          <Text
            fontSize="14px"
            color={tokens.muted2}
            lineHeight="2"
            maxW="720px"
          >
            {project.longDescription}
          </Text>
        </MotionBox>

        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 320px" }}
          gap={{ base: "48px", lg: "80px" }}
          alignItems="start"
        >
          {/* Highlights */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SecLabel>Highlights</SecLabel>
            <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap="2px">
              {project.highlights.map((h) => (
                <Flex
                  key={h}
                  align="center"
                  gap="12px"
                  bg={tokens.surface}
                  border="1px solid"
                  borderColor={tokens.border}
                  px="20px"
                  py="16px"
                  fontSize="12px"
                  color={tokens.muted2}
                  lineHeight="1.5"
                >
                  <Box
                    w="6px"
                    h="6px"
                    borderRadius="full"
                    bg={tokens.accent}
                    flexShrink="0"
                  />
                  {h}
                </Flex>
              ))}
            </Grid>
          </MotionBox>

          {/* Sticky sidebar */}
          <MotionBox
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            position={{ lg: "sticky" }}
            top={{ lg: "32px" }}
          >
            {/* Tech stack */}
            <Box
              bg={tokens.surface}
              border="1px solid"
              borderColor={tokens.border}
              borderTop="2px solid"
              borderTopColor={tokens.accent4}
              p="28px"
              mb="2px"
            >
              <Text
                fontFamily="mono"
                fontSize="9px"
                letterSpacing="0.25em"
                textTransform="uppercase"
                color={tokens.muted}
                mb="16px"
              >
                Tech Stack
              </Text>
              <Wrap gap="6px">
                {project.tags.map((t) => (
                  <WrapItem key={t}>
                    <Box
                      px="10px"
                      py="5px"
                      bg={tokens.surface2}
                      border="1px solid"
                      borderColor={tokens.border}
                      color={tokens.muted2}
                      fontSize="11px"
                      fontFamily="mono"
                      transition="all 0.2s"
                      _hover={{
                        borderColor: tokens.accent,
                        color: tokens.accent,
                      }}
                    >
                      {t}
                    </Box>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>

            {/* Project meta */}
            <Box
              bg={tokens.surface}
              border="1px solid"
              borderColor={tokens.border}
              borderTop="2px solid"
              borderTopColor={tokens.accent2}
              p="28px"
              mb="2px"
            >
              <Text
                fontFamily="mono"
                fontSize="9px"
                letterSpacing="0.25em"
                textTransform="uppercase"
                color={tokens.muted}
                mb="16px"
              >
                Project Info
              </Text>
              <Flex direction="column" gap="14px">
                {[
                  { label: "Category", value: project.category },
                  { label: "Type", value: project.type },
                  { label: "Status", value: s.label },
                ].map((row) => (
                  <Flex key={row.label} justify="space-between" align="center">
                    <Text
                      fontSize="10px"
                      letterSpacing="0.1em"
                      textTransform="uppercase"
                      color={tokens.muted}
                    >
                      {row.label}
                    </Text>
                    <Text
                      fontSize="11px"
                      fontFamily="mono"
                      color={tokens.muted2}
                    >
                      {row.value}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Box>

            {/* Back */}
            <Box
              as="button"
              onClick={() => navigate("/projects")}
              w="full"
              bg={tokens.surface}
              border="1px solid"
              borderColor={tokens.border}
              px="20px"
              py="14px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="8px"
              fontFamily="mono"
              fontSize="10px"
              letterSpacing="0.15em"
              textTransform="uppercase"
              color={tokens.muted}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ borderColor: tokens.accent, color: tokens.accent }}
            >
              ← Back to Projects
            </Box>
          </MotionBox>
        </Grid>
      </Box>

      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        maxW="1200px"
        mx="auto"
        px={{ base: "24px", md: "60px" }}
        pb="80px"
      >
        <Box
          bg={tokens.surface}
          border="1px solid"
          borderColor={tokens.border}
          borderLeft="2px solid"
          borderLeftColor={a.dot}
          px={{ base: "32px", md: "52px" }}
          py="48px"
          textAlign="center"
        >
          <Text
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.3em"
            textTransform="uppercase"
            color={tokens.muted}
            mb="16px"
          >
            Thanks for reading
          </Text>
          <Text
            fontFamily="heading"
            fontWeight="800"
            fontSize={{ base: "22px", md: "28px" }}
            letterSpacing="-0.02em"
            mb="10px"
          >
            Want to see it in action?
          </Text>
          <Text
            fontSize="13px"
            color={tokens.muted2}
            lineHeight="1.8"
            maxW="440px"
            mx="auto"
            mb="32px"
          >
            The best way to understand what was built is to try it yourself.
          </Text>

          {project.links[1] && (
            <Link
              href={project.links[1].href}
              display="inline-flex"
              alignItems="center"
              gap="8px"
              px="28px"
              py="14px"
              bg={tokens.accent}
              color={tokens.bg}
              fontFamily="heading"
              fontWeight="700"
              fontSize="11px"
              letterSpacing="0.15em"
              textTransform="uppercase"
              _hover={{ opacity: 0.85, textDecoration: "none" }}
              transition="opacity 0.2s"
            >
              {project.links[1].label} →
            </Link>
          )}
        </Box>
      </MotionBox>

      {/* Minimal footer */}
      <Box
        borderTop="1px solid"
        borderColor={tokens.border}
        bg={tokens.surface}
      >
        <Flex
          maxW="1200px"
          mx="auto"
          px={{ base: "24px", md: "60px" }}
          py="24px"
          align="center"
          justify="space-between"
          flexWrap="wrap"
          gap="12px"
        >
          <Breadcrumb title={project.title} />
          <Text
            fontFamily="mono"
            fontSize="9px"
            letterSpacing="0.15em"
            textTransform="uppercase"
            color={tokens.muted}
          >
            {project.category}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProjectDetailPage;
