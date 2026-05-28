import { statusStyles, tokens } from "@/utils/tokens";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const categories = ["All", "Full-Stack", "Backend", "Frontend", "UI/UX"];
const statusFilters = ["Any Status", "live", "complete", "wip"];
const statusLabels = {
  "Any Status": "Any Status",
  live: "Live",
  complete: "Complete",
  wip: "In Progress",
};
const FilterBar = ({ activeCategory, activeStatus, onCategory, onStatus }) => {
  return (
    <Flex gap="2px" flexWrap="wrap" align="center" mb="48px">
      {/* Category filters */}
      <Flex gap="2px" flexWrap="wrap">
        {categories.map((c) => (
          <Box
            key={c}
            as="button"
            onClick={() => onCategory(c)}
            px="16px"
            py="9px"
            bg={activeCategory === c ? tokens.accent : tokens.surface}
            color={activeCategory === c ? tokens.bg : tokens.muted}
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.15em"
            textTransform="uppercase"
            border="1px solid"
            borderColor={activeCategory === c ? tokens.accent : tokens.border}
            cursor="pointer"
            transition="all 0.2s"
            _hover={{
              borderColor: tokens.accent,
              color: activeCategory === c ? tokens.bg : tokens.accent,
            }}
          >
            {c}
          </Box>
        ))}
      </Flex>

      {/* Divider */}
      <Box
        w="1px"
        h="32px"
        bg={tokens.border}
        mx="8px"
        display={{ base: "none", md: "block" }}
      />

      {/* Status filters */}
      <Flex gap="2px" flexWrap="wrap">
        {statusFilters.map((st) => {
          const ss = statusStyles[st] || {};
          const isActive = activeStatus === st;
          return (
            <Box
              key={st}
              as="button"
              onClick={() => onStatus(st)}
              px="14px"
              py="9px"
              bg={
                isActive && st !== "Any Status"
                  ? "transparent"
                  : isActive
                    ? tokens.surface2
                    : tokens.surface
              }
              color={
                isActive && st !== "Any Status"
                  ? ss.color
                  : isActive
                    ? tokens.text
                    : tokens.muted
              }
              fontFamily="mono"
              fontSize="10px"
              letterSpacing="0.12em"
              textTransform="uppercase"
              border="1px solid"
              borderColor={
                isActive && st !== "Any Status"
                  ? ss.border
                  : isActive
                    ? tokens.border
                    : tokens.border
              }
              cursor="pointer"
              transition="all 0.2s"
              _hover={{
                borderColor: st !== "Any Status" ? ss.border : tokens.border,
                color: st !== "Any Status" ? ss.color : tokens.text,
              }}
            >
              {statusLabels[st]}
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default FilterBar;
