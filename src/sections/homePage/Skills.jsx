import SecLabel from "@/components/custom/SecLabel";
import SkillPill from "@/components/custom/SkillPill";
import { tokens } from "@/utils/tokens";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Text,
  Heading,
  Flex,
  Badge,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionFlex = motion.create(Flex);

const SkillCategory = ({ title, skills, accentColor }) => (
  <Grid
    templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }}
    gap={{ base: 4, md: 8 }}
    py={10}
    borderBottom="1px solid"
    borderColor="brand.border"
  >
    {/* Category Name */}
    <GridItem colSpan={{ base: 12, md: 4 }}>
      <Heading
        as="h4"
        fontFamily="heading"
        fontSize="sm"
        letterSpacing="0.2em"
        color="brand.text"
        textTransform="uppercase"
      >
        {title}
      </Heading>
    </GridItem>

    {/* Skills List */}
    <GridItem colSpan={{ base: 12, md: 8 }}>
      <Flex wrap="wrap" gap={3}>
        {skills.map((skill, index) => (
          <MotionFlex
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <Badge
              bg="transparent"
              border="1px solid"
              borderColor="brand.border"
              color="brand.muted2"
              px={4}
              py={1}
              borderRadius="0"
              fontSize="11px"
              fontFamily="mono"
              textTransform="none"
              _hover={{ borderColor: accentColor, color: accentColor }}
              transition="all 0.2s"
              cursor="default"
            >
              {skill}
            </Badge>
          </MotionFlex>
        ))}
      </Flex>
    </GridItem>
  </Grid>
);

const Skills = () => {
  const categories = [
    {
      title: "Backend",
      pills: [
        "Node.js",
        "Express.js",
        "REST API Design",
        "Zod Validation",
        "JWT Auth",
        "Middleware Patterns",
        "Webhook Verification",
        "express-rate-limit",
      ],
    },
    {
      title: "Database",
      pills: [
        "MongoDB",
        "Mongoose",
        "Aggregation Pipelines",
        "Atomic Ops ($inc)",
        "Cursor Pagination",
        "Multi-doc Transactions",
        "Index Strategy",
      ],
    },
    {
      title: "Frontend",
      pills: [
        "React",
        "Redux Toolkit",
        "HTML / CSS",
        "Responsive Design",
        "React Hot Toast",
        "Component Architecture",
      ],
    },
    {
      title: "Integrations",
      pills: [
        "Paystack API",
        "Cloudinary",
        "Resend (Email)",
        "Socket.io",
        "HMAC Signatures",
        "In-App Notifications",
      ],
    },
    {
      title: "DevOps & Tools",
      pills: [
        "Git / GitHub",
        "MongoDB Atlas",
        "Postman",
        "Environment Config",
        "Error Handling Patterns",
      ],
    },
    {
      title: "Architecture",
      pills: [
        "Modular MVC",
        "CQRS Thinking",
        "Optimistic Locking",
        "Event-Driven Patterns",
        "Redis (path-ready)",
        "BullMQ (planned)",
      ],
    },
  ];

  return (
    <Box
      as="section"
      id="skills"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      <SecLabel>02 — Skills & Stack</SecLabel>
      <Text
        fontFamily="heading"
        fontWeight="800"
        fontSize={{ base: "32px", md: "52px" }}
        lineHeight="1"
        letterSpacing="-0.025em"
        mb="48px"
      >
        What I Build With
      </Text>
      <Grid
        templateColumns={{ base: "1fr 1fr", md: "repeat(3, 1fr)" }}
        gap="2px"
      >
        {categories.map((cat) => (
          <Box
            key={cat.title}
            bg={tokens.surface}
            p="32px 28px"
            borderTop="2px solid transparent"
            transition="border-color 0.3s"
            _hover={{ borderTopColor: tokens.accent }}
          >
            <Text
              fontFamily="heading"
              fontSize="11px"
              fontWeight="700"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color={tokens.muted}
              mb="16px"
            >
              {cat.title}
            </Text>
            <Wrap gap="6px">
              {cat.pills.map((p) => (
                <WrapItem key={p}>
                  <SkillPill>{p}</SkillPill>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        ))}
      </Grid>
    </Box>
  );

  // const skillData = [
  //   {
  //     title: "Frontend Development",
  //     accentColor: "brand.accent",
  //     skills: [
  //       "React.js",
  //       "Vite",
  //       "Chakra UI",
  //       "Framer Motion",
  //       "GSAP",
  //       "Tailwind CSS",
  //       "Redux Toolkit",
  //     ],
  //   },
  //   {
  //     title: "Backend & Database",
  //     accentColor: "brand.accent2",
  //     skills: [
  //       "Node.js",
  //       "Express.js",
  //       "MongoDB",
  //       "Mongoose",
  //       "RESTful APIs",
  //       "JWT Auth",
  //       "Render",
  //     ],
  //   },
  //   {
  //     title: "Engineering Tools",
  //     accentColor: "brand.accent4",
  //     skills: [
  //       "Git",
  //       "GitHub",
  //       "Vercel",
  //       "PWA Integration",
  //       "Postman",
  //       "Figma to Code",
  //       "Clerk Auth",
  //     ],
  //   },
  // ];

  // return (
  //   <Box as="section" id="skills" py={{ base: 20, md: 32 }} bg="brand.bg">
  //     <Container maxW="1100px">
  //       {/* Section Title */}
  //       <Flex align="center" gap={4} mb={16}>
  //         <Heading
  //           as="h2"
  //           fontFamily="heading"
  //           fontSize="xs"
  //           letterSpacing="0.4em"
  //           color="brand.muted"
  //           textTransform="uppercase"
  //         >
  //           Technical Stack
  //         </Heading>
  //         <Box flex={1} h="1px" bg="brand.border" />
  //       </Flex>

  //       {/* Skill Categories */}
  //       <Box borderTop="1px solid" borderColor="brand.border">
  //         {skillData.map((item, index) => (
  //           <SkillCategory key={index} {...item} />
  //         ))}
  //       </Box>
  //     </Container>
  //   </Box>
  // );
};

export default Skills;
