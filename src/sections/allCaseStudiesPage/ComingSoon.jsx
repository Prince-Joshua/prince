import { blink } from "@/utils/animations";
import { tokens } from "@/utils/tokens";
import {
  Box,
  Flex,
  Wrap,
  WrapItem,
  VStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

const ComingSoon = () => {
  const MotionBox = motion.create(Box);
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      bg={tokens.surface}
      border="1px solid"
      borderColor={tokens.border}
      borderLeft="2px solid"
      borderLeftColor="rgba(71,200,255,0.4)"
      px={{ base: "32px", md: "48px" }}
      py="40px"
      mt="2px"
    >
      <Flex align="center" justify="space-between" flexWrap="wrap" gap="24px">
        <Box>
          <Flex align="center" gap="8px" mb="8px">
            <Box
              w="7px"
              h="7px"
              borderRadius="full"
              bg={tokens.accent2}
              animation={`${blink} 2s ease-in-out infinite`}
            />
            <Text
              fontSize="10px"
              letterSpacing="0.25em"
              textTransform="uppercase"
              color={tokens.accent2}
              fontFamily="mono"
            >
              More Coming
            </Text>
          </Flex>
          <Text fontFamily="heading" fontWeight="700" fontSize="18px" mb="6px">
            Additional Case Studies in Progress
          </Text>
          <Text fontSize="13px" color={tokens.muted2} lineHeight="1.7" maxW="480px">
            More detailed engineering breakdowns are being written — covering
            new projects, architectural decisions, and technical retrospectives
            as the work ships.
          </Text>
        </Box>
        <Link
          href="/#contact"
          px="24px"
          py="12px"
          bg="transparent"
          color={tokens.accent2}
          border="1px solid rgba(71,200,255,0.3)"
          fontFamily="heading"
          fontWeight="700"
          fontSize="10px"
          letterSpacing="0.15em"
          textTransform="uppercase"
          _hover={{ bg: "rgba(71,200,255,0.06)", textDecoration: "none" }}
          transition="all 0.2s"
          flexShrink="0"
        >
          Get Notified →
        </Link>
      </Flex>
    </MotionBox>
  );
};

export default ComingSoon;
