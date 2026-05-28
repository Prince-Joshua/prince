import SecLabel from "@/components/custom/SecLabel";
import { steps } from "@/constant/servicesPage";
import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";

const Process = () => {
  return (
    <Box
      as="section"
      py="90px"
      borderBottom="1px solid"
      borderColor="brand.border"
    >
      <Box maxW="1100px" mx="auto" px={{ base: "24px", md: "60px" }}>
        <SecLabel>How I Work</SecLabel>

        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap="2px">
          {steps.map(({ num, title, desc }) => (
            <Box
              key={num}
              bg="brand.surface"
              p="32px 28px"
              borderTop="2px solid transparent"
              transition="border-color 0.3s"
              _hover={{ borderTopColor: "brand.accent" }}
              position="relative"
              overflow="hidden"
            >
              <Text
                position="absolute"
                top="-10px"
                right="16px"
                fontFamily="heading"
                fontWeight="800"
                fontSize="80px"
                lineHeight="1"
                color="brand.border"
                pointerEvents="none"
                userSelect="none"
              >
                {num}
              </Text>
              <Text
                fontFamily="heading"
                fontWeight="700"
                fontSize="10px"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color="brand.accent"
                mb="12px"
                position="relative"
                zIndex="1"
              >
                Step {num}
              </Text>
              <Heading
                fontFamily="heading"
                fontWeight="700"
                fontSize="16px"
                mb="10px"
                position="relative"
                zIndex="1"
              >
                {title}
              </Heading>
              <Text
                fontSize="12px"
                color="brand.muted2"
                lineHeight="1.75"
                position="relative"
                zIndex="1"
              >
                {desc}
              </Text>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Process;
