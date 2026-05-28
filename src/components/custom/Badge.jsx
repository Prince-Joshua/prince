import { tokens } from "@/utils/tokens";
import { Box } from "@chakra-ui/react";
import React from "react";

const Badge = ({ children, variant = "yellow" }) => {
  const map = {
    yellow: {
      color: tokens.accent,
      bg: `rgba(232,255,71,0.08)`,
      border: `rgba(232,255,71,0.25)`,
    },
    blue: {
      color: tokens.accent2,
      bg: `rgba(71,200,255,0.08)`,
      border: `rgba(71,200,255,0.25)`,
    },
    orange: {
      color: tokens.accent3,
      bg: `rgba(255,107,71,0.08)`,
      border: `rgba(255,107,71,0.25)`,
    },
    purple: {
      color: tokens.accent4,
      bg: `rgba(180,127,255,0.08)`,
      border: `rgba(180,127,255,0.25)`,
    },
  };
  const s = map[variant];
  return (
    <Box
      display="inline-flex"
      alignItems="center"
      px="14px"
      py="6px"
      bg={s.bg}
      border={`1px solid ${s.border}`}
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

export default Badge;
