import { fadeUp, gridShift, pulse } from "@/utils/animations";
import { HEX, tokens } from "@/utils/tokens";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Hero = () => {
  const a = (delay) => `${fadeUp} 0.8s ${delay}s ease both`;
  return (
    <Box
      as="header"
      position="relative"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      px={{ base: "24px", md: "60px" }}
      pt="120px"
      pb={{ base: "50px", md: "70px" }}
      borderBottom="1px solid"
      borderColor={tokens.border}
      overflow="hidden"
    >
      {/* Grid */}
      <Box
        position="absolute"
        inset="0"
        backgroundImage={`linear-gradient(${HEX.border} 1px, transparent 1px), linear-gradient(90deg, ${HEX.border} 1px, transparent 1px)`}
        backgroundSize="60px 60px"
        opacity="0.4"
        animation={`${gridShift} 20s linear infinite`}
      />
      {/* Glows */}
      <Box
        position="absolute"
        w="700px"
        h="700px"
        borderRadius="full"
        background="radial-gradient(circle, rgba(232,255,71,0.07) 0%, transparent 70%)"
        top="-200px"
        right="-100px"
        animation={`${pulse} 6s ease-in-out infinite`}
      />
      <Box
        position="absolute"
        w="400px"
        h="400px"
        borderRadius="full"
        background="radial-gradient(circle, rgba(71,200,255,0.06) 0%, transparent 70%)"
        bottom="0"
        left="200px"
        animation={`${pulse} 8s ease-in-out infinite reverse`}
      />

      <Box position="relative" zIndex="2">
        {/* Eyebrow */}
        <Flex align="center" gap="12px" mb="28px" animation={a(0)}>
          <Box w="32px" h="1px" bg={tokens.accent} />
          <Text
            fontSize="11px"
            letterSpacing="0.25em"
            textTransform="uppercase"
            color={tokens.accent}
            fontFamily="mono"
          >
            Engineering Case Study · 2024
          </Text>
        </Flex>

        {/* Title */}
        <Box
          fontFamily="heading"
          fontWeight="800"
          fontSize={{ base: "52px", md: "clamp(52px, 8vw, 110px)" }}
          lineHeight="0.9"
          letterSpacing="-0.03em"
          mb="8px"
          animation={a(0.1)}
        >
          <Box as="span" display="block" color={tokens.text}>
            Sassy
          </Box>
          <Box
            as="span"
            display="block"
            color="transparent"
            style={{ WebkitTextStroke: "1px rgba(240,240,240,0.3)" }}
          >
            Blend
          </Box>
          <Box as="span" display="block" color={tokens.accent}>
            API
          </Box>
        </Box>

        {/* Subtitle */}
        <Text
          fontFamily="serif"
          fontStyle="italic"
          fontSize="18px"
          color={tokens.muted2}
          mt="24px"
          maxW="520px"
          lineHeight="1.7"
          animation={a(0.25)}
        >
          A production-grade MERN e-commerce backend engineered for financial
          integrity, database performance, and real-time scalability — designed,
          architected, and built by one engineer.
        </Text>

        {/* Meta row */}
        <Flex
          gap="40px"
          flexWrap="wrap"
          mt="50px"
          pt="40px"
          borderTop="1px solid"
          borderColor={tokens.border}
          animation={a(0.4)}
        >
          {[
            { label: "Role", value: "Sole Architect & Engineer" },
            {
              label: "Stack",
              value: "MERN · Zod · Paystack · Cloudinary · Resend",
            },
            { label: "Domain", value: "E-Commerce · Community Platform" },
            { label: "Market", value: "Nigeria (NGN · Paystack)" },
          ].map((m) => (
            <Box key={m.label}>
              <Text
                fontSize="10px"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color={tokens.muted}
                mb="4px"
              >
                {m.label}
              </Text>
              <Text
                fontFamily="heading"
                fontWeight="600"
                fontSize="13px"
                color={tokens.text}
              >
                {m.value}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Hero;
