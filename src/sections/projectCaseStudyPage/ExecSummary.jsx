import Badge from "@/components/custom/Badge";
import SecLabel from "@/components/custom/SecLabel";
import { tokens } from "@/utils/tokens";
import { Box, Flex, Grid, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";

const ExecSummary = () => {
  const cards = [
    {
      n: "1",
      title: "The Problem",
      body: (
        <>
          Most MERN e-commerce backends collapse under feature growth —
          validation logic scatters across controllers, guest sessions break at
          login, and payment flows lose orders silently when a user's browser
          crashes mid-transaction.{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            The challenge was to architect a system that eliminated these
            failure modes structurally, not with workarounds.
          </Text>
        </>
      ),
    },
    {
      n: "2",
      title: "The Solution",
      body: (
        <>
          A{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            modular, layered backend
          </Text>{" "}
          with centralized Zod validation, a triple-verified Paystack payment
          pipeline, cursor-based pagination for community features, and atomic
          MongoDB operations throughout — eliminating race conditions, stale
          data, and silent order loss by design.
        </>
      ),
    },
    {
      n: "3",
      title: "The Outcome",
      body: (
        <>
          <Text as="strong" color={tokens.text} fontWeight="500">
            Sub-100ms
          </Text>{" "}
          response times on core product queries.{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            Zero ghost orders
          </Text>{" "}
          across all payment sessions. A backend architecture ready to absorb
          Redis caching, WebSocket scaling, and microservice extraction with
          minimal refactoring.
        </>
      ),
    },
    {
      n: "4",
      title: "The Scale Signal",
      body: (
        <>
          Every major system — cart, payments, ratings, community chat — was
          designed with a growth assumption of{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            hundreds of thousands of users
          </Text>
          . The architecture reflects that ambition structurally, not just
          aspirationally.
        </>
      ),
    },
  ];

  return (
    <Box
      as="section"
      id="summary"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      <SecLabel>01 — Executive Summary</SecLabel>

      {/* Role Banner */}
      <Flex
        bg={tokens.surface}
        border="1px solid"
        borderColor={tokens.border}
        borderLeft="3px solid"
        borderLeftColor={tokens.accent}
        px="36px"
        py="28px"
        mb="2px"
        align="center"
        justify="space-between"
        gap="20px"
        flexWrap="wrap"
      >
        <Box>
          <Text fontFamily="heading" fontSize="22px" fontWeight="700" mb="4px">
            Sole Architect & Engineer
          </Text>
          <Text fontSize="12px" color={tokens.muted}>
            Owned 100% of architecture, backend implementation, security design,
            and deployment strategy
          </Text>
        </Box>
        <Wrap gap="10px">
          <WrapItem>
            <Badge variant="yellow">Solo Project</Badge>
          </WrapItem>
          <WrapItem>
            <Badge variant="blue">Full-Stack</Badge>
          </WrapItem>
          <WrapItem>
            <Badge variant="orange">Production-Ready</Badge>
          </WrapItem>
        </Wrap>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="2px">
        {cards.map((c) => (
          <Box
            key={c.n}
            bg={tokens.surface}
            px="36px"
            pt="36px"
            pb="44px"
            position="relative"
            overflow="hidden"
          >
            {/* Ghost number */}
            <Box
              position="absolute"
              top="-10px"
              right="20px"
              fontFamily="heading"
              fontSize="100px"
              fontWeight="800"
              color={tokens.border}
              lineHeight="1"
              userSelect="none"
              pointerEvents="none"
            >
              {c.n}
            </Box>
            <Text
              fontFamily="heading"
              fontSize="11px"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color={tokens.muted}
              mb="16px"
            >
              {c.title}
            </Text>
            <Text
              fontSize="14px"
              color={tokens.muted2}
              lineHeight="1.8"
              position="relative"
              zIndex="1"
            >
              {c.body}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default ExecSummary;
