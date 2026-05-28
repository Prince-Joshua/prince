import { tokens } from "@/utils/tokens";
import { Box } from "@chakra-ui/react";
import React from "react";

const Chip = ({ children, variant = "y" }) => {
  const map = {
    y: {
      color: tokens.accent,
      border: "rgba(232,255,71,0.3)",
      bg: "rgba(232,255,71,0.06)",
    },
    b: {
      color: tokens.accent2,
      border: "rgba(71,200,255,0.3)",
      bg: "rgba(71,200,255,0.06)",
    },
    o: {
      color: tokens.accent3,
      border: "rgba(255,107,71,0.3)",
      bg: "rgba(255,107,71,0.06)",
    },
    p: {
      color: tokens.accent4,
      border: "rgba(180,127,255,0.3)",
      bg: "rgba(180,127,255,0.06)",
    },
  };
  const s = map[variant];
  return (
    <Box
      display="inline-flex"
      alignItems="center"
      px="12px"
      py="5px"
      border={`1px solid ${s.border}`}
      bg={s.bg}
      color={s.color}
      fontSize="11px"
      letterSpacing="0.1em"
      textTransform="uppercase"
      fontFamily="mono"
    >
      {children}
    </Box>
  );
};

export default Chip;
