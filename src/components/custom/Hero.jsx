import React from "react";
import { anim, blink, gridShift, pulse } from "@/utils/animations";
import { tokens } from "@/utils/tokens";
import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const glows = [
  {
    color: "rgba(232,255,71,0.06)",
    size: "800px",
    top: "-250px",
    right: "-150px",
    duration: "7s",
  },
  {
    color: "rgba(71,200,255,0.05)",
    size: "500px",
    bottom: "-50px",
    left: "100px",
    duration: "9s",
    reverse: true,
  },
];

const Hero = ({
  headline,
  subtitle,
  accentColor,
  badge = "Available for opportunities",
  ctas = [],
  stats = [],
  showScrollHint = true,
  minH = "60vh",
}) => {
  const accentLine = accentColor ?? tokens.accent;
  const navigate = useNavigate();

  return (
    <Box
      as="header"
      position="relative"
      minH={minH}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      px={{ base: "24px", md: "60px" }}
      pt="120px"
      pb={{ base: "60px", md: "80px" }}
      borderBottom="1px solid"
      borderColor={tokens.border}
      overflow="hidden"
    >
      {/* ── Animated grid ── */}
      <Box
        position="absolute"
        inset="0"
        backgroundImage={`linear-gradient(#222228 1px, transparent 1px), linear-gradient(90deg, #222228 1px, transparent 1px)`}
        backgroundSize="60px 60px"
        opacity="0.35"
        animation={`${gridShift} 22s linear infinite`}
        pointerEvents="none"
      />

      {/* ── Glow orbs ── */}
      {glows.map((g, i) => (
        <Box
          key={i}
          position="absolute"
          w={g.size}
          h={g.size}
          borderRadius="full"
          background={`radial-gradient(circle, ${g.color} 0%, transparent 65%)`}
          top={g.top}
          right={g.right}
          bottom={g.bottom}
          left={g.left}
          animation={`${pulse} ${g.duration ?? "8s"} ease-in-out infinite${g.reverse ? " reverse" : ""}`}
          pointerEvents="none"
        />
      ))}

      {/* ── Content ── */}
      <Box position="relative" zIndex="2">
        {/* Badge */}
        {badge && (
          <Flex
            align="center"
            gap="8px"
            mb="32px"
            fontSize="10px"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color={tokens.accent}
            fontFamily="mono"
            animation={anim(0)}
          >
            <Box
              w="7px"
              h="7px"
              borderRadius="full"
              bg={tokens.accent}
              animation={`${blink} 2s ease-in-out infinite`}
              pointerEvents="none"
            />
            {badge}
          </Flex>
        )}

        {/* Headline */}
        <Box
          as="h1"
          fontFamily="heading"
          fontWeight="800"
          lineHeight="0.88"
          letterSpacing="-0.03em"
          fontSize={{
            base: "clamp(48px,12vw,72px)",
            md: "clamp(52px,8vw,110px)",
          }}
          mb="8px"
          animation={anim(0.1)}
        >
          <Box as="span" display="block" color={tokens.text}>
            {headline.solid}
          </Box>
          <Box
            as="span"
            display="block"
            color="transparent"
            style={{ WebkitTextStroke: "1px rgba(240,240,240,0.25)" }}
          >
            {headline.ghost}
          </Box>
          <Box as="span" display="block" color={accentLine}>
            {headline.accent}
          </Box>
        </Box>

        {/* Subtitle */}
        <Text
          fontFamily="serif"
          fontStyle="italic"
          fontSize={{ base: "17px", md: "20px" }}
          color={tokens.muted2}
          mt="28px"
          maxW="600px"
          lineHeight="1.6"
          animation={anim(0.2)}
        >
          {subtitle}
        </Text>

        {/* CTAs */}
        {ctas.length > 0 && (
          <HStack gap="16px" mt="44px" flexWrap="wrap" animation={anim(0.35)}>
            {ctas.map((cta, i) => {
              const isFilled =
                cta.variant === "filled" || (!cta.variant && i === 0);
              return isFilled ? (
                <Box
                  key={i}
                  onClick={() => navigate(cta.path)}
                  px="28px"
                  py="14px"
                  bg={tokens.accent}
                  color={tokens.bg}
                  fontFamily="heading"
                  fontWeight="700"
                  fontSize="11px"
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                  _hover={{ opacity: 0.85, textDecoration: "none" }}
                  transition="opacity 0.2s"
                >
                  {cta.label}
                </Box>
              ) : (
                <Box
                  onClick={() => navigate(cta.path)}
                  px="28px"
                  py="14px"
                  bg="transparent"
                  color={tokens.text}
                  border="1px solid"
                  borderColor={tokens.border}
                  fontFamily="heading"
                  fontWeight="700"
                  fontSize="11px"
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                  _hover={{
                    borderColor: accentLine,
                    color: accentLine,
                    textDecoration: "none",
                  }}
                  transition="all 0.2s"
                >
                  {cta.label}
                </Box>
              );
            })}
          </HStack>
        )}

        {/* Stats row */}
        {stats.length > 0 && (
          <Flex
            gap="40px"
            flexWrap="wrap"
            mt="60px"
            pt="40px"
            borderTop="1px solid"
            borderColor={tokens.border}
            animation={anim(0.45)}
          >
            {stats.map((s) => (
              <Box key={s.label}>
                <Text
                  fontSize="10px"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color={tokens.muted}
                  mb="4px"
                >
                  {s.label}
                </Text>
                <Text
                  fontFamily="heading"
                  fontWeight="700"
                  fontSize="13px"
                  color={tokens.text}
                >
                  {s.value}
                </Text>
              </Box>
            ))}
          </Flex>
        )}
      </Box>

      {/* ── Scroll hint ── */}
      {showScrollHint && (
        <Flex
          position="absolute"
          bottom="32px"
          left={{ base: "24px", md: "60px" }}
          align="center"
          gap="10px"
          fontSize="10px"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color={tokens.muted}
          zIndex="2"
          animation={anim(0.6)}
          pointerEvents="none"
        >
          <Box
            w="1px"
            h="40px"
            bg="linear-gradient(180deg, transparent, #666672)"
          />
          Scroll to explore
        </Flex>
      )}
    </Box>
  );
};

export default Hero;
