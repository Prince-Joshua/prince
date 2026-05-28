import ContactForm from "@/components/custom/ContactForm";
import SecLabel from "@/components/custom/SecLabel";
import { tokens } from "@/utils/tokens";
import { Box, Flex, Grid, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = ({ showLine = true }) => {
  const navigate = useNavigate();
  const socials = [
    { label: "GitHub", handle: "github.com/princejoshua", path: "#" },
    { label: "LinkedIn", handle: "linkedin.com/in/princejoshua", path: "#" },
    { label: "Twitter / X", handle: "@princejoshuadev", path: "#" },
  ];
  const availability = [
    { label: "Full-Time Roles", status: "Open", variant: tokens.accent },
    { label: "Contract / Freelance", status: "Open", variant: tokens.accent },
    { label: "Consulting", status: "Limited", variant: tokens.accent3 },
    { label: "Open Source Collab", status: "Open", variant: tokens.accent },
  ];

  return (
    <Box
      as="section"
      id="contact"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      {showLine && <SecLabel>05 — Contact</SecLabel>}

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1.4fr 1fr" }} gap="2px">
        {/* ── Col 1: Info + Socials ── */}
        <Flex
          direction="column"
          bg={tokens.surface}
          p={{ base: "32px", md: "40px 32px" }}
        >
          <Text
            fontFamily="heading"
            fontWeight="800"
            fontSize="22px"
            letterSpacing="-0.02em"
            mb="12px"
          >
            Let's Build Something.
          </Text>
          <Text
            fontSize="13px"
            color={tokens.muted2}
            lineHeight="1.85"
            mb="28px"
          >
            Open to full-time roles, contract work, and interesting problems. If
            your backend needs to actually scale — reach out.
          </Text>

          <Link
            href="mailto:hello@princejoshua.dev"
            fontFamily="heading"
            fontWeight="700"
            fontSize="13px"
            color={tokens.accent}
            borderBottom="1px solid"
            borderColor="rgba(232,255,71,0.3)"
            pb="3px"
            mb="28px"
            display="inline-block"
            _hover={{ borderColor: tokens.accent, textDecoration: "none" }}
            transition="border-color 0.2s"
          >
            hello@princejoshua.dev
          </Link>

          <VStack gap="2px" align="stretch" mt="auto">
            {socials.map((s) => (
              <Box
                onClick={() => navigate(s.path)}
                key={s.label}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                bg={tokens.surface2}
                border="1px solid"
                borderColor={tokens.border}
                borderLeft="2px solid transparent"
                px="16px"
                py="14px"
                color={tokens.text}
                _hover={{
                  borderLeftColor: tokens.accent,
                  color: tokens.accent,
                  textDecoration: "none",
                }}
                transition="all 0.2s"
              >
                <Text
                  fontSize="10px"
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                  fontFamily="mono"
                >
                  {s.label}
                </Text>
                <Text fontSize="11px" color={tokens.muted2}>
                  {s.handle}
                </Text>
              </Box>
            ))}
          </VStack>
        </Flex>

        {/* ── Col 2: Contact Form ── */}
        <Box
          bg={tokens.surface}
          p={{ base: "32px", md: "40px 36px" }}
          borderLeft="1px solid"
          borderRight="1px solid"
          borderColor={tokens.border}
        >
          <Text
            fontFamily="heading"
            fontSize="11px"
            fontWeight="700"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color={tokens.muted}
            mb="24px"
          >
            Send a Message
          </Text>
          <ContactForm />
        </Box>

        {/* ── Col 3: Availability ── */}
        <Flex
          direction="column"
          bg={tokens.surface}
          p={{ base: "32px", md: "40px 32px" }}
        >
          <Text
            fontFamily="heading"
            fontSize="11px"
            fontWeight="700"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color={tokens.muted}
            mb="24px"
          >
            Current Availability
          </Text>

          <VStack gap="2px" align="stretch">
            {availability.map((a) => (
              <Flex
                key={a.label}
                align="center"
                justify="space-between"
                bg={tokens.surface2}
                border="1px solid"
                borderColor={tokens.border}
                px="16px"
                py="16px"
              >
                <Text fontSize="12px" color={tokens.text}>
                  {a.label}
                </Text>
                <Text
                  fontSize="10px"
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                  color={a.color}
                >
                  {a.status}
                </Text>
              </Flex>
            ))}
          </VStack>

          <Text
            mt="auto"
            pt="24px"
            fontSize="11px"
            color={tokens.muted2}
            lineHeight="1.8"
            borderTop="1px solid"
            borderColor={tokens.border}
          >
            I typically respond within 24–48 hours. A short description of what
            you're building goes a long way.
          </Text>
        </Flex>
      </Grid>
    </Box>
  );
};

export default Contact;
