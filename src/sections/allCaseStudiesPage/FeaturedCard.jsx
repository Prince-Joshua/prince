import Chip from "@/components/custom/Chip";
import { tokens } from "@/utils/tokens";
import {
  Box,
  Grid,
  Flex,
  Wrap,
  Link,
  VStack,
  WrapItem,
  Text,
  useStatusStyles,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";


const FeaturedCard = ({ study }) => {
  const [hovered, setHovered] = useState(false);
  const s = useStatusStyles[study.status];

  // const navigate = useNavigate();
  const MotionBox = motion.create(Box);
  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      bg={tokens.surface}
      border="1px solid"
      borderColor={tokens.border}
      borderLeft="3px solid"
      borderLeftColor={tokens.accent}
      position="relative"
      overflow="hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      cursor="pointer"
      // onClick={() => navigate(study.href)}
    >
      {/* Featured badge */}
      <Box
        position="absolute"
        top="0"
        right="0"
        px="16px"
        py="7px"
        bg={tokens.accent}
        color={tokens.bg}
        fontSize="9px"
        letterSpacing="0.25em"
        textTransform="uppercase"
        fontFamily="mono"
        fontWeight="700"
        zIndex="2"
      >
        Featured
      </Box>

      <Grid templateColumns={{ base: "1fr", lg: "1.1fr 0.9fr" }} gap="0">
        {/* Left — content */}
        <Box
          p={{ base: "32px", md: "48px 40px" }}
          borderRight={{ lg: "1px solid" }}
          borderColor={tokens.border}
        >
          {/* Eyebrow */}
          <Flex align="center" gap="10px" mb="12px">
            <Box w="24px" h="1px" bg={tokens.accent} />
            <Text
              fontSize="10px"
              letterSpacing="0.25em"
              textTransform="uppercase"
              color={tokens.accent}
              fontFamily="mono"
            >
              {study.type}
            </Text>
          </Flex>

          {/* Title */}
          <Box
            fontFamily="heading"
            fontWeight="800"
            lineHeight="0.9"
            letterSpacing="-0.03em"
            fontSize={{ base: "44px", md: "clamp(36px,5vw,60px)" }}
            mb="20px"
          >
            <Box as="span" display="block" color={tokens.text}>
              {study.title.split(" ")[0]}
            </Box>
            {study.title.split(" ").slice(1).length > 0 && (
              <Box
                as="span"
                display="block"
                color="transparent"
                style={{ WebkitTextStroke: "1px rgba(240,240,240,0.25)" }}
              >
                {study.title.split(" ").slice(1).join(" ")}
              </Box>
            )}
            <Box
              as="span"
              display="block"
              color={tokens.accent}
              fontSize="clamp(20px,2.5vw,28px)"
              mt="8px"
              fontWeight="600"
              letterSpacing="-0.01em"
            >
              {study.subtitle}
            </Box>
          </Box>

          <Text
            fontFamily="serif"
            fontStyle="italic"
            fontSize="15px"
            color={tokens.muted2}
            maxW="520px"
            lineHeight="1.75"
            mb="28px"
          >
            {study.description}
          </Text>

          {/* Metrics */}
          <Flex gap="28px" flexWrap="wrap" mb="24px">
            {study.metrics.map((m) => (
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
                  fontWeight="700"
                  fontSize="22px"
                  color={tokens.accent}
                  lineHeight="1"
                >
                  {m.value}
                </Text>
              </Box>
            ))}
          </Flex>

          <Wrap gap="8px" mb="28px">
            {study.chips.map((c) => (
              <WrapItem key={c.label}>
                <Chip variant={c.variant}>{c.label}</Chip>
              </WrapItem>
            ))}
          </Wrap>

          <Link
            href={study.href}
            display="inline-flex"
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
            onClick={(e) => e.stopPropagation()}
          >
            Read Full Case Study →
          </Link>
        </Box>

        {/* Right — image + highlights */}
        <VStack gap="0" align="stretch">
          {/* Image placeholder */}
          <Box borderBottom="1px solid" borderColor={tokens.border}>
            <ImagePlaceholder
              aspect={study.image.aspect}
              label={study.image.label}
              hint={study.image.hint}
              index={study.index}
            />
          </Box>

          {/* Highlights list */}
          <VStack gap="0" align="stretch" flex="1">
            {study.highlights.map((h, i) => (
              <Flex
                key={h}
                align="center"
                gap="10px"
                bg={i % 2 === 0 ? tokens.surface : tokens.surface2}
                border="1px solid"
                borderColor={tokens.border}
                borderTop="none"
                px="20px"
                py="16px"
                fontSize="12px"
                color={tokens.muted2}
              >
                <Box
                  w="6px"
                  h="6px"
                  borderRadius="full"
                  bg={tokens.accent}
                  flexShrink="0"
                />
                {h}
              </Flex>
            ))}
          </VStack>
        </VStack>
      </Grid>
    </MotionBox>
  );
};

export default FeaturedCard;
