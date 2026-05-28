import React from "react";
import { accentPalette, tokens } from "@/utils/tokens";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { scanline } from "@/utils/animations";

const ProjectImagePlaceholder = ({
  aspect = "16/9",
  label,
  hint,
  accentIdx = 0,
}) => {
  const a = accentPalette[accentIdx % 3];
  return (
    <Box
      position="relative"
      w="full"
      style={{ aspectRatio: aspect }}
      bg={a.color}
      border="1px dashed"
      borderColor={a.border}
      overflow="hidden"
    >
      {/* Grid lines */}
      <Box
        position="absolute"
        inset="0"
        backgroundImage={`linear-gradient(${a.border} 1px, transparent 1px), linear-gradient(90deg, ${a.border} 1px, transparent 1px)`}
        backgroundSize="40px 40px"
        opacity="0.4"
      />
      {/* Scanline sweep */}
      <Box
        position="absolute"
        left="0"
        right="0"
        h="2px"
        background={`linear-gradient(90deg, transparent, ${a.border}, transparent)`}
        animation={`${scanline} 4s linear infinite`}
        opacity="0.5"
      />

      {/* Center */}
      <Flex
        position="absolute"
        inset="0"
        direction="column"
        align="center"
        justify="center"
        gap="10px"
        zIndex="1"
      >
        <Box
          w="44px"
          h="44px"
          border="1px solid"
          borderColor={a.border}
          bg={a.color}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="18px"
        >
          🖼
        </Box>
        <Box textAlign="center">
          <Text
            fontSize="10px"
            fontFamily="mono"
            letterSpacing="0.15em"
            textTransform="uppercase"
            color={a.dot}
            mb="3px"
          >
            {label}
          </Text>
          <Text
            fontSize="9px"
            fontFamily="mono"
            color={tokens.muted}
            letterSpacing="0.05em"
          >
            {hint}
          </Text>
        </Box>
      </Flex>

      {/* Corner markers */}
      {[
        {
          top: "10px",
          left: "10px",
          borderTop: `2px solid ${a.border}`,
          borderLeft: `2px solid ${a.border}`,
        },
        {
          top: "10px",
          right: "10px",
          borderTop: `2px solid ${a.border}`,
          borderRight: `2px solid ${a.border}`,
        },
        {
          bottom: "10px",
          left: "10px",
          borderBottom: `2px solid ${a.border}`,
          borderLeft: `2px solid ${a.border}`,
        },
        {
          bottom: "10px",
          right: "10px",
          borderBottom: `2px solid ${a.border}`,
          borderRight: `2px solid ${a.border}`,
        },
      ].map((pos, i) => (
        <Box key={i} position="absolute" w="14px" h="14px" {...pos} />
      ))}
    </Box>
  );
};

export default ProjectImagePlaceholder;
