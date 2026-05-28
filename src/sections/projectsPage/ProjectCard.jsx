import MotionBox from "@/components/custom/MotionBox";
import { accentPalette, statusStyles, tokens } from "@/utils/tokens";
import {
  Box,
  Flex,
  Wrap,
  WrapItem,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectImagePlaceholder from "./ProjectImagePlaceholder";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const s = statusStyles[project.status];
  const a = accentPalette[project.image.accent % 3];

  return (
    <MotionBox
      layout
      bg={tokens.surface}
      position="relative"
      overflow="hidden"
      borderTop="2px solid"
      borderColor="transparent"
      cursor="pointer"
      onClick={() => navigate(`/projects/${project.id}`)}
      transition="border-color 0.25s"
      _hover={{
        borderColor: tokens.accent2,
        "& .hover-accent": { opacity: 1 },
        "& .expand-overlay": { opacity: 1 },
      }}
    >
      {/* Hover accent line */}
      <Box
        className="hover-accent"
        position="absolute"
        top="0"
        left="0"
        right="0"
        h="2px"
        bg={tokens.accent2}
        opacity={0}
        transition="opacity 0.25s"
        zIndex="3"
      />

      {/* Image placeholder */}
      <Box
        borderBottom="1px solid"
        borderColor={tokens.border}
        position="relative"
        zIndex="1"
      >
        <ProjectImagePlaceholder
          aspect={project.image.aspect}
          label={project.image.label}
          hint={project.image.hint}
          accentIdx={project.image.accent}
        />
        {/* Hover overlay */}
        <Flex
          className="expand-overlay"
          position="absolute"
          inset="0"
          align="center"
          justify="center"
          bg="rgba(10,10,11,0.55)"
          opacity="0"
          transition="opacity 0.2s"
          zIndex="2"
          fontSize="11px"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color={tokens.text}
          fontFamily="mono"
          gap="8px"
        >
          View Project →
        </Flex>
      </Box>

      {/* Card content */}
      <Box p="28px 32px" position="relative" zIndex="1">
        <Flex justify="space-between" align="flex-start" gap="12px" mb="14px">
          <Flex
            w="38px"
            h="38px"
            bg={a.color}
            border={`1px solid ${a.border}`}
            align="center"
            justify="center"
            fontSize="16px"
          >
            {project.icon}
          </Flex>
          <Box
            fontSize="9px"
            letterSpacing="0.15em"
            textTransform="uppercase"
            px="10px"
            py="4px"
            border="1px solid"
            borderColor={s.border}
            color={s.color}
          >
            {s.label}
          </Box>
        </Flex>

        <Text
          fontSize="10px"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color={tokens.accent2}
          mb="4px"
        >
          {project.type}
        </Text>
        <Text
          fontFamily="heading"
          fontWeight="700"
          fontSize="20px"
          letterSpacing="-0.01em"
          mb="4px"
        >
          {project.title}
        </Text>
        <Text
          fontFamily="serif"
          fontStyle="italic"
          fontSize="12px"
          color={tokens.muted2}
          mb="12px"
        >
          {project.tagline}
        </Text>
        <Text fontSize="13px" color={tokens.muted2} lineHeight="1.8" mb="18px">
          {project.description}
        </Text>

        <Wrap gap="6px" mb="20px">
          {project.tags.slice(0, 4).map((t) => (
            <WrapItem key={t}>
              <Box
                px="10px"
                py="4px"
                bg={tokens.surface2}
                border="1px solid"
                borderColor={tokens.border}
                color={tokens.muted2}
                fontSize="11px"
                fontFamily="mono"
              >
                {t}
              </Box>
            </WrapItem>
          ))}
          {project.tags.length > 4 && (
            <WrapItem>
              <Box
                px="10px"
                py="4px"
                bg={tokens.surface2}
                border="1px solid"
                borderColor={tokens.border}
                color={tokens.muted}
                fontSize="11px"
                fontFamily="mono"
              >
                +{project.tags.length - 4} more
              </Box>
            </WrapItem>
          )}
        </Wrap>

        {/* Bottom row */}
        <Flex
          justify="space-between"
          align="center"
          pt="16px"
          borderTop="1px solid"
          borderColor={tokens.border}
        >
          <HStack gap="12px">
            {project.links.slice(0, 2).map((l) => (
              <Link
                key={l.label}
                href={l.href}
                fontSize="10px"
                letterSpacing="0.12em"
                textTransform="uppercase"
                color={tokens.muted}
                borderBottom="1px solid"
                borderColor={tokens.border}
                pb="2px"
                _hover={{
                  color: tokens.accent,
                  borderColor: tokens.accent,
                  textDecoration: "none",
                }}
                transition="all 0.2s"
                onClick={(e) => e.stopPropagation()}
              >
                {l.label} →
              </Link>
            ))}
          </HStack>
          <Flex
            align="center"
            gap="6px"
            fontSize="10px"
            letterSpacing="0.12em"
            textTransform="uppercase"
            color={tokens.muted}
            fontFamily="mono"
            transition="color 0.2s"
          >
            View →
          </Flex>
        </Flex>
      </Box>
    </MotionBox>
  );
};

export default ProjectCard;
