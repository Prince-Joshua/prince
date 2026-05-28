import SecLabel from "@/components/custom/SecLabel";
import { tokens } from "@/utils/tokens";
import { Box, Grid, Text } from "@chakra-ui/react";

const Limitations = () => {
  const limitations = [
    {
      title: "No Distributed Cache Layer",
      body: "Hot product and category queries currently hit MongoDB on every request. Under high read concurrency, this will saturate the database connection pool before compute is exhausted.",
      mitigation:
        "Redis cache with TTL-based invalidation on write — extraction path is already clear given the modular controller structure.",
      resolved: false,
    },
    {
      title: "Single-Node MongoDB Assumption",
      body: "The system uses MongoDB Atlas M0 (free tier) which does not support replica sets with session-based transactions in all configurations. Transaction patterns are written correctly but may degrade on non-replicated clusters.",
      mitigation:
        "Upgrade to Atlas M10+ enables full replica set with multi-document transaction support at scale.",
      resolved: false,
    },
    {
      title: "Chat Not Horizontally Scaled",
      body: "The real-time chat foundation uses Socket.io, which stores active connections in process memory. Horizontal scaling across multiple Node.js instances would cause cross-instance message loss.",
      mitigation:
        "Socket.io Redis adapter for pub/sub across instances — the modular architecture makes this a configuration change, not a rewrite.",
      resolved: false,
    },
    {
      title: "No Background Job Queue",
      body: "Transactional email (Resend) and in-app notification writes currently execute synchronously within the request lifecycle. Under high load, a slow Resend API response could add latency to the primary order confirmation flow.",
      mitigation:
        "BullMQ with Redis backend — email dispatch and notification creation become async, retryable, and monitorable through a Bull Board dashboard.",
      resolved: false,
    },
    {
      title: "No Automated Test Coverage",
      body: "The system has been manually tested against all core user flows, but lacks a formal test suite. This increases regression risk during future feature additions and makes refactoring less safe.",
      mitigation:
        "Jest + Supertest integration tests against a test MongoDB instance — priority item for the next development cycle.",
      resolved: false,
    },
    {
      title: "API Rate Limiting — Resolved",
      body: "Public endpoints (product listing, search, auth) are protected against request flooding via express-rate-limit, configured per IP and per endpoint category. Connection pool exhaustion from malicious flooding is now structurally mitigated.",
      mitigation:
        "Active in production. Redis store upgrade path remains open for distributed rate limiting across horizontally scaled instances.",
      resolved: true,
    },
  ];

  return (
    <Box
      as="section"
      id="limitations"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      <SecLabel>11 — Known Limitations & Honest Assessment</SecLabel>
      <Text
        fontSize="14px"
        color={tokens.muted2}
        mb="32px"
        maxW="700px"
        lineHeight="1.8"
      >
        Senior engineers know their system's boundaries. These are the current
        architectural limitations and the paths to resolving them.
      </Text>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="2px">
        {limitations.map((l) => (
          <Box
            key={l.title}
            bg={tokens.surface}
            px="32px"
            py="28px"
            borderLeft="2px solid"
            borderColor={
              l.resolved ? "rgba(232,255,71,0.3)" : "rgba(255,107,71,0.3)"
            }
          >
            <Text
              fontFamily="heading"
              fontWeight="700"
              fontSize="14px"
              color={l.resolved ? tokens.accent : tokens.accent3}
              mb="10px"
            >
              {l.title}
            </Text>
            <Text
              fontSize="13px"
              color={tokens.muted2}
              lineHeight="1.75"
              mb="10px"
            >
              {l.body}
            </Text>
            <Box borderTop="1px solid" borderColor={tokens.border} pt="10px">
              <Text
                fontSize="12px"
                color={l.resolved ? tokens.accent : tokens.accent2}
                lineHeight="1.7"
              >
                <Text as="span" color={tokens.muted}>
                  Mitigation path →{" "}
                </Text>
                {l.mitigation}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Limitations;
