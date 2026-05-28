import Chip from "@/components/custom/Chip";
import SecLabel from "@/components/custom/SecLabel";
import SubNav from "@/components/custom/SubNav";
import { caseStudies } from "@/constant/caseStudies";
import { tokens } from "@/utils/tokens";
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CaseStudy = () => {
  const id = "sassyblend-api";
  const navigate = useNavigate();

  const report = caseStudies.find((c) => c.id === id)?.featuredCaseStudyData;
  console.log(report);

  const { badges, metrics, title, chips, main } = report || {};
  console.log(chips);

  const dotColors = {
    y: tokens.accent,
    b: tokens.accent2,
    o: tokens.accent3,
    p: tokens.accent4,
  };

  return (
    <Box
      as="section"
      id="case-study"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      <SecLabel>04 — Featured Case Study</SecLabel>
      <Grid
        templateColumns={{ base: "1fr", lg: "1fr auto" }}
        gap="40px"
        bg={tokens.surface}
        border="1px solid"
        borderColor={tokens.border}
        borderLeft="3px solid"
        borderLeftColor={tokens.accent}
        p={{ base: "32px", md: "48px 40px" }}
      >
        {/* Left */}
        <Box>
          {/* Eyebrow */}
          <Flex
            align="center"
            gap="10px"
            mb="12px"
            fontSize="10px"
            letterSpacing="0.25em"
            textTransform="uppercase"
            color={tokens.accent}
            fontFamily="mono"
          >
            <Box w="24px" h="1px" bg={tokens.accent} />
            {title.eyebrow}
          </Flex>

          {/* Big title */}
          <Box
            fontFamily="heading"
            fontWeight="800"
            lineHeight="0.9"
            letterSpacing="-0.03em"
            fontSize={{ base: "40px", md: "clamp(36px,5vw,60px)" }}
            mb="20px"
          >
            <Box as="span" display="block" color={tokens.text}>
              {title.main[0]}
            </Box>
            <Box
              as="span"
              display="block"
              color="transparent"
              style={{ WebkitTextStroke: "1px rgba(240,240,240,0.25)" }}
            >
              {title.main[1]}
            </Box>
            <Box as="span" display="block" color={tokens.accent}>
              {title.main[2]}
            </Box>
          </Box>

          <Text
            fontFamily="serif"
            fontStyle="italic"
            fontSize="16px"
            color={tokens.muted2}
            maxW="560px"
            lineHeight="1.7"
            mb="28px"
          >
            {title.subtitle}
          </Text>

          {/* Metrics */}
          <Flex gap="32px" flexWrap="wrap" mb="28px">
            {metrics.map((m) => (
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
                  fontSize="24px"
                  color={tokens.accent}
                  lineHeight="1"
                >
                  {m.val}
                </Text>
                <Text fontSize="11px" color={tokens.muted2}>
                  {m.sub}
                </Text>
              </Box>
            ))}
          </Flex>

          <Wrap gap="8px" mb="28px">
            {chips?.map((chip, index) => (
              <WrapItem key={index}>
                <Chip variant={chip.variant}>{chip.text}</Chip>
              </WrapItem>
            ))}
          </Wrap>

          <Button
            onClick={() => {
              navigate(`/case-studies/${id}`);
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
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
          >
            Read Full Case Study →
          </Button>
        </Box>

        {/* Right — badge list */}
        <VStack
          gap="2px"
          minW="220px"
          align="stretch"
          display={{ base: "none", lg: "flex" }}
        >
          {badges.map((b, i) => (
            <Flex
              key={i}
              align="center"
              gap="10px"
              bg={tokens.surface2}
              border="1px solid"
              borderColor={tokens.border}
              px="20px"
              py="14px"
              fontSize="11px"
              color={tokens.muted2}
            >
              <Box
                w="6px"
                h="6px"
                borderRadius="full"
                bg={dotColors[b.dot]}
                flexShrink="0"
              />
              {b.text}
            </Flex>
          ))}
        </VStack>
      </Grid>
    </Box>
  );
};

export default CaseStudy;
