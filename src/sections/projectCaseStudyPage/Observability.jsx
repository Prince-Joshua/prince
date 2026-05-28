import SecLabel from "@/components/custom/SecLabel";
import { tokens } from "@/utils/tokens";
import { Box, Grid, Text } from "@chakra-ui/react";

const Observability = () => {
  const obsCards = [
    {
      icon: "📋",
      title: "Structured Logging",
      status: "active",
      statusLabel: "Partial · Active",
      body: "Environment-gated console logging with request context (method, path, status, duration). Planned: Winston with JSON-formatted log levels and persistent log shipping to a log aggregator.",
    },
    {
      icon: "🐛",
      title: "Error Tracking",
      status: "active",
      statusLabel: "Partial · Active",
      body: "Global Express error handler catches and categorizes all unhandled exceptions. Zod errors are surfaced with field-level detail. Planned: Sentry integration for real-time error alerting and stack trace capture in production.",
    },
    {
      icon: "📡",
      title: "Uptime & Performance",
      status: "planned",
      statusLabel: "Planned",
      body: "Current: Render provides basic uptime monitoring and deploy logs. GET /api/health checks DB connectivity. Planned: Datadog APM for query-level performance tracing and response time histograms.",
    },
    {
      icon: "💳",
      title: "Payment Event Audit Trail",
      status: "active",
      statusLabel: "Active",
      body: "Every Paystack webhook event is logged with its verification status, transaction reference, and outcome. This creates a permanent audit trail for financial reconciliation and dispute resolution — active in production today.",
    },
    {
      icon: "🗄️",
      title: "Database Monitoring",
      status: "active",
      statusLabel: "Active",
      body: "MongoDB Atlas provides query performance advisor, slow query detection, and index usage analytics. Atlas alerts are configured for connection pool saturation and storage threshold warnings.",
    },
    {
      icon: "📊",
      title: "API Response Metrics",
      status: "planned",
      statusLabel: "Planned",
      body: "Planned: Request duration middleware to log p50/p95/p99 latency per endpoint. This data will drive future indexing decisions and identify hot paths for Redis caching prioritization.",
    },
    {
      icon: "🔔",
      title: "Notification & Email Delivery",
      status: "active",
      statusLabel: "Partial · Active",
      body: "In-app notifications are persisted to MongoDB with read/unread status, enabling delivery confirmation at the data layer. Transactional emails are dispatched via Resend, which provides API-level delivery status. Planned: Resend webhook integration for bounce, open, and click event tracking.",
    },
  ];

  return (
    <Box
      as="section"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      <SecLabel>10 — Observability & Monitoring</SecLabel>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="2px">
        {obsCards.map((c) => (
          <Box
            key={c.title}
            bg={tokens.surface}
            px="28px"
            py="28px"
            borderTop="2px solid transparent"
            transition="border-color 0.3s"
            _hover={{ borderTopColor: tokens.accent }}
          >
            <Text fontSize="24px" mb="16px">
              {c.icon}
            </Text>
            <Text
              fontFamily="heading"
              fontWeight="700"
              fontSize="14px"
              mb="10px"
            >
              {c.title}
            </Text>
            <Text
              fontSize="12px"
              color={tokens.muted2}
              lineHeight="1.75"
              mb="12px"
            >
              {c.body}
            </Text>
            <Box
              display="inline-block"
              fontSize="10px"
              letterSpacing="0.15em"
              textTransform="uppercase"
              px="10px"
              py="4px"
              border="1px solid"
              color={c.status === "active" ? tokens.accent : tokens.muted}
              borderColor={
                c.status === "active" ? "rgba(232,255,71,0.3)" : tokens.border
              }
            >
              {c.statusLabel}
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Observability;
