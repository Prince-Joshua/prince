import Chip from "@/components/custom/Chip";
import SecLabel from "@/components/custom/SecLabel";
import SkillPill from "@/components/custom/SkillPill";
import { services } from "@/constant/servicesPage";
import { scanline } from "@/utils/animations";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

const Services = () => {
  return (
    <Box
      as="section"
      py="90px"
      borderBottom="1px solid"
      borderColor="brand.border"
    >
      <Box maxW="1100px" mx="auto" px={{ base: "24px", md: "60px" }}>
        <SecLabel>01 — Services</SecLabel>
        <VStack spacing="2px" align="stretch">
          {services.map((s, i) => (
            <ServiceCard key={s.idx} s={s} reversed={i % 2 !== 0} />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

const ServiceCard = ({ s, reversed }) => (
  <Grid
    templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
    gap="2px"
    direction={reversed ? "rtl" : "ltr"}
  >
    {/* ── Info panel ── */}
    <Box
      bg="brand.surface"
      p={{ base: "36px 28px", md: "52px 44px" }}
      borderTop={`2px solid`}
      borderTopColor={s.accent}
      order={{ base: 0, lg: reversed ? 1 : 0 }}
    >
      {/* Eyebrow */}
      <Flex align="center" gap="12px" mb="28px">
        <Text
          fontFamily="heading"
          fontWeight="700"
          fontSize="clamp(28px, 4vw, 36px)"
          color={s.accent}
          lineHeight="1"
        >
          {s.icon}
        </Text>
        <Chip variant={s.chip.variant}>{s.chip.label}</Chip>
      </Flex>

      {/* Index + label */}
      <Text
        fontSize="10px"
        letterSpacing="0.25em"
        textTransform="uppercase"
        color="brand.muted"
        mb="8px"
      >
        {s.idx} —
      </Text>
      <Heading
        fontFamily="heading"
        fontWeight="800"
        fontSize="clamp(26px, 3.5vw, 36px)"
        lineHeight="1.05"
        letterSpacing="-0.025em"
        mb="8px"
      >
        {s.label}
      </Heading>
      <Text
        fontFamily="serif"
        fontStyle="italic"
        fontSize="16px"
        color={s.accent}
        mb="24px"
        lineHeight="1.4"
      >
        {s.tagline}
      </Text>

      {/* Description */}
      <Text fontSize="14px" color="brand.muted2" lineHeight="1.9" mb="32px">
        {s.description}
      </Text>

      {/* Tags */}
      <Wrap spacing="6px" mb="36px">
        {s.tags.map((t) => (
          <WrapItem key={t}>
            <SkillPill>{t}</SkillPill>
          </WrapItem>
        ))}
      </Wrap>

      {/* CTA */}
      <Link
        href="/#contact"
        display="inline-flex"
        alignItems="center"
        gap="10px"
        fontFamily="heading"
        fontWeight="700"
        fontSize="11px"
        letterSpacing="0.15em"
        textTransform="uppercase"
        color="brand.bg"
        bg={s.accent}
        px="28px"
        py="14px"
        transition="opacity 0.2s"
        _hover={{ opacity: 0.85 }}
      >
        {s.cta} →
      </Link>
    </Box>

    {/* ── Deliverables panel ── */}
    <Box
      bg="brand.surface"
      p={{ base: "36px 28px", md: "52px 44px" }}
      borderTop="2px solid"
      borderTopColor="brand.border"
      order={{ base: 1, lg: reversed ? 0 : 1 }}
      position="relative"
      overflow="hidden"
    >
      {/* Ghost index number */}
      <Box
        position="absolute"
        bottom="-24px"
        right="20px"
        fontFamily="heading"
        fontWeight="800"
        fontSize="140px"
        lineHeight="1"
        color="brand.border"
        pointerEvents="none"
        zIndex="0"
        userSelect="none"
      >
        {s.idx}
      </Box>

      {/* Scan line decoration */}
      <Box
        position="absolute"
        left="0"
        right="0"
        h="1px"
        bg={`rgba(${s.accentRgb}, 0.15)`}
        animation={`${scanline} 6s linear infinite`}
        zIndex="0"
      />

      <Text
        fontFamily="heading"
        fontSize="11px"
        letterSpacing="0.2em"
        textTransform="uppercase"
        color="brand.muted"
        mb="28px"
        position="relative"
        zIndex="1"
      >
        What's Included
      </Text>

      <VStack spacing="2px" align="stretch" position="relative" zIndex="1">
        {s.deliverables.map((d, i) => (
          <Flex
            key={d}
            align="flex-start"
            gap="14px"
            bg="brand.surface2"
            border="1px solid"
            borderColor="brand.border"
            px="20px"
            py="16px"
            borderLeft="2px solid transparent"
            transition="border-left-color 0.25s"
            _hover={{ borderLeftColor: s.accent }}
          >
            {/* Number */}
            <Text
              fontFamily="heading"
              fontWeight="700"
              fontSize="10px"
              color={s.accent}
              mt="2px"
              flexShrink="0"
            >
              {String(i + 1).padStart(2, "0")}
            </Text>
            <Text fontSize="13px" color="brand.muted2" lineHeight="1.6">
              {d}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  </Grid>
);

export default Services;
