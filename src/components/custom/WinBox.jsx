import { tokens } from "@/utils/tokens";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const WinBox = ({ children }) => {
  return (
    <Box
      mt="20px"
      bg="rgba(232,255,71,0.04)"
      border="1px solid rgba(232,255,71,0.15)"
      px="24px"
      py="20px"
    >
      <Text
        fontSize="10px"
        letterSpacing="0.25em"
        textTransform="uppercase"
        color={tokens.accent}
        mb="10px"
      >
        Technical Win
      </Text>
      <Text color={tokens.text} fontSize="13px" lineHeight="1.8">
        {children}
      </Text>
    </Box>
  );
};

export default WinBox;
