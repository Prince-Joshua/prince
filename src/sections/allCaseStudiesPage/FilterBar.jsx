import { tokens } from "@/utils/tokens";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const filterOptions = ["All", "Backend", "Frontend", "UI/UX", "Full-Stack"];
const FilterBar = ({ active, onChange }) => {
  return (
    <Flex gap="2px" flexWrap="wrap" mb="48px">
      {filterOptions.map((f) => (
        <Box
          key={f}
          as="button"
          onClick={() => onChange(f)}
          px="18px"
          py="9px"
          bg={active === f ? tokens.accent : tokens.surface}
          color={active === f ? tokens.bg : tokens.muted}
          fontFamily="mono"
          fontSize="10px"
          letterSpacing="0.15em"
          textTransform="uppercase"
          border="1px solid"
          borderColor={active === f ? tokens.accent : tokens.border}
          cursor="pointer"
          transition="all 0.2s"
          _hover={{
            borderColor: tokens.accent,
            color: active === f ? tokens.bg : tokens.accent,
          }}
        >
          {f}
        </Box>
      ))}
    </Flex>
  );
};

export default FilterBar;
