import MotionBox from "@/components/custom/MotionBox";
import { projects } from "@/constant/projects";
import { tokens } from "@/utils/tokens";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const StatsBar = () => {
  const total = projects.length;
  const live = projects.filter((p) => p.status === "live").length;
  const complete = projects.filter((p) => p.status === "complete").length;
  const wip = projects.filter((p) => p.status === "wip").length;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      bg={tokens.surface}
      border="1px solid"
      borderColor={tokens.border}
      borderLeft="2px solid"
      borderLeftColor={tokens.accent}
      mb="2px"
    >
      <Flex px={{ base: "24px", md: "40px" }} py="20px" gap="0" flexWrap="wrap">
        {[
          { label: "Total", value: total, color: tokens.text },
          { label: "Live", value: live, color: tokens.accent },
          { label: "Complete", value: complete, color: tokens.accent4 },
          { label: "In Progress", value: wip, color: tokens.accent2 },
        ].map((s, i) => (
          <Flex key={s.label} align="center" gap="0" flex="1" minW="100px">
            {i > 0 && <Box w="1px" h="32px" bg={tokens.border} />}
            <Box mr="24px">
              <Text
                fontFamily="heading"
                fontWeight="800"
                fontSize="28px"
                color={s.color}
                lineHeight="1"
              >
                {s.value}
              </Text>
              <Text
                fontSize="9px"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color={tokens.muted}
                mt="2px"
              >
                {s.label}
              </Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </MotionBox>
  );
};

export default StatsBar;
