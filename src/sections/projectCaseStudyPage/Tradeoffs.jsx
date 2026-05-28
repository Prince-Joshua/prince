import Badge from "@/components/custom/Badge";
import SecLabel from "@/components/custom/SecLabel";
import { tokens } from "@/utils/tokens";
import { Box, Flex, Grid, Text, VStack } from "@chakra-ui/react";
import React from "react";

const tradeoffs = [
  {
    title: "Cursor Pagination vs. Offset Pagination",
    badge: { label: "Scalability", variant: "blue" },
    chosen:
      "Cursor-based pagination using createdAt + ObjectId composites. Guarantees O(1) query performance regardless of dataset depth. Added implementation complexity is a one-time cost.",
    rejected:
      "Offset-based pagination (skip/limit). Simple to implement but degrades linearly at scale — unacceptable for a community chat feature with unbounded message growth.",
  },
  {
    title: "Denormalized Payment Data in Orders vs. Separate Payment Model",
    badge: { label: "Data Modeling", variant: "purple" },
    chosen:
      "Embedding payment snapshot data directly in the Order document. Optimizes the most common read pattern (order detail page) to a single document fetch. Accepted write-time duplication as a deliberate tradeoff.",
    rejected:
      "Separate Payment model with foreign-key references. Cleaner normalized structure but adds a JOIN-equivalent at read time for every order detail query — unnecessary overhead given the access pattern.",
  },
  {
    title: "Write-Level Aggregation vs. Read-Time Calculation for Ratings",
    badge: { label: "DB Performance", variant: "orange" },
    chosen:
      "Mongoose post('save') hook triggers aggregation pipeline and updates Product atomically at write time. Read queries serve pre-computed values at constant cost. Accepted slightly slower writes for dramatically faster reads.",
    rejected:
      "Calculating avgRating at read time via aggregation on every GET request. Simple, but adds an O(n) computation proportional to review count on every product page load — untenable at scale.",
  },
  {
    title: "Centralized Zod Middleware vs. Per-Controller Validation",
    badge: { label: "Security", variant: "yellow" },
    chosen:
      "Single validation middleware enforced at the route level for all endpoints. Security guarantees hold regardless of developer discipline. Accepted additional upfront schema definition work for permanent security consistency.",
    rejected:
      "Ad-hoc validation inside each controller. Faster initial development but creates security blind spots — one missed check opens an injection vulnerability. Scales inversely with codebase growth.",
  },
];

const Tradeoffs = () => {
  return (
    <Box
      as="section"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      <SecLabel>05 — Engineering Trade-offs</SecLabel>
      <VStack gap="2px" align="stretch">
        {tradeoffs.map((t) => (
          <Box
            key={t.title}
            bg={tokens.surface}
            px={{ base: "24px", md: "36px" }}
            py="32px"
            borderLeft="2px solid"
            borderColor={tokens.border}
            transition="border-color 0.3s"
            _hover={{ borderLeftColor: tokens.accent2 }}
          >
            <Flex
              align="flex-start"
              justify="space-between"
              gap="20px"
              mb="16px"
              flexWrap="wrap"
            >
              <Text fontFamily="heading" fontWeight="700" fontSize="16px">
                {t.title}
              </Text>
              <Badge variant={t.badge.variant}>{t.badge.label}</Badge>
            </Flex>
            <Grid
              templateColumns={{ base: "1fr", md: "1fr auto 1fr" }}
              gap="12px"
              alignItems="center"
            >
              {/* Chosen */}
              <Box
                bg={tokens.surface2}
                px="18px"
                py="14px"
                border="1px solid rgba(232,255,71,0.2)"
              >
                <Text
                  fontSize="10px"
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                  color={tokens.accent}
                  mb="6px"
                >
                  ✓ Chosen
                </Text>
                <Text fontSize="12px" color={tokens.text} lineHeight="1.7">
                  {t.chosen}
                </Text>
              </Box>
              <Text color={tokens.muted} fontSize="12px" textAlign="center">
                vs.
              </Text>
              {/* Rejected */}
              <Box bg={tokens.surface2} px="18px" py="14px">
                <Text
                  fontSize="10px"
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                  color={tokens.muted}
                  mb="6px"
                >
                  ✗ Rejected
                </Text>
                <Text fontSize="12px" color={tokens.muted2} lineHeight="1.7">
                  {t.rejected}
                </Text>
              </Box>
            </Grid>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Tradeoffs;
