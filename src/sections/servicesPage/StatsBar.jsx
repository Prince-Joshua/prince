import { Box, Grid, Text } from "@chakra-ui/react";
import React from "react";

const StatsBar = () => {
  const stats = [
    { label: "Response Time", value: "<100ms", sub: "core API queries" },
    { label: "Ghost Orders", value: "Zero", sub: "across all sessions" },
    { label: "Projects Shipped", value: "4+", sub: "production-grade" },
    { label: "Stack Ownership", value: "100%", sub: "end-to-end" },
    { label: "Availability", value: "Open", sub: "taking new clients" },
  ];

  return (
    <Box borderBottom="1px solid" borderColor="brand.border">
      <Box maxW="1100px" mx="auto" px={{ base: "24px", md: "60px" }}>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: `repeat(${stats.length}, 1fr)`,
          }}
          gap="2px"
        >
          {stats.map(({ label, value, sub }) => (
            <Box
              key={label}
              bg="brand.surface"
              px="28px"
              py="32px"
              borderTop="2px solid transparent"
              transition="border-color 0.3s"
              _hover={{ borderTopColor: "brand.accent" }}
            >
              <Text
                fontSize="10px"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color="brand.muted"
                mb="6px"
              >
                {label}
              </Text>
              <Text
                fontFamily="heading"
                fontWeight="700"
                fontSize="26px"
                color="brand.accent"
                lineHeight="1"
              >
                {value}
              </Text>
              <Text fontSize="11px" color="brand.muted2" mt="4px">
                {sub}
              </Text>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default StatsBar;
