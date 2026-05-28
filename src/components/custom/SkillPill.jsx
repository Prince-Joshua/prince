import { tokens } from "@/utils/tokens";
import { Box } from "@chakra-ui/react";
import React from "react";

const SkillPill = ({ children }) => {
  return (
    <Box
      px="12px"
      py="5px"
      border="1px solid"
      borderColor={tokens.border}
      color={tokens.muted2}
      fontSize="11px"
      fontFamily="mono"
      cursor="default"
      transition="all 0.2s"
      _hover={{ borderColor: tokens.accent, color: tokens.accent }}
    >
      {children}
    </Box>
  );
};

export default SkillPill;
