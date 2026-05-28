import { tokens } from "@/utils/tokens";
import { Box, Flex, Text } from "@chakra-ui/react";

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
    >
      <Text fontFamily="heading" fontWeight="700" fontSize="18px">
        SassyBlend API{" "}
        <Box as="span" color={tokens.muted} fontWeight="400" fontSize="14px">
          / Engineering Case Study
        </Box>
      </Text>
      <Text fontSize="12px" color={tokens.muted}>
        Sole Architect & Engineer · MERN Stack · 2024
      </Text>
    </Flex>
  );
};

export default Footer;
