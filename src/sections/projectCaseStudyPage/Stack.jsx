import SecLabel from "@/components/custom/SecLabel";
import StackPill from "@/components/custom/StackPill";
import { tokens } from "@/utils/tokens";
import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";

const Stack = () => {
  const pills = [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "React",
    "Redux Toolkit",
    "Zod",
    "Paystack API",
    "Cloudinary",
    "Socket.io (foundation)",
    "JWT + Cookies",
    "MongoDB Aggregation",
    "Mongoose Middleware Hooks",
    "Cursor-Based Pagination",
    "HMAC Webhook Verification",
    "Resend (Transactional Email)",
    "In-App Notifications",
    "React Hot Toast",
    "express-rate-limit",
  ];
  return (
    <Box
      as="section"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      <SecLabel>02 — Technology Stack</SecLabel>
      <Wrap gap="8px" mt="24px">
        {pills.map((p) => (
          <WrapItem key={p}>
            <StackPill>{p}</StackPill>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default Stack;
