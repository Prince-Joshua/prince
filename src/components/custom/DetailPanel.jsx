import { accentPalette, statusStyles, tokens } from "@/utils/tokens";
import React from "react";
import MotionBox from "./MotionBox";
import {
  Box,
  Flex,
  Grid,
  Text,
  Wrap,
  WrapItem,
  HStack,
  Link,
} from "@chakra-ui/react";
import ImagePlaceholder from "@/sections/allCaseStudiesPage/ImagePlaceholder";

const DetailPanel = ({ project, onClose }) => {
  // const s = statusStyles[project.status];
  // return (
  //   <MotionBox
  //     key={project.id + "-detail"}
  //     initial={{ opacity: 0, height: 0 }}
  //     animate={{ opacity: 1, height: "auto" }}
  //     exit={{ opacity: 0, height: 0 }}
  //     transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
  //     overflow="hidden"
  //   >
  //     <Box
  //       bg={tokens.surface2}
  //       border="1px solid"
  //       borderColor={tokens.border}
  //       borderTop="none"
  //       position="relative"
  //     >
  //       {/* Close button */}
  //       <Box
  //         as="button"
  //         onClick={onClose}
  //         position="absolute"
  //         top="20px"
  //         right="20px"
  //         w="32px"
  //         h="32px"
  //         border="1px solid"
  //         borderColor={tokens.border}
  //         bg={tokens.surface}
  //         color={tokens.muted}
  //         display="flex"
  //         alignItems="center"
  //         justifyContent="center"
  //         fontSize="16px"
  //         cursor="pointer"
  //         transition="all 0.2s"
  //         _hover={{ borderColor: tokens.accent, color: tokens.accent }}
  //         zIndex="2"
  //       >
  //         ×
  //       </Box>

  //       <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="0">
  //         {/* Left — image placeholder */}
  //         <Box
  //           borderRight={{ lg: "1px solid" }}
  //           borderColor={tokens.border}
  //           borderBottom={{ base: "1px solid", lg: "none" }}
  //         >
  //           <ImagePlaceholder
  //             aspect={project.image.aspect}
  //             label={project.image.label}
  //             hint={project.image.hint}
  //             accentIdx={project.image.accent}
  //           />
  //         </Box>

  //         {/* Right — details */}
  //         <Box p={{ base: "32px", md: "40px" }}>
  //           <Text
  //             fontFamily="mono"
  //             fontSize="10px"
  //             letterSpacing="0.25em"
  //             textTransform="uppercase"
  //             color={tokens.accent2}
  //             mb="8px"
  //           >
  //             {project.type}
  //           </Text>
  //           <Text
  //             fontFamily="heading"
  //             fontWeight="800"
  //             fontSize="24px"
  //             letterSpacing="-0.02em"
  //             mb="6px"
  //           >
  //             {project.title}
  //           </Text>
  //           <Text
  //             fontFamily="serif"
  //             fontStyle="italic"
  //             fontSize="13px"
  //             color={tokens.muted2}
  //             mb="20px"
  //           >
  //             {project.tagline}
  //           </Text>

  //           <Text
  //             fontSize="13px"
  //             color={tokens.muted2}
  //             lineHeight="1.85"
  //             mb="24px"
  //           >
  //             {project.longDescription}
  //           </Text>

  //           {/* Metrics */}
  //           <Flex
  //             gap="24px"
  //             flexWrap="wrap"
  //             mb="20px"
  //             py="16px"
  //             borderTop="1px solid"
  //             borderBottom="1px solid"
  //             borderColor={tokens.border}
  //           >
  //             {project.metrics.map((m) => (
  //               <Box key={m.label}>
  //                 <Text
  //                   fontSize="9px"
  //                   letterSpacing="0.2em"
  //                   textTransform="uppercase"
  //                   color={tokens.muted}
  //                   mb="2px"
  //                 >
  //                   {m.label}
  //                 </Text>
  //                 <Text
  //                   fontFamily="heading"
  //                   fontWeight="700"
  //                   fontSize="18px"
  //                   color={tokens.accent}
  //                   lineHeight="1"
  //                 >
  //                   {m.value}
  //                 </Text>
  //               </Box>
  //             ))}
  //           </Flex>

  //           {/* Highlights */}
  //           <Grid templateColumns="1fr 1fr" gap="2px" mb="20px">
  //             {project.highlights.map((h) => (
  //               <Flex
  //                 key={h}
  //                 align="center"
  //                 gap="8px"
  //                 fontSize="11px"
  //                 color={tokens.muted2}
  //                 bg={tokens.surface}
  //                 px="12px"
  //                 py="10px"
  //               >
  //                 <Box
  //                   w="5px"
  //                   h="5px"
  //                   borderRadius="full"
  //                   bg={tokens.accent}
  //                   flexShrink="0"
  //                 />
  //                 {h}
  //               </Flex>
  //             ))}
  //           </Grid>

  //           {/* Tags */}
  //           <Wrap gap="6px" mb="24px">
  //             {project.tags.map((t) => (
  //               <WrapItem key={t}>
  //                 <Box
  //                   px="10px"
  //                   py="4px"
  //                   bg={tokens.surface}
  //                   border="1px solid"
  //                   borderColor={tokens.border}
  //                   color={tokens.muted2}
  //                   fontSize="11px"
  //                   fontFamily="mono"
  //                 >
  //                   {t}
  //                 </Box>
  //               </WrapItem>
  //             ))}
  //           </Wrap>

  //           {/* Links */}
  //           <HStack gap="12px">
  //             {project.links.map((l) => (
  //               <Link
  //                 key={l.label}
  //                 href={l.href}
  //                 px={l.label === "Case Study" ? "20px" : "0"}
  //                 py={l.label === "Case Study" ? "10px" : "0"}
  //                 bg={l.label === "Case Study" ? tokens.accent : "transparent"}
  //                 color={l.label === "Case Study" ? tokens.bg : tokens.muted}
  //                 borderBottom={l.label !== "Case Study" ? "1px solid" : "none"}
  //                 borderColor={tokens.border}
  //                 pb={l.label !== "Case Study" ? "2px" : "0"}
  //                 fontFamily="heading"
  //                 fontWeight={l.label === "Case Study" ? "700" : "400"}
  //                 fontSize="10px"
  //                 letterSpacing="0.15em"
  //                 textTransform="uppercase"
  //                 _hover={
  //                   l.label === "Case Study"
  //                     ? { opacity: 0.85, textDecoration: "none" }
  //                     : {
  //                         color: tokens.accent,
  //                         borderColor: tokens.accent,
  //                         textDecoration: "none",
  //                       }
  //                 }
  //                 transition="all 0.2s"
  //               >
  //                 {l.label} →
  //               </Link>
  //             ))}
  //           </HStack>
  //         </Box>
  //       </Grid>
  //     </Box>
  //   </MotionBox>
  // );

  const a = accentPalette[project.image.accent % 3];

  return (
    <MotionBox
      key={project.id + "-detail"}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      bg={tokens.surface2}
      border="1px solid"
      borderColor={tokens.border}
      borderTop="2px solid"
      borderTopColor={tokens.accent2}
      position="relative"
      mt="2px"
    >
      {/* Top label bar */}
      <Flex
        px={{ base: "24px", md: "36px" }}
        py="14px"
        borderBottom="1px solid"
        borderColor={tokens.border}
        align="center"
        justify="space-between"
        bg={tokens.surface}
      >
        <Flex align="center" gap="10px">
          <Box w="6px" h="6px" borderRadius="full" bg={tokens.accent2} />
          <Text
            fontSize="10px"
            letterSpacing="0.25em"
            textTransform="uppercase"
            color={tokens.accent2}
            fontFamily="mono"
          >
            {project.title} — Full Breakdown
          </Text>
        </Flex>
        <Box
          as="button"
          onClick={onClose}
          w="28px"
          h="28px"
          border="1px solid"
          borderColor={tokens.border}
          bg={tokens.surface2}
          color={tokens.muted}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="14px"
          cursor="pointer"
          transition="all 0.2s"
          _hover={{ borderColor: tokens.accent, color: tokens.accent }}
        >
          ×
        </Box>
      </Flex>

      {/* Landscape body: image left | details right */}
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1.2fr" }}
        gap="0"
        minH="400px"
      >
        {/* Left — image placeholder, fills height */}
        <Box
          borderRight={{ md: "1px solid" }}
          borderColor={tokens.border}
          borderBottom={{ base: "1px solid", md: "none" }}
          display="flex"
          alignItems="stretch"
        >
          <Box
            w="full"
            position="relative"
            minH={{ base: "220px", md: "unset" }}
          >
            <Box position="absolute" inset="0">
              <ImagePlaceholder
                aspect={undefined}
                label={project.image.label}
                hint={project.image.hint}
                accentIdx={project.image.accent}
              />
            </Box>
            {/* Fill to full height on md+ */}
            <Box
              display={{ base: "none", md: "block" }}
              w="full"
              h="full"
              bg={a.color}
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                inset="0"
                backgroundImage={`linear-gradient(${a.border} 1px, transparent 1px), linear-gradient(90deg, ${a.border} 1px, transparent 1px)`}
                backgroundSize="40px 40px"
                opacity="0.4"
              />
              <Flex
                position="absolute"
                inset="0"
                direction="column"
                align="center"
                justify="center"
                gap="10px"
              >
                <Box
                  w="52px"
                  h="52px"
                  border="1px solid"
                  borderColor={a.border}
                  bg={a.color}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="22px"
                >
                  🖼
                </Box>
                <Box textAlign="center">
                  <Text
                    fontSize="10px"
                    fontFamily="mono"
                    letterSpacing="0.15em"
                    textTransform="uppercase"
                    color={a.dot}
                    mb="3px"
                  >
                    {project.image.label}
                  </Text>
                  <Text
                    fontSize="9px"
                    fontFamily="mono"
                    color={tokens.muted}
                    letterSpacing="0.05em"
                  >
                    {project.image.hint}
                  </Text>
                </Box>
              </Flex>
              {/* Corner markers */}
              {[
                {
                  top: "16px",
                  left: "16px",
                  borderTop: `2px solid ${a.border}`,
                  borderLeft: `2px solid ${a.border}`,
                },
                {
                  top: "16px",
                  right: "16px",
                  borderTop: `2px solid ${a.border}`,
                  borderRight: `2px solid ${a.border}`,
                },
                {
                  bottom: "16px",
                  left: "16px",
                  borderBottom: `2px solid ${a.border}`,
                  borderLeft: `2px solid ${a.border}`,
                },
                {
                  bottom: "16px",
                  right: "16px",
                  borderBottom: `2px solid ${a.border}`,
                  borderRight: `2px solid ${a.border}`,
                },
              ].map((pos, i) => (
                <Box key={i} position="absolute" w="16px" h="16px" {...pos} />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Right — scrollable details */}
        <Box
          p={{ base: "28px", md: "36px 40px" }}
          overflowY={{ md: "auto" }}
          maxH={{ md: "560px" }}
        >
          {/* Type + status */}
          <Flex justify="space-between" align="flex-start" gap="12px" mb="16px">
            <Text
              fontFamily="mono"
              fontSize="10px"
              letterSpacing="0.25em"
              textTransform="uppercase"
              color={tokens.accent2}
            >
              {project.type}
            </Text>
            <Box
              fontSize="9px"
              letterSpacing="0.15em"
              textTransform="uppercase"
              px="10px"
              py="4px"
              border="1px solid"
              borderColor={statusStyles[project.status].border}
              color={statusStyles[project.status].color}
              flexShrink="0"
            >
              {statusStyles[project.status].label}
            </Box>
          </Flex>

          <Text
            fontFamily="heading"
            fontWeight="800"
            fontSize={{ base: "22px", md: "26px" }}
            letterSpacing="-0.02em"
            mb="4px"
          >
            {project.title}
          </Text>
          <Text
            fontFamily="serif"
            fontStyle="italic"
            fontSize="13px"
            color={tokens.muted2}
            mb="16px"
          >
            {project.tagline}
          </Text>
          <Text
            fontSize="13px"
            color={tokens.muted2}
            lineHeight="1.85"
            mb="20px"
          >
            {project.longDescription}
          </Text>

          {/* Metrics */}
          <Flex
            gap="20px"
            flexWrap="wrap"
            mb="20px"
            py="14px"
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor={tokens.border}
          >
            {project.metrics.map((m) => (
              <Box key={m.label}>
                <Text
                  fontSize="9px"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color={tokens.muted}
                  mb="2px"
                >
                  {m.label}
                </Text>
                <Text
                  fontFamily="heading"
                  fontWeight="700"
                  fontSize="18px"
                  color={tokens.accent}
                  lineHeight="1"
                >
                  {m.value}
                </Text>
              </Box>
            ))}
          </Flex>

          {/* Highlights */}
          <Grid templateColumns="1fr 1fr" gap="2px" mb="20px">
            {project.highlights.map((h) => (
              <Flex
                key={h}
                align="center"
                gap="8px"
                fontSize="11px"
                color={tokens.muted2}
                bg={tokens.surface}
                px="12px"
                py="10px"
              >
                <Box
                  w="5px"
                  h="5px"
                  borderRadius="full"
                  bg={tokens.accent}
                  flexShrink="0"
                />
                {h}
              </Flex>
            ))}
          </Grid>

          {/* Tags */}
          <Wrap gap="6px" mb="24px">
            {project.tags.map((t) => (
              <WrapItem key={t}>
                <Box
                  px="10px"
                  py="4px"
                  bg={tokens.surface}
                  border="1px solid"
                  borderColor={tokens.border}
                  color={tokens.muted2}
                  fontSize="11px"
                  fontFamily="mono"
                >
                  {t}
                </Box>
              </WrapItem>
            ))}
          </Wrap>

          {/* Links */}
          <HStack gap="12px">
            {project.links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                px={l.label === "Case Study" ? "20px" : "0"}
                py={l.label === "Case Study" ? "10px" : "0"}
                bg={l.label === "Case Study" ? tokens.accent : "transparent"}
                color={l.label === "Case Study" ? tokens.bg : tokens.muted}
                borderBottom={l.label !== "Case Study" ? "1px solid" : "none"}
                borderColor={tokens.border}
                pb={l.label !== "Case Study" ? "2px" : "0"}
                fontFamily="heading"
                fontWeight={l.label === "Case Study" ? "700" : "400"}
                fontSize="10px"
                letterSpacing="0.15em"
                textTransform="uppercase"
                _hover={
                  l.label === "Case Study"
                    ? { opacity: 0.85, textDecoration: "none" }
                    : {
                        color: tokens.accent,
                        borderColor: tokens.accent,
                        textDecoration: "none",
                      }
                }
                transition="all 0.2s"
              >
                {l.label} →
              </Link>
            ))}
          </HStack>
        </Box>
      </Grid>
    </MotionBox>
  );
};

export default DetailPanel;
