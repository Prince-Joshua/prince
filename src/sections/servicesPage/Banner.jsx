import { Box, Flex, Grid, Heading, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Banner = () => {
  return (
    <Box
      as="section"
      py="90px"
      borderBottom="1px solid"
      borderColor="brand.border"
    >
      <Box maxW="1100px" mx="auto" px={{ base: "24px", md: "60px" }}>
        <Box
          bg="brand.surface"
          border="1px solid"
          borderColor="brand.border"
          borderLeft="3px solid"
          borderLeftColor="brand.accent"
          p={{ base: "40px 28px", md: "56px 52px" }}
        >
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr auto" }}
            gap="40px"
            align="center"
          >
            <Box>
              <Text
                fontFamily="heading"
                fontSize="10px"
                letterSpacing="0.25em"
                textTransform="uppercase"
                color="brand.accent"
                mb="16px"
              >
                Ready to get started?
              </Text>
              <Heading
                fontFamily="heading"
                fontWeight="800"
                fontSize="clamp(28px, 4vw, 44px)"
                letterSpacing="-0.025em"
                lineHeight="1.05"
                mb="16px"
              >
                Let's build something that
                <br />
                <Box as="span" color="brand.accent">
                  holds up.
                </Box>
              </Heading>
              <Text
                fontSize="14px"
                color="brand.muted2"
                lineHeight="1.8"
                maxW="520px"
              >
                I'm currently open to full-stack projects, backend engagements,
                and code reviews. Send a short description of what you're
                building and I'll respond within 24 hours.
              </Text>
            </Box>

            <VStack gap="12px" align="stretch" minW={{ lg: "220px" }}>
              <Link
                href="/#contact"
                display="block"
                textAlign="center"
                fontFamily="heading"
                fontWeight="700"
                fontSize="11px"
                letterSpacing="0.15em"
                textTransform="uppercase"
                color="brand.bg"
                bg="brand.accent"
                px="28px"
                py="16px"
                transition="opacity 0.2s"
                _hover={{ opacity: 0.85 }}
              >
                Send a Message →
              </Link>
              <Link
                href="mailto:hello@princejoshua.dev"
                display="block"
                textAlign="center"
                fontFamily="heading"
                fontWeight="700"
                fontSize="11px"
                letterSpacing="0.15em"
                textTransform="uppercase"
                color="brand.text"
                border="1px solid"
                borderColor="brand.border"
                px="28px"
                py="16px"
                transition="all 0.2s"
                _hover={{ borderColor: "brand.accent", color: "brand.accent" }}
              >
                Email Directly
              </Link>

              {/* Availability rows */}
              <VStack gap="2px" align="stretch" mt="4px">
                {[
                  { label: "Full-Time", status: "Open", c: "brand.accent" },
                  { label: "Contract", status: "Open", c: "brand.accent" },
                  {
                    label: "Consulting",
                    status: "Limited",
                    c: "brand.accent3",
                  },
                ].map(({ label, status, c }) => (
                  <Flex
                    key={label}
                    justify="space-between"
                    align="center"
                    bg="brand.surface2"
                    border="1px solid"
                    borderColor="brand.border"
                    px="16px"
                    py="10px"
                  >
                    <Text fontSize="12px" color="brand.muted2">
                      {label}
                    </Text>
                    <Text
                      fontSize="10px"
                      letterSpacing="0.15em"
                      textTransform="uppercase"
                      color={c}
                    >
                      {status}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </VStack>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
