import SecLabel from "@/components/custom/SecLabel";
import { tokens } from "@/utils/tokens";
import { Box, Flex, Grid, Text, VStack } from "@chakra-ui/react";
import React from "react";

const deployCards = [
  {
    icon: "🚀",
    title: "Hosting & Infrastructure",
    items: [
      {
        label: "Backend",
        body: "Render (Node.js web service, auto-deploy from main branch)",
      },
      {
        label: "Database",
        body: "MongoDB Atlas (M0 cluster → M10 upgrade path on traffic growth)",
      },
      {
        label: "Media",
        body: "Cloudinary (image upload, transformation, CDN delivery)",
      },
      {
        label: "Payments",
        body: "Paystack (NGN-native, webhook endpoint registered on Render URL)",
      },
      {
        label: "Frontend",
        body: "Vercel (React SPA, environment-aware API base URL)",
      },
      {
        label: "Email",
        body: "Resend (transactional email API — order confirmations, status updates, support)",
      },
    ],
  },
  {
    icon: "🔑",
    title: "Environment & Secrets Strategy",
    items: [
      {
        label: "NODE_ENV",
        body: "gates stack trace exposure — never leaks to client in production",
      },
      {
        label: "MONGO_URI",
        body: "stored in Render environment — never committed to repository",
      },
      {
        label: "JWT_SECRET",
        body: "rotatable without code changes — environment variable only",
      },
      {
        label: "PAYSTACK_SECRET_KEY",
        body: "used server-side only — never exposed to client bundle",
      },
      {
        label: "WEBHOOK_SECRET",
        body: "used for HMAC-SHA512 signature verification on all Paystack events",
      },
      {
        label: "RESEND_API_KEY",
        body: "stored in Render environment — used server-side only for email dispatch",
      },
    ],
  },
];

const checklist = [
  { done: true, label: "CORS configured with allowlist — not wildcard (*)" },
  { done: true, label: "Helmet.js — HTTP security headers enforced" },
  { done: true, label: "No stack traces in production API responses" },
  { done: true, label: "Environment-gated debug logging" },
  { done: true, label: "Webhook HMAC signature verification active" },
  { done: true, label: "MongoDB Atlas IP allowlist configured" },
  {
    done: true,
    label: "In-app notifications persisted with read/unread state",
  },
  { done: true, label: "Transactional email active via Resend API" },
  {
    done: true,
    label:
      "Rate limiting active — express-rate-limit per IP + endpoint category",
  },
  { done: false, label: "Automated test suite (planned — Jest + Supertest)" },
];

const ciItems = [
  {
    label: "GitHub Actions",
    body: "lint → test → build on every pull request to main",
  },
  {
    label: "Render Auto-Deploy",
    body: "triggered on merge to main — zero-downtime rolling deploy",
  },
  {
    label: "Environment promotion",
    body: "dev → staging → production with environment-specific secrets",
  },
  {
    label: "Health check endpoint",
    body: "GET /api/health confirms DB connectivity and service status",
  },
];

const Deployment = () => {
  return (
    <Box
      as="section"
      id="deployment"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      <SecLabel>09 — Deployment & Production Environment</SecLabel>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="2px">
        {/* Hosting + Secrets */}
        {deployCards.map((card) => (
          <Box key={card.title} bg={tokens.surface} px="36px" py="32px">
            <Flex align="center" gap="10px" mb="16px">
              <Flex
                w="28px"
                h="28px"
                align="center"
                justify="center"
                bg="rgba(232,255,71,0.08)"
                border="1px solid rgba(232,255,71,0.2)"
                fontSize="13px"
                flexShrink="0"
              >
                {card.icon}
              </Flex>
              <Text fontFamily="heading" fontWeight="700" fontSize="14px">
                {card.title}
              </Text>
            </Flex>
            <VStack gap="0" align="stretch">
              {card.items.map((item, i) => (
                <Flex
                  key={i}
                  gap="12px"
                  align="flex-start"
                  py="10px"
                  borderBottom="1px solid"
                  borderColor={tokens.border}
                  _last={{ borderBottom: "none" }}
                >
                  <Text color={tokens.accent} flexShrink="0" mt="1px">
                    →
                  </Text>
                  <Text fontSize="13px" color={tokens.muted2} lineHeight="1.65">
                    <Text as="strong" color={tokens.text} fontWeight="500">
                      {item.label}:
                    </Text>{" "}
                    {item.body}
                  </Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        ))}

        {/* Checklist */}
        <Box bg={tokens.surface} px="36px" py="32px">
          <Flex align="center" gap="10px" mb="16px">
            <Flex
              w="28px"
              h="28px"
              align="center"
              justify="center"
              bg="rgba(232,255,71,0.08)"
              border="1px solid rgba(232,255,71,0.2)"
              fontSize="13px"
              flexShrink="0"
            >
              ✅
            </Flex>
            <Text fontFamily="heading" fontWeight="700" fontSize="14px">
              Production Readiness Checklist
            </Text>
          </Flex>
          <VStack gap="0" align="stretch">
            {checklist.map((c, i) => (
              <Flex
                key={i}
                align="center"
                gap="12px"
                py="10px"
                borderBottom="1px solid"
                borderColor={tokens.border}
                _last={{ borderBottom: "none" }}
                fontSize="13px"
                color={tokens.muted2}
              >
                <Text
                  color={c.done ? tokens.accent : tokens.muted}
                  fontSize="14px"
                >
                  {c.done ? "✓" : "○"}
                </Text>
                {c.label}
              </Flex>
            ))}
          </VStack>
        </Box>

        {/* CI/CD */}
        <Box bg={tokens.surface} px="36px" py="32px">
          <Flex align="center" gap="10px" mb="16px">
            <Flex
              w="28px"
              h="28px"
              align="center"
              justify="center"
              bg="rgba(232,255,71,0.08)"
              border="1px solid rgba(232,255,71,0.2)"
              fontSize="13px"
              flexShrink="0"
            >
              ⚙️
            </Flex>
            <Text fontFamily="heading" fontWeight="700" fontSize="14px">
              CI/CD Pipeline (Planned)
            </Text>
          </Flex>
          <VStack gap="0" align="stretch">
            {ciItems.map((item, i) => (
              <Flex
                key={i}
                gap="12px"
                align="flex-start"
                py="10px"
                borderBottom="1px solid"
                borderColor={tokens.border}
                _last={{ borderBottom: "none" }}
              >
                <Text color={tokens.accent} flexShrink="0" mt="1px">
                  →
                </Text>
                <Text fontSize="13px" color={tokens.muted2} lineHeight="1.65">
                  <Text as="strong" color={tokens.text} fontWeight="500">
                    {item.label}:
                  </Text>{" "}
                  {item.body}
                </Text>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
};

export default Deployment;
