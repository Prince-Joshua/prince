import SecLabel from "@/components/custom/SecLabel";
import { HEX, tokens } from "@/utils/tokens";
import { Box, Flex, Grid, Text, VStack } from "@chakra-ui/react";
import React from "react";

const archLayers = [
  {
    type: "client",
    color: HEX.accent2,
    title: "Client Layer",
    sub: "React + Redux Toolkit · Browser / Mobile",
    arrow: "↓  HTTPS Requests (REST + Cookie Auth)",
    subs: [],
  },
  {
    type: "gateway",
    color: HEX.accent,
    title: "API Gateway",
    sub: "Express.js · Route Definitions · CORS · Helmet",
    arrow: "↓  Every request passes through",
    subs: [],
  },
  {
    type: "middle",
    color: HEX.muted2,
    title: "Middleware Layer",
    sub: "Auth · Zod Validation · Role Guard · Error Handler",
    arrow: "↓  Only validated, sanitized data passes through",
    subs: [
      "JWT + Cookie Auth",
      "Zod Schema Validation",
      "Role-Based Access",
      "Global Error Handler",
    ],
  },
  {
    type: "service",
    color: HEX.accent3,
    title: "Controller / Service Layer",
    sub: "Business Logic · Atomic Operations · Aggregation Pipelines",
    arrow: "↓  Reads / Writes",
    subs: [
      "User & Auth",
      "Products & Categories",
      "Cart & Orders",
      "Coupons",
      "Chat & Reviews",
      "Support",
      "Notifications",
    ],
  },
  {
    type: "data",
    color: HEX.accent4,
    title: "Data Layer",
    sub: "MongoDB · Mongoose · Sessions + Transactions",
    arrow: "↓  Async calls to external providers",
    subs: [],
  },
  {
    type: "external",
    color: HEX.muted,
    title: "External Services",
    sub: "Paystack API · Cloudinary · Paystack Webhooks (HMAC) · Resend Email API",
    arrow: null,
    subs: [],
  },
];

const archBg = {
  client: "rgba(71,200,255,0.04)",
  gateway: "rgba(232,255,71,0.04)",
  middle: "rgba(102,102,114,0.06)",
  service: "rgba(255,107,71,0.04)",
  data: "rgba(180,127,255,0.04)",
  external: "rgba(102,102,114,0.04)",
};
const Architecture = () => {
  const legend = [
    { label: "Client", color: HEX.accent2 },
    { label: "API Gateway", color: HEX.accent },
    { label: "Middleware", color: HEX.muted2 },
    { label: "Services", color: HEX.accent3 },
    { label: "Data Layer", color: HEX.accent4 },
    { label: "External", color: HEX.muted },
  ];

  return (
    <Box
      as="section"
      id="architecture"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      <SecLabel>03 — System Architecture</SecLabel>
      <Box
        bg={tokens.surface}
        p={{ base: "24px", md: "48px" }}
        overflowX="auto"
      >
        <VStack gap="0" align="stretch" minW="600px">
          {archLayers.map((layer) => (
            <Box key={layer.title}>
              {/* Node row */}
              <Flex
                align="center"
                gap="12px"
                border="1px solid"
                borderColor={layer.color}
                bg={archBg[layer.type]}
                px="24px"
                py="14px"
              >
                <Box
                  w="8px"
                  h="8px"
                  borderRadius="full"
                  bg={layer.color}
                  flexShrink="0"
                />
                <Text
                  fontFamily="heading"
                  fontWeight="700"
                  fontSize="13px"
                  color={tokens.text}
                >
                  {layer.title}
                </Text>
                <Text fontSize="11px" color={tokens.muted} ml="auto">
                  {layer.sub}
                </Text>
              </Flex>

              {/* Sub-nodes */}
              {layer.subs.length > 0 && (
                <Grid
                  templateColumns={`repeat(${layer.subs.length}, 1fr)`}
                  gap="2px"
                  mt="2px"
                >
                  {layer.subs.map((s) => (
                    <Flex
                      key={s}
                      align="center"
                      gap="8px"
                      border="1px solid"
                      // borderColor={tokens.border}
                      borderColor={`rgba(232,255,71,0.2)`}
                      bg={tokens.surface2}
                      px="16px"
                      py="10px"
                      fontSize="11px"
                      color={tokens.muted2}
                    >
                      {s}
                    </Flex>
                  ))}
                </Grid>
              )}

              {/* Arrow */}
              {layer.arrow && (
                <Text fontSize="12px" color={tokens.muted} py="6px" pl="36px">
                  {layer.arrow}
                </Text>
              )}
            </Box>
          ))}
        </VStack>

        {/* Legend */}
        <Flex
          flexWrap="wrap"
          gap="20px"
          mt="32px"
          pt="24px"
          borderTop="1px solid"
          borderColor={tokens.border}
        >
          {legend.map((l) => (
            <Flex key={l.label} align="center" gap="8px">
              <Box w="8px" h="8px" borderRadius="full" bg={l.color} />
              <Text fontSize="11px" color={tokens.muted}>
                {l.label}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Architecture;
