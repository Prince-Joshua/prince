import { statusStyles, tokens } from "@/utils/tokens";
import { Box, Flex,Wrap, WrapItem, VStack, Link, Text,  } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

const StudyCard = ({ study, delay = 0 }) => {
  const [hovered, setHovered] = useState(false);
  const s = statusStyles[study.status];
  //  const navigate = useNavigate();
  const MotionBox = motion.create(Box);
  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      bg={tokens.surface}
      position="relative"
      overflow="hidden"
      borderTop="2px solid transparent"
      //  transition="border-color 0.3s"
      _hover={{ borderTopColor: tokens.accent4 }}
      cursor="pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      //  onClick={() => navigate(study.href)}
      display="flex"
      flexDirection="column"
    >
      {/* Ghost index number */}
      <Box
        position="absolute"
        bottom="-20px"
        right="16px"
        fontFamily="heading"
        fontSize="90px"
        fontWeight="800"
        color={tokens.border}
        lineHeight="1"
        pointerEvents="none"
        userSelect="none"
        zIndex="0"
      >
        {study.index}
      </Box>

      {/* Image placeholder */}
      <Box
        borderBottom="1px solid"
        borderColor={tokens.border}
        position="relative"
        zIndex="1"
      >
        <ImagePlaceholder
          aspect={study.image.aspect}
          label={study.image.label}
          hint={study.image.hint}
          index={study.index}
        />
      </Box>

      {/* Content */}
      <Box
        p="32px"
        position="relative"
        zIndex="1"
        flex="1"
        display="flex"
        flexDirection="column"
      >
        {/* Type + status row */}
        <Flex justify="space-between" align="flex-start" gap="12px" mb="14px">
          <Text
            fontSize="10px"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color={tokens.accent2}
            fontFamily="mono"
          >
            {study.type}
          </Text>
          <Box
            fontSize="9px"
            letterSpacing="0.15em"
            textTransform="uppercase"
            px="10px"
            py="4px"
            border="1px solid"
            borderColor={s.border}
            color={s.color}
            flexShrink="0"
          >
            {s.label}
          </Box>
        </Flex>

        <Text
          fontFamily="heading"
          fontWeight="700"
          fontSize="22px"
          mb="8px"
          letterSpacing="-0.01em"
        >
          {study.title}
        </Text>
        <Text
          fontFamily="serif"
          fontStyle="italic"
          fontSize="13px"
          color={tokens.accent2}
          mb="12px"
        >
          {study.subtitle}
        </Text>
        <Text
          fontSize="13px"
          color={tokens.muted2}
          lineHeight="1.8"
          mb="20px"
          flex="1"
        >
          {study.description}
        </Text>

        {/* Metrics row */}
        <Flex
          gap="20px"
          flexWrap="wrap"
          mb="20px"
          py="16px"
          borderTop="1px solid"
          borderColor={tokens.border}
        >
          {study.metrics.map((m) => (
            <Box key={m.label}>
              <Text
                fontSize="9px"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color={tokens.muted}
                mb="2px"
              >
                {m.label}
              </Text>
              <Text
                fontFamily="heading"
                fontWeight="700"
                fontSize="16px"
                color={tokens.accent4}
                lineHeight="1"
              >
                {m.value}
              </Text>
            </Box>
          ))}
        </Flex>

        {/* Tags */}
        <Wrap gap="6px" mb="24px">
          {study.tags.slice(0, 5).map((t) => (
            <WrapItem key={t}>
              <Box
                px="10px"
                py="4px"
                bg={tokens.surface2}
                border="1px solid"
                borderColor={tokens.border}
                color={tokens.muted2}
                fontSize="11px"
                fontFamily="mono"
              >
                {t}
              </Box>
            </WrapItem>
          ))}
          {study.tags.length > 5 && (
            <WrapItem>
              <Box
                px="10px"
                py="4px"
                bg={tokens.surface2}
                border="1px solid"
                borderColor={tokens.border}
                color={tokens.muted}
                fontSize="11px"
                fontFamily="mono"
              >
                +{study.tags.length - 5} more
              </Box>
            </WrapItem>
          )}
        </Wrap>

        {/* Highlights */}
        <VStack gap="2px" align="stretch" mb="24px">
          {study.highlights.map((h) => (
            <Flex
              key={h}
              align="center"
              gap="10px"
              fontSize="12px"
              color={tokens.muted2}
            >
              <Box
                w="5px"
                h="5px"
                borderRadius="full"
                bg={tokens.accent4}
                flexShrink="0"
              />
              {h}
            </Flex>
          ))}
        </VStack>

        {/* CTA */}
        <Link
          href={study.href}
          fontSize="10px"
          letterSpacing="0.15em"
          textTransform="uppercase"
          color={tokens.muted}
          borderBottom="1px solid"
          borderColor={tokens.border}
          pb="2px"
          display="inline-flex"
          alignItems="center"
          gap="4px"
          _hover={{
            color: tokens.accent4,
            borderColor: tokens.accent4,
            textDecoration: "none",
          }}
          transition="all 0.2s"
          onClick={(e) => e.stopPropagation()}
        >
          Read Case Study →
        </Link>
      </Box>
    </MotionBox>
  );
};

export default StudyCard;
