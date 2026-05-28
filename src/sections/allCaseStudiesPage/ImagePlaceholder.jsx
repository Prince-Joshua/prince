import { tokens } from "@/utils/tokens";
import { Box, Flex, Text, } from "@chakra-ui/react";
import React, {useState} from "react";

const ImagePlaceholder = ({ aspect = "16/9", label, hint, index }) => {
  const accentColors = [
    "rgba(232,255,71,0.06)",
    "rgba(180,127,255,0.06)",
    "rgba(71,200,255,0.06)",
  ];
  const borderColors = [
    "rgba(232,255,71,0.15)",
    "rgba(180,127,255,0.15)",
    "rgba(71,200,255,0.15)",
  ];
  const dotColors = [tokens.accent, tokens.accent4, tokens.accent2];
  const idx = parseInt(index) - 1;

  return (
    <Box
      position="relative"
      w="full"
      style={{ aspectRatio: aspect }}
      bg={accentColors[idx % 3]}
      border="1px dashed"
      borderColor={borderColors[idx % 3]}
      overflow="hidden"
    >
      {/* Grid lines */}
      <Box
        position="absolute"
        inset="0"
        backgroundImage={`linear-gradient(${borderColors[idx % 3]} 1px, transparent 1px), linear-gradient(90deg, ${borderColors[idx % 3]} 1px, transparent 1px)`}
        backgroundSize="40px 40px"
        opacity="0.4"
      />

      {/* Center content */}
      <Flex
        position="absolute"
        inset="0"
        direction="column"
        align="center"
        justify="center"
        gap="12px"
        zIndex="1"
      >
        {/* Icon placeholder */}
        <Box
          w="48px"
          h="48px"
          border="1px solid"
          borderColor={borderColors[idx % 3]}
          bg={accentColors[idx % 3]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="20px"
        >
          🖼
        </Box>

        <Box textAlign="center">
          <Text
            fontSize="11px"
            fontFamily="mono"
            letterSpacing="0.15em"
            textTransform="uppercase"
            color={dotColors[idx % 3]}
            mb="4px"
          >
            {label}
          </Text>
          <Text
            fontSize="10px"
            fontFamily="mono"
            color={tokens.muted}
            letterSpacing="0.05em"
          >
            {hint}
          </Text>
        </Box>

        {/* Corner markers */}
        {[
          { top: "12px", left: "12px" },
          { top: "12px", right: "12px" },
          { bottom: "12px", left: "12px" },
          { bottom: "12px", right: "12px" },
        ].map((pos, i) => (
          <Box
            key={i}
            position="absolute"
            {...pos}
            w="16px"
            h="16px"
            borderTop={i < 2 ? `2px solid ${borderColors[idx % 3]}` : "none"}
            borderBottom={
              i >= 2 ? `2px solid ${borderColors[idx % 3]}` : "none"
            }
            borderLeft={
              i % 2 === 0 ? `2px solid ${borderColors[idx % 3]}` : "none"
            }
            borderRight={
              i % 2 === 1 ? `2px solid ${borderColors[idx % 3]}` : "none"
            }
          />
        ))}
      </Flex>
    </Box>
  );
};

export default ImagePlaceholder;
