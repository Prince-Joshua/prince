import { tokens } from "@/utils/tokens";
import { Box } from "@chakra-ui/react";
import React from "react";

const StackPill = ({ children }) => {
  return (
    <Box
      px="16px"
      py="8px"
      border="1px solid"
      borderColor={tokens.border}
      color={tokens.muted2}
      fontSize="12px"
      fontFamily="mono"
      transition="all 0.2s"
      cursor="default"
      _hover={{ borderColor: tokens.accent, color: tokens.accent }}
    >
      {children}
    </Box>
  );
};

export default StackPill;
