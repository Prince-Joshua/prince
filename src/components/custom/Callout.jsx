import { tokens } from "@/utils/tokens";
import { Box } from "@chakra-ui/react";
import React from "react";

const Callout = ({ children }) => {
  return (
    <Box
      border="1px solid"
      borderColor={tokens.border}
      borderLeft="3px solid"
      borderLeftColor={tokens.accent2}
      bg="rgba(71,200,255,0.03)"
      px="24px"
      py="20px"
      my="20px"
      fontSize="13px"
      color={tokens.muted2}
      lineHeight="1.8"
    >
      {children}
    </Box>
  );
};

export default Callout;
