import { tokens } from "@/utils/tokens";
import { Flex, HStack, Link, Text, Box } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      px={{ base: "24px", md: "60px" }}
      py="60px"
      align="center"
      justify="space-between"
      flexWrap="wrap"
      gap="20px"
      borderTop="1px solid"
      borderColor={tokens.border}
    >
      <Text fontFamily="heading" fontWeight="700" fontSize="18px">
        Prince Joshua{" "}
        <Box as="span" color={tokens.muted} fontWeight="400" fontSize="14px">
          / Projects
        </Box>
      </Text>
      <HStack gap="24px">
        <Link
          href="/"
          fontSize="10px"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color={tokens.muted}
          _hover={{ color: tokens.accent, textDecoration: "none" }}
          transition="color 0.2s"
        >
          ← Back to Portfolio
        </Link>
        <Link
          href="/case-studies"
          fontSize="10px"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color={tokens.muted}
          _hover={{ color: tokens.accent, textDecoration: "none" }}
          transition="color 0.2s"
        >
          Case Studies →
        </Link>
      </HStack>
    </Flex>
  );
};

export default Footer;
