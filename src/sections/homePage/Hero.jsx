import { anim, blink, gridShift, pulse } from "@/utils/animations";
import { tokens } from "@/utils/tokens";
import { Box, Text, HStack, Flex, Link } from "@chakra-ui/react";

import React from "react";

const Hero = () => {
  return (
    <Box
      as="header"
      id="home"
      position="relative"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      px={{ base: "24px", md: "60px" }}
      pt="120px"
      pb={{ base: "60px", md: "80px" }}
      borderBottom="1px solid"
      borderColor={tokens.border}
      overflow="hidden"
    >
      {/* Animated grid */}
      <Box
        position="absolute"
        inset="0"
        backgroundImage={`linear-gradient(#222228 1px, transparent 1px), linear-gradient(90deg, #222228 1px, transparent 1px)`}
        backgroundSize="60px 60px"
        opacity="0.35"
        animation={`${gridShift} 22s linear infinite`}
      />
      {/* Glows */}
      <Box
        position="absolute"
        w="800px"
        h="800px"
        borderRadius="full"
        background="radial-gradient(circle, rgba(232,255,71,0.06) 0%, transparent 65%)"
        top="-250px"
        right="-150px"
        animation={`${pulse} 7s ease-in-out infinite`}
      />
      <Box
        position="absolute"
        w="500px"
        h="500px"
        borderRadius="full"
        background="radial-gradient(circle, rgba(71,200,255,0.05) 0%, transparent 65%)"
        bottom="-50px"
        left="100px"
        animation={`${pulse} 9s ease-in-out infinite reverse`}
      />

      {/* Content */}
      <Box position="relative" zIndex="2">
        {/* Availability badge */}
        <Flex
          align="center"
          gap="8px"
          mb="32px"
          fontSize="10px"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color={tokens.accent}
          fontFamily="mono"
          animation={anim(0)}
        >
          <Box
            w="7px"
            h="7px"
            borderRadius="full"
            bg={tokens.accent}
            animation={`${blink} 2s ease-in-out infinite`}
          />
          Available for opportunities
        </Flex>

        {/* Big name */}
        <Box
          fontFamily="heading"
          fontWeight="800"
          lineHeight="0.9"
          letterSpacing="-0.03em"
          fontSize={{ base: "40px", md: "clamp(36px,5vw,60px)" }}
          mb="20px"
          animation={anim(0.1)}
        >
          <Box as="span" display="block" color={tokens.text}>
            Prince
          </Box>
          <Box
            as="span"
            display="block"
            color="transparent"
            style={{ WebkitTextStroke: "1px rgba(240,240,240,0.25)" }}
          >
            Joshua
          </Box>
          <Box as="span" display="block" color={tokens.accent}>
            Engineer
          </Box>
        </Box>

        {/* Subtitle */}
        <Text
          fontFamily="serif"
          fontStyle="italic"
          fontSize="20px"
          color={tokens.muted2}
          mt="28px"
          maxW="560px"
          lineHeight="1.6"
          animation={anim(0.2)}
        >
          Full-Stack engineer specialising in the MERN stack — building
          production-grade systems with strong architecture, clean APIs, and
          interfaces that hold up at scale.
        </Text>

        {/* CTA buttons */}
        <HStack gap="16px" mt="44px" flexWrap="wrap" animation={anim(0.35)}>
          <Link
            href="case-studies"
            px="28px"
            py="14px"
            bg={tokens.accent}
            color={tokens.bg}
            fontFamily="heading"
            fontWeight="700"
            fontSize="11px"
            letterSpacing="0.15em"
            textTransform="uppercase"
            _hover={{ opacity: 0.85, textDecoration: "none" }}
            transition="opacity 0.2s"
          >
            View Case Study
          </Link>
          <Link
            href="projects"
            px="28px"
            py="14px"
            bg="transparent"
            color={tokens.text}
            border="1px solid"
            borderColor={tokens.border}
            fontFamily="heading"
            fontWeight="700"
            fontSize="11px"
            letterSpacing="0.15em"
            textTransform="uppercase"
            _hover={{
              borderColor: tokens.accent,
              color: tokens.accent,
              textDecoration: "none",
            }}
            transition="all 0.2s"
          >
            See Projects
          </Link>
        </HStack>

        {/* Stats row */}
        <Flex
          gap="40px"
          flexWrap="wrap"
          mt="60px"
          pt="40px"
          borderTop="1px solid"
          borderColor={tokens.border}
          animation={anim(0.45)}
        >
          {[
            { label: "Stack", value: "MERN · Node · React" },
            { label: "Focus", value: "Full-Stack · Backend Arch" },
            { label: "Market", value: "Global · Nigeria" },
            { label: "Status", value: "Open to Hire" },
          ].map((s) => (
            <Box key={s.label}>
              <Text
                fontSize="10px"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color={tokens.muted}
                mb="4px"
              >
                {s.label}
              </Text>
              <Text
                fontFamily="heading"
                fontWeight="700"
                fontSize="13px"
                color={tokens.text}
              >
                {s.value}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Scroll hint */}
      <Flex
        position="absolute"
        bottom="32px"
        left={{ base: "24px", md: "60px" }}
        align="center"
        gap="10px"
        fontSize="10px"
        letterSpacing="0.2em"
        textTransform="uppercase"
        color={tokens.muted}
        zIndex="2"
        animation={anim(0.6)}
      >
        <Box
          w="1px"
          h="40px"
          bg={`linear-gradient(180deg, transparent, #666672)`}
        />
        Scroll to explore
      </Flex>
    </Box>
  );

  //   <Box
  //     position="relative"
  //     minH="100vh"
  //     bg="brand.bg"
  //     display="flex"
  //     flexDirection="column"
  //     justifyContent="flex-end"
  //     padding={{ base: "90px 24px 60px", md: "120px 60px 80px" }}
  //     borderBottom="1px solid"
  //     borderColor="brand.border"
  //     overflow="hidden"
  //   >
  //     {/* 1. Animated Blueprint Grid */}
  //     <MotionBox
  //       position="absolute"
  //       inset={0}
  //       backgroundImage={`
  //         linear-gradient(var(--chakra-colors-brand-border) 1px, transparent 1px),
  //         linear-gradient(90deg, var(--chakra-colors-brand-border) 1px, transparent 1px)
  //       `}
  //       backgroundSize="60px 60px"
  //       opacity={0.35}
  //       animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
  //       transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
  //     />

  //     {/* 2. Radial Glow Effects */}
  //     <Box
  //       position="absolute"
  //       top="-250px"
  //       right="-150px"
  //       w="800px"
  //       h="800px"
  //       borderRadius="full"
  //       bg="radial-gradient(circle, rgba(232,255,71,0.06) 0%, transparent 65%)"
  //       as={motion.div}
  //       animate={{ scale: [1, 1.12, 1], opacity: [1, 0.6, 1] }}
  //       transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
  //     />

  //     <Box
  //       position="absolute"
  //       bottom="-50px"
  //       left="100px"
  //       w="500px"
  //       h="500px"
  //       borderRadius="full"
  //       bg="radial-gradient(circle, rgba(71,200,255,0.05) 0%, transparent 65%)"
  //       as={motion.div}
  //       animate={{ scale: [1, 1.12, 1], opacity: [1, 0.6, 1] }}
  //       transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
  //     />

  //     <Box position="relative" zIndex={2}>
  //       {/* Availability Badge */}
  //       <MotionBox
  //         display="inline-flex"
  //         alignItems="center"
  //         gap={"8px"}
  //         mb={"32px"}
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.7 }}
  //       >
  //         <Box
  //           w="7px"
  //           h="7px"
  //           bg="brand.accent"
  //           borderRadius="full"
  //           as={motion.div}
  //           animate={{ opacity: [1, 0.3, 1] }}
  //           transition={{ duration: 2, repeat: Infinity }}
  //         />
  //         <Text
  //           fontSize="10px"
  //           letterSpacing="0.2em"
  //           textTransform="uppercase"
  //           color="brand.accent"
  //           fontFamily="mono"
  //         >
  //           Available for opportunities
  //         </Text>
  //       </MotionBox>

  //       {/* 3. Hero Typography */}
  //       <Stack align="flex-start" gap={0}>
  //         <MotionText
  //           fontFamily="heading"
  //           fontSize="clamp(58px, 9vw, 120px)"
  //           fontWeight="800"
  //           lineHeight="0.88"
  //           letterSpacing="-0.03em"
  //           color="brand.text"
  //           initial={{ opacity: 0, y: 30 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ delay: 0.1, duration: 0.7 }}
  //         >
  //           Prince
  //         </MotionText>
  //         <MotionText
  //           fontFamily="heading"
  //           fontSize="clamp(48px, 15vw, 80px)"
  //           fontWeight="800"
  //           lineHeight="0.88"
  //           letterSpacing="-0.03em"
  //           color="transparent"
  //           style={{
  //             WebkitTextStroke: "1px rgba(240,240,240,0.25)",
  //             fill: "transparent",
  //           }}
  //           initial={{ opacity: 0, y: 30 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ delay: 0.2, duration: 0.7 }}
  //         >
  //           Joshua
  //         </MotionText>
  //         <MotionText
  //           fontFamily="heading"
  //           fontSize="clamp(58px, 9vw, 120px)"
  //           fontWeight="800"
  //           lineHeight="0.88"
  //           letterSpacing="-0.03em"
  //           color="brand.accent"
  //           initial={{ opacity: 0, y: 30 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ delay: 0.3, duration: 0.7 }}
  //         >
  //           Engineer
  //         </MotionText>
  //       </Stack>

  //       {/* 4. Role Description */}
  //       <MotionText
  //         fontFamily="Instrument Serif, serif"
  //         fontStyle="italic"
  //         fontSize="20px"
  //         color="brand.muted2"
  //         maxW="560px"
  //         lineHeight="1.6"
  //         mt={"28px"}
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ delay: 0.4, duration: 0.7 }}
  //       >
  //         Full-Stack engineer specialising in the MERN stack — building
  //         production-grade systems with strong architecture, clean APIs, and
  //         interfaces that hold up at scale.
  //       </MotionText>

  //       {/* 5. CTA Actions */}
  //       <HStack gap={4} wrap="wrap" mb={12} mt={"44px"}>
  //         <Button
  //           as="a"
  //           href="#case-study"
  //           bg="brand.accent"
  //           color="brand.bg"
  //           fontFamily="heading"
  //           fontWeight="700"
  //           fontSize="11px"
  //           letterSpacing="0.15em"
  //           borderRadius="0"
  //           px={7}
  //           h="48px"
  //           _hover={{ opacity: 0.85 }}
  //           transition={"all 0.2s"}
  //         >
  //           VIEW CASE STUDY
  //         </Button>
  //         <Button
  //           as="a"
  //           href="#projects"
  //           bg="transparent"
  //           border="1px solid"
  //           borderColor="brand.border"
  //           color="brand.text"
  //           fontFamily="heading"
  //           fontWeight="700"
  //           fontSize="11px"
  //           letterSpacing="0.15em"
  //           borderRadius="0"
  //           px={7}
  //           h="48px"
  //           _hover={{ borderColor: "brand.accent", color: "brand.accent" }}
  //           transition={"all 0.2s"}
  //         >
  //           SEE PROJECTS
  //         </Button>
  //       </HStack>

  //       {/* 6. Stats Section */}
  //       <HStack
  //         pt={10}
  //         borderTop="1px solid"
  //         borderColor="brand.border"
  //         gap={{ base: "4px", md: "40px" }}
  //         wrap="wrap"
  //         as={motion.div}
  //         initial={{ opacity: 0 }}
  //         whileInView={{ opacity: 1 }}
  //         transition={{ delay: 0.5, duration: 0.7 }}
  //       >
  //         {[
  //           { label: "Stack", val: "MERN · Node · React" },
  //           { label: "Focus", val: "Full-Stack · Backend Arch" },
  //           { label: "Market", val: "Global · Nigeria" },
  //           { label: "Status", val: "Open to Hire" },
  //         ].map((stat, i) => (
  //           <VStack key={i} align="flex-start" gap={1}>
  //             <Text
  //               fontSize="10px"
  //               letterSpacing="0.2em"
  //               textTransform="uppercase"
  //               color="brand.muted"
  //               mb={1}
  //             >
  //               {stat.label}
  //             </Text>
  //             <Text
  //               fontFamily="heading"
  //               fontWeight="700"
  //               fontSize="13px"
  //               color="brand.text"
  //             >
  //               {stat.val}
  //             </Text>
  //           </VStack>
  //         ))}
  //       </HStack>
  //     </Box>

  //     {/* Scroll Hint */}
  //     <HStack
  //       position="absolute"
  //       bottom="32px"
  //       left={{ base: "24px", md: "60px" }}
  //       gap={3}
  //     >
  //       <Box
  //         w="1px"
  //         h="40px"
  //         bgGradient="to-b"
  //         gradientFrom="transparent"
  //         gradientTo="brand.muted"
  //       />
  //       <Text
  //         fontSize="10px"
  //         letterSpacing="0.2em"
  //         textTransform="uppercase"
  //         color="brand.muted"
  //       >
  //         Scroll to explore
  //       </Text>
  //     </HStack>
  //   </Box>
  // );
};

export default Hero;
