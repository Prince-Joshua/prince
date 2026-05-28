import SecLabel from "@/components/custom/SecLabel";
import { tokens } from "@/utils/tokens";
import { Box, Flex, Text } from "@chakra-ui/react";

const Roadmap = () => {
  const roadmapItems = [
    "Redis caching for hot product & category queries",
    "Socket.io Redis adapter for horizontal chat scaling",
    "BullMQ job queues for async email dispatch & notification retries",
    "Resend webhook integration for bounce & open tracking",
    "Redis store for distributed rate limiting across scaled instances",
    "Jest + Supertest integration test suite",
    "OpenAPI / Swagger documentation generation",
    "Winston structured logging + Sentry error tracking",
    "GitHub Actions CI/CD — lint → test → deploy",
    "Atlas M10 upgrade for full replica set transactions",
    "Datadog APM for p95 latency tracing per endpoint",
    "Microservice extraction of payment domain",
    "API versioning strategy (v1 → v2 migration path)",
  ];

  return (
    <Box
      as="section"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      <SecLabel>13 — Roadmap & Scalability Path</SecLabel>
      <Flex flexWrap="wrap" gap="2px">
        {roadmapItems.map((item) => (
          <Flex
            key={item}
            bg={tokens.surface}
            px="28px"
            py="20px"
            align="center"
            gap="12px"
            flex="1 1 calc(33% - 4px)"
            minW="200px"
          >
            <Box
              w="6px"
              h="6px"
              borderRadius="full"
              bg={tokens.accent}
              flexShrink="0"
            />
            <Text fontSize="13px" color={tokens.muted2}>
              {item}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default Roadmap;
