import SecLabel from "@/components/custom/SecLabel";
import { HEX, tokens } from "@/utils/tokens";
import { Box, Grid, Text } from "@chakra-ui/react";
import React from "react";

const Metrics = () => {
  const metrics = [
    {
      val: "<100ms",
      label: "Core product & category query response via strategic indexing",
    },
    {
      val: "0",
      label: "Ghost orders — guaranteed by triple-verified payment pipeline",
    },
    {
      val: "O(1)",
      label: "Pagination query cost regardless of message volume",
    },
    {
      val: "100%",
      label:
        "Controller input sanitization — no raw request data reaches business logic",
    },
  ];

  return (
    <Box
      as="section"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      <SecLabel>06 — Results & Impact</SecLabel>
      <Grid
        templateColumns={{ base: "1fr 1fr", md: "repeat(4, 1fr)" }}
        gap="2px"
      >
        {metrics.map((m) => (
          <Box
            key={m.val}
            bg={tokens.surface}
            px="32px"
            py="40px"
            textAlign="center"
            position="relative"
            overflow="hidden"
            role="group"
          >
            <Box
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              h="2px"
              bg={`linear-gradient(90deg, transparent, ${HEX.accent}, transparent)`}
              transform="scaleX(0)"
              transition="transform 0.4s"
              _groupHover={{ transform: "scaleX(1)" }}
            />
            <Text
              fontFamily="heading"
              fontSize="44px"
              fontWeight="800"
              color={tokens.accent}
              lineHeight="1"
              mb="12px"
            >
              {m.val}
            </Text>
            <Text
              fontSize="11px"
              letterSpacing="0.15em"
              textTransform="uppercase"
              color={tokens.muted}
              lineHeight="1.6"
            >
              {m.label}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Metrics;
