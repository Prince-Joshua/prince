import Chip from "@/components/custom/Chip";
import SecLabel from "@/components/custom/SecLabel";
import { tokens } from "@/utils/tokens";
import { Box, Grid, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";

const About = () => {
  const traits = [
    {
      title: "Backend-First Thinking",
      body: "I design the data model, the API contract, and the failure modes before writing a single route handler.",
    },
    {
      title: "Security by Architecture",
      body: "Centralised Zod validation, HMAC webhook verification, JWT + httpOnly cookies — security baked in at every layer, not bolted on later.",
    },
    {
      title: "Scale Assumptions Built In",
      body: "Every project I ship is designed for Redis, WebSocket scaling, and microservice extraction — even when those aren't needed yet.",
    },
    {
      title: "UI / UX Awareness",
      body: "Full-stack means the frontend matters too. I build interfaces that are functional, legible, and visually coherent — not just 'technically working'.",
    },
  ];

  return (
    <Box
      as="section"
      id="about"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      <SecLabel>01 — About Me</SecLabel>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="2px">
        {/* Left */}
        <Box bg={tokens.surface} p={{ base: "32px", md: "48px 40px" }}>
          {[
            <>
              I'm{" "}
              <Box as="strong" color={tokens.text} fontWeight="500">
                Prince Joshua
              </Box>
              , a full-stack engineer with a deep focus on building backends
              that don't collapse under pressure. I work in the MERN stack and
              care about architecture the way some people care about aesthetics
              — obsessively.
            </>,
            <>
              I've built production-grade systems handling{" "}
              <Box as="strong" color={tokens.text} fontWeight="500">
                real-time features
              </Box>
              ,{" "}
              <Box as="strong" color={tokens.text} fontWeight="500">
                payment pipelines
              </Box>
              ,{" "}
              <Box as="strong" color={tokens.text} fontWeight="500">
                community platforms
              </Box>
              , and{" "}
              <Box as="strong" color={tokens.text} fontWeight="500">
                scalable REST APIs
              </Box>{" "}
              — all solo. I understand every layer of the stack I write, from
              MongoDB aggregation pipelines to React state management to webhook
              signature verification.
            </>,
            <>
              What drives me is the architecture question: not just "does it
              work?" but "does it hold when things get harder?" Every system I
              build is designed assuming the load will double, the team will
              grow, and the edge cases will arrive.
            </>,
          ].map((txt, i) => (
            <Text
              key={i}
              color={tokens.muted2}
              fontSize="15px"
              lineHeight="1.9"
              mb="20px"
            >
              {txt}
            </Text>
          ))}
          <Wrap gap="8px" mt="16px">
            <WrapItem>
              <Chip variant="y">Solo Architect</Chip>
            </WrapItem>
            <WrapItem>
              <Chip variant="b">Full-Stack</Chip>
            </WrapItem>
            <WrapItem>
              <Chip variant="o">Production-Minded</Chip>
            </WrapItem>
          </Wrap>
        </Box>

        {/* Right — trait cards */}
        <VStack gap="2px" align="stretch">
          {traits.map((t) => (
            <Box
              key={t.title}
              bg={tokens.surface}
              p="28px 32px"
              flex="1"
              borderLeft="2px solid transparent"
              transition="border-color 0.3s"
              _hover={{ borderLeftColor: tokens.accent }}
            >
              <Text
                fontFamily="heading"
                fontWeight="700"
                fontSize="13px"
                mb="6px"
              >
                {t.title}
              </Text>
              <Text fontSize="12px" color={tokens.muted2} lineHeight="1.7">
                {t.body}
              </Text>
            </Box>
          ))}
        </VStack>
      </Grid>
    </Box>
  );
  // const traits = [
  //   {
  //     number: "01",
  //     title: "Clean Architecture",
  //     accentColor: "brand.accent",
  //     description:
  //       "Writing code that scales isn't just about logic; it's about structure. I prioritize modularity and readable patterns in the MERN stack.",
  //   },
  //   {
  //     number: "02",
  //     title: "Performance First",
  //     accentColor: "brand.accent2",
  //     description:
  //       "From database indexing in MongoDB to optimizing React render cycles, speed is a core requirement of my engineering process.",
  //   },
  //   {
  //     number: "03",
  //     title: "Secure by Design",
  //     accentColor: "brand.accent3",
  //     description:
  //       "Implementing robust JWT authentication and API validation to ensure user data remains the highest priority.",
  //   },
  // ];

  // return (
  //   <Box
  //     as="section"
  //     id="about"
  //     px={{ base: 20, md: 32 }}
  //     bg="brand.bg"
  //     maxW={"1100px"}
  //     mx={"auto"}
  //     w={"full"}
  //     py={{ base: 20, md: 32 }}
  //   >
  //     <Box>
  //       {/* Section Header */}
  //       <Grid
  //         templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }}
  //         gap={8}
  //         mb={20}
  //       >
  //         <GridItem colSpan={{ md: 5 }}>
  //           <Text
  //             fontFamily="mono"
  //             color="brand.accent"
  //             fontSize="xs"
  //             letterSpacing="0.3em"
  //             textTransform="uppercase"
  //             mb={4}
  //           >
  //             Core Philosophy
  //           </Text>
  //           <Heading
  //             as="h2"
  //             fontFamily="heading"
  //             fontSize={{ base: "3xl", md: "5xl" }}
  //             fontWeight="800"
  //             lineHeight="1"
  //           >
  //             ENGINEERING WITH INTENT.
  //           </Heading>
  //         </GridItem>

  //         <GridItem colSpan={{ md: 7 }} display="flex" alignItems="flex-end">
  //           <Text
  //             fontFamily="serif"
  //             fontStyle="italic"
  //             fontSize="xl"
  //             color="brand.muted2"
  //             maxW="500px"
  //           >
  //             I don't just build apps; I architect experiences. My goal is to
  //             bridge the gap between high-end design and heavy-duty technical
  //             reliability.
  //           </Text>
  //         </GridItem>
  //       </Grid>

  //       {/* Traits Grid */}
  //       <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={6}>
  //         {traits.map((trait) => (
  //           <TraitCard key={trait.number} {...trait} />
  //         ))}
  //       </Grid>
  //     </Box>
  //   </Box>
  // );
};

export default About;
