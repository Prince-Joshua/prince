import SecLabel from "@/components/custom/SecLabel";
import { tokens } from "@/utils/tokens";
import { Box, Flex, Grid, Text,} from "@chakra-ui/react";

const Lessons = () => {
  const lessons = [
    {
      icon: "⚡",
      title: "Atomic Operations Are Non-Negotiable at Scale",
      body: "Application-level locks are fragile. Pushing concurrency control to the database layer via $inc, $addToSet, and transactions is the only reliable approach for high-throughput mutation scenarios.",
    },
    {
      icon: "🔒",
      title: "Security Through Architecture, Not Discipline",
      body: "Relying on developers to validate every input is a losing strategy. Centralizing validation into enforced middleware means security guarantees hold regardless of who writes the next route.",
    },
    {
      icon: "📊",
      title: "Pre-compute at Write, Serve at Read",
      body: "Moving aggregation from read time to write time is the same principle behind materialized views, CQRS read-model projections, and Redis sorted sets — and it scales infinitely better.",
    },
    {
      icon: "📄",
      title: "Pagination Strategy Is a Scalability Decision",
      body: "Choosing offset vs. cursor pagination in week one determines whether the chat feature is still performant in year two. The correct choice requires thinking about data volume assumptions upfront.",
    },
    {
      icon: "🔄",
      title: "Knowing Your Limitations Is a Senior Skill",
      body: "Documenting what the system cannot yet do — and knowing the exact path to resolve each gap — is what separates engineers who built something from engineers who understand what they built.",
    },
    {
      icon: "🏗️",
      title: "Design for the System You'll Need",
      body: "Every decision — modular routes, middleware abstraction, cursor pagination, webhook patterns — was made assuming this backend will eventually need Redis, WebSockets, and microservice extraction.",
    },
  ];

  return (
    <Box as="section" borderBottom="1px solid" borderColor={tokens.border} py="90px">
      <SecLabel>12 — Engineering Lessons</SecLabel>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="2px">
        {lessons.map((l) => (
          <Flex
            key={l.title}
            bg={tokens.surface}
            px="36px"
            py="32px"
            gap="20px"
            align="flex-start"
          >
            <Flex
              w="36px"
              h="36px"
              align="center"
              justify="center"
              bg="rgba(232,255,71,0.08)"
              border="1px solid rgba(232,255,71,0.2)"
              fontSize="16px"
              flexShrink="0"
            >
              {l.icon}
            </Flex>
            <Box>
              <Text
                fontFamily="heading"
                fontWeight="700"
                fontSize="14px"
                mb="8px"
              >
                {l.title}
              </Text>
              <Text fontSize="13px" color={tokens.muted2} lineHeight="1.75">
                {l.body}
              </Text>
            </Box>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
};
export default Lessons;
