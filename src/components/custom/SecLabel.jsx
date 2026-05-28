import { tokens } from "@/utils/tokens";
import { Box, Flex, Text } from "@chakra-ui/react";

const SecLabel = ({ children }) => {
  return (
    <Flex align="center" gap="16px" mb="48px">
      <Text
        fontSize="10px"
        letterSpacing="0.3em"
        textTransform="uppercase"
        color={tokens.accent}
        fontFamily="mono"
        whiteSpace="nowrap"
      >
        {children}
      </Text>
      <Box
        flex="1"
        h="1px"
        bg={`linear-gradient(90deg, {colors.brand.border}, transparent)`}
      />
    </Flex>
  );
};

export default SecLabel;
