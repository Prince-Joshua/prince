import { tokens } from "@/utils/tokens";
import { Box } from "@chakra-ui/react";
import React from "react";

const CodeBlock = ({ children }) => {
  return (
    <Box
      bg="#0d0d10"
      border="1px solid"
      borderColor={tokens.border}
      px="28px"
      py="24px"
      fontFamily="mono"
      fontSize="12px"
      lineHeight="1.8"
      color={tokens.muted2}
      overflowX="auto"
    >
      <pre
        style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
      >
        {children}
      </pre>
    </Box>
  );
};

export default CodeBlock;
