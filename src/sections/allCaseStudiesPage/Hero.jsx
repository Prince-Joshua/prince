import React from "react";
import { anim, fadeUp, gridShift, pulse } from "@/utils/animations";
import { HEX, tokens } from "@/utils/tokens";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { projects } from "@/constant/projects";

const Hero = () => {
  return (
    <Box
      as="header"
      position="relative"
      minH="40vh"
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
      <Box
        position="absolute"
        inset="0"
        backgroundImage={`linear-gradient(#222228 1px, transparent 1px), linear-gradient(90deg, #222228 1px, transparent 1px)`}
        backgroundSize="60px 60px"
        opacity="0.35"
        animation={`${gridShift} 22s linear infinite`}
      />
      <Box
        position="absolute"
        w="700px"
        h="700px"
        borderRadius="full"
        background="radial-gradient(circle, rgba(71,200,255,0.05) 0%, transparent 65%)"
        top="-200px"
        right="-100px"
        animation={`${pulse} 7s ease-in-out infinite`}
      />
      <Box
        position="absolute"
        w="400px"
        h="400px"
        borderRadius="full"
        background="radial-gradient(circle, rgba(232,255,71,0.04) 0%, transparent 65%)"
        bottom="-80px"
        left="80px"
        animation={`${pulse} 9s ease-in-out infinite reverse`}
      />

      <Box position="relative" zIndex="2">
        {/* Title */}
        <Box
          as="h1"
          fontFamily="heading"
          fontWeight="800"
          fontSize={{ base: "48px", md: "clamp(48px, 8vw, 96px)" }}
          lineHeight="0.88"
          letterSpacing="-0.03em"
          mb="28px"
          animation={anim(0.1)}
        >
          <Box as="span" display="block" color={tokens.text}>
            Case
          </Box>
          <Box
            as="span"
            display="block"
            color="transparent"
            style={{ WebkitTextStroke: "1px rgba(240,240,240,0.2)" }}
          >
            Studies
          </Box>
          <Box as="span" display="block" color={tokens.accent2}>
            &amp; Work
          </Box>
        </Box>

        <Text
          fontFamily="serif"
          fontStyle="italic"
          fontSize="18px"
          color={tokens.muted2}
          maxW="520px"
          lineHeight="1.65"
          animation={anim(0.2)}
        >
          Deep technical breakdowns of every system I've built - architecture
          decisions, engineering trade-offs, and the honest assessment of what's
          left to improve.
        </Text>

        <Flex
          gap="40px"
          flexWrap="wrap"
          mt="44px"
          pt="36px"
          borderTop="1px solid"
          borderColor={tokens.border}
          animation={anim(0.35)}
        >
          {[
            { label: "Total Case Studies", value: "3 Published" },
            { label: "Stack", value: "MERN · Full-Stack" },
            { label: "Depth", value: "Architecture Level" },
            { label: "More Coming", value: "Continuously" },
          ].map((s) => (
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
      </Box>
    </Box>
  );
};

export default Hero;
