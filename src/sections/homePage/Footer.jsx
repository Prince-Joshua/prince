import { tokens } from "@/utils/tokens";
import { Box, Flex, Text, Container } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      px={{ base: "24px", md: "60px" }}
      py="50px"
      align="center"
      justify="space-between"
      flexWrap="wrap"
      gap="20px"
    >
      <Text fontFamily="heading" fontWeight="700" fontSize="16px">
        Prince{" "}
        <Box as="span" color={tokens.accent}>
          Joshua
        </Box>
      </Text>
      <Text fontSize="11px" color={tokens.muted}>
        Full-Stack Engineer · MERN Stack · Built with precision ·{" "}
        {new Date().getFullYear()}
      </Text>
    </Flex>
  );
};

export default Footer;
