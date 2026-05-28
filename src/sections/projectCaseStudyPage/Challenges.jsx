import React from "react";

import SecLabel from "@/components/custom/SecLabel";
import { tokens } from "@/utils/tokens";
import { Box, Grid, Text } from "@chakra-ui/react";

const challenges = [
  {
    challenge: {
      title: "Payment Reliability",
      body: "Paystack redirects fail silently if the client crashes post-payment.",
    },
    decision:
      "Triple verification: backend init → manual GET verify → HMAC-signed webhook finalization.",
    impact: {
      body: "Zero ghost orders. Database converges correctly regardless of client state.",
      tag: "Financial Integrity",
    },
  },
  {
    challenge: {
      title: "Stale Rating Data",
      body: "Calculating avgRating at read time adds O(n) cost per product GET.",
    },
    decision:
      "Mongoose post('save') hook triggers aggregation at write time, updates Product atomically.",
    impact: {
      body: "Read-time cost is constant regardless of review volume.",
      tag: "DB Performance",
    },
  },
  {
    challenge: {
      title: "Chat Pagination at Scale",
      body: "Offset pagination degrades linearly — skip(50000) scans 50k documents to discard them.",
    },
    decision:
      "Cursor pagination using createdAt + ObjectId composites. Zero skip operations.",
    impact: {
      body: "O(1) query cost. Performant at millions of messages.",
      tag: "Scalability",
    },
  },
  {
    challenge: {
      title: "Concurrent Mutations",
      body: "Simultaneous cart updates and coupon redemptions risk double-processing.",
    },
    decision:
      "$inc, $addToSet, sessions + transactions for all writes. No application-level locks.",
    impact: {
      body: "Race conditions structurally impossible across cart, coupon, and like systems.",
      tag: "Data Integrity",
    },
  },
  {
    challenge: {
      title: "Validation Scatter",
      body: "Validation duplicated across controllers creates security blind spots as codebase grows.",
    },
    decision:
      "Centralized Zod schemas enforced via single middleware. Controllers receive clean data only.",
    impact: {
      body: "Field injection architecturally impossible. Zero runtime undefined errors.",
      tag: "Security",
    },
  },
];
const Challenges = () => {
  const headStyle = {
    bg: tokens.surface2,
    px: "32px",
    py: "16px",
    fontSize: "10px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: tokens.muted,
  };
  return (
    <Box
      as="section"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      <SecLabel>08 — Challenges & Decisions</SecLabel>
      <Box overflowX="auto">
        <Grid templateColumns="1fr 1fr 1fr" minW="640px" gap="2px">
          <Box {...headStyle}>Challenge</Box>
          <Box {...headStyle}>Decision</Box>
          <Box {...headStyle}>Impact</Box>
          {challenges.map((c, i) => (
            <Box key={i}>
              <Box key={`ch-${i}`} bg={tokens.surface} px="32px" py="28px">
                <Text
                  fontFamily="heading"
                  fontWeight="700"
                  fontSize="14px"
                  color={tokens.accent3}
                  mb="10px"
                >
                  {c.challenge.title}
                </Text>
                <Text fontSize="13px" color={tokens.muted2} lineHeight="1.7">
                  {c.challenge.body}
                </Text>
              </Box>
              <Box key={`de-${i}`} bg={tokens.surface} px="32px" py="28px">
                <Text fontSize="13px" color={tokens.muted2} lineHeight="1.7">
                  <Text as="strong" color={tokens.accent2} fontWeight="500">
                    {c.decision}
                  </Text>
                </Text>
              </Box>
              <Box key={`im-${i}`} bg={tokens.surface} px="32px" py="28px">
                <Text
                  fontSize="13px"
                  color={tokens.muted2}
                  lineHeight="1.7"
                  mb="12px"
                >
                  {c.impact.body}
                </Text>
                <Box
                  display="inline-block"
                  fontSize="11px"
                  color={tokens.accent}
                  border="1px solid rgba(232,255,71,0.2)"
                  px="10px"
                  py="4px"
                >
                  {c.impact.tag}
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Challenges;
