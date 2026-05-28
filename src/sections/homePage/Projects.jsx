import SecLabel from "@/components/custom/SecLabel";
import { tokens } from "@/utils/tokens";
import {
  Box,
  Text,
  HStack,
  Grid,
  Wrap,
  WrapItem,
  Link,
  Flex,
} from "@chakra-ui/react";

const projectsuuu = [
  {
    number: "01",
    title: "MINIMALIST PORTFOLIO",
    category: "Design / Development",
    accentColor: "brand.accent",
    description:
      "A high-end engineering portfolio focused on brutalist aesthetics and performance optimization.",
    tech: ["React", "GSAP", "Three.js"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    link: "#",
  },
  {
    number: "02",
    title: "E-COMMERCE UI",
    category: "Product Design",
    accentColor: "brand.accent2",
    description:
      "Custom storefront architecture with a focus on seamless transitions and conversion-driven UX.",
    tech: ["Next.js", "Framer", "Stripe"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c",
    link: "#",
  },
  {
    number: "03",
    title: "ANALYTICS DASHBOARD",
    category: "SaaS Platform",
    accentColor: "brand.accent3",
    description:
      "Deep data visualization tools and complex state management for enterprise-level applications.",
    tech: ["D3.js", "Redux", "Node"],
    image: "https://images.unsplash.com/photo-1551288049-bbda38a10ad5",
    link: "#",
  },
];

const statusStyles = {
  live: {
    color: "brand.accent",
    border: "rgba(232,255,71,0.3)",
    label: "Live",
  },
  complete: {
    color: "brand.accent4",
    border: "rgba(180,127,255,0.3)",
    label: "Complete",
  },
  wip: {
    color: "brand.accent2",
    border: "rgba(71,200,255,0.3)",
    label: "WIP",
  },
};

const ProjectCard = ({
  index,
  icon,
  status,
  type,
  title,
  description,
  tags,
  links,
}) => {
  const s = statusStyles[status];
  return (
    <Box
      bg={tokens.surface}
      p="36px"
      position="relative"
      overflow="hidden"
      borderTop="2px solid transparent"
      transition="border-color 0.3s"
      _hover={{ borderTopColor: tokens.accent2 }}
    >
      {/* Big ghost number */}
      <Box
        position="absolute"
        bottom="-20px"
        right="16px"
        fontFamily="heading"
        fontSize="90px"
        fontWeight="800"
        color={tokens.border}
        lineHeight="1"
        pointerEvents="none"
        zIndex="0"
        userSelect="none"
      >
        {index}
      </Box>

      <Box position="relative" zIndex="1">
        <Flex justify="space-between" align="flex-start" gap="12px" mb="16px">
          <Flex
            w="42px"
            h="42px"
            bg="rgba(71,200,255,0.08)"
            border="1px solid rgba(71,200,255,0.2)"
            align="center"
            justify="center"
            fontSize="18px"
          >
            {icon}
          </Flex>
          <Box
            fontSize="10px"
            letterSpacing="0.15em"
            textTransform="uppercase"
            px="10px"
            py="4px"
            border="1px solid"
            borderColor={s.border}
            color={s.color}
          >
            {s.label}
          </Box>
        </Flex>

        <Text
          fontSize="10px"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color={tokens.accent2}
          mb="4px"
        >
          {type}
        </Text>
        <Text fontFamily="heading" fontWeight="700" fontSize="20px" mb="14px">
          {title}
        </Text>
        <Text fontSize="13px" color={tokens.muted2} lineHeight="1.8" mb="20px">
          {description}
        </Text>

        <Wrap gap="6px" mb="24px">
          {tags.map((t) => (
            <WrapItem key={t}>
              <Box
                px="10px"
                py="4px"
                bg={tokens.surface2}
                border="1px solid"
                borderColor={tokens.border}
                color={tokens.muted2}
                fontSize="11px"
              >
                {t}
              </Box>
            </WrapItem>
          ))}
        </Wrap>

        <HStack gap="12px">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              fontSize="10px"
              letterSpacing="0.15em"
              textTransform="uppercase"
              color={tokens.muted}
              borderBottom="1px solid"
              borderColor={tokens.border}
              pb="2px"
              _hover={{
                color: tokens.accent,
                borderColor: tokens.accent,
                textDecoration: "none",
              }}
              transition="all 0.2s"
            >
              {l.label} →
            </Link>
          ))}
        </HStack>
      </Box>
    </Box>
  );
};
const Projects = () => {
  const projects = [
    {
      index: "01",
      icon: "🗒️",
      status: "complete",
      type: "Full-Stack App",
      title: "TaskFlow",
      description:
        "A productivity app with real-time task boards, team collaboration, and deadline tracking. Built with drag-and-drop reordering, role-based access control, and optimistic UI updates throughout.",
      tags: ["React", "Node.js", "MongoDB", "Socket.io"],
      links: [
        { label: "GitHub", href: "#" },
        { label: "Live Demo", href: "#" },
      ],
    },
    {
      index: "02",
      icon: "💬",
      status: "live",
      type: "Real-Time App",
      title: "ChatSpace",
      description:
        "A real-time messaging platform with private DMs, group rooms, and read receipts. Features JWT authentication, persistent chat history with cursor-based pagination, and Socket.io rooms.",
      tags: ["React", "Express", "Socket.io", "MongoDB"],
      links: [
        { label: "GitHub", href: "#" },
        { label: "Live Demo", href: "#" },
      ],
    },
    {
      index: "03",
      icon: "📊",
      status: "complete",
      type: "Analytics Dashboard",
      title: "MetricHub",
      description:
        "A business analytics dashboard aggregating sales, traffic, and user data into visual charts. Includes date-range filtering, CSV export, and a MongoDB aggregation pipeline for pre-computed KPIs.",
      tags: ["React", "Recharts", "Node.js", "MongoDB Agg"],
      links: [
        { label: "GitHub", href: "#" },
        { label: "Live Demo", href: "#" },
      ],
    },
    {
      index: "04",
      icon: "🛒",
      status: "wip",
      type: "E-Commerce Frontend",
      title: "ShopUI",
      description:
        "A pixel-precise e-commerce storefront built with React and Redux Toolkit. Features a multi-step checkout, cart persistence, optimistic stock updates, and full mobile responsiveness.",
      tags: ["React", "Redux Toolkit", "CSS Modules", "Paystack"],
      links: [{ label: "GitHub", href: "#" }],
    },
  ];

  return (
    <Box
      as="section"
      id="projects"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      <SecLabel>03 — Projects</SecLabel>
      <Text
        fontFamily="heading"
        fontWeight="800"
        fontSize={{ base: "32px", md: "52px" }}
        lineHeight="1"
        letterSpacing="-0.025em"
        mb="48px"
      >
        Other Work
      </Text>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="2px">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;
