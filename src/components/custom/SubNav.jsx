import { useEffect, useState } from "react";
import { Box, Container, HStack, Link } from "@chakra-ui/react";
import { tokens } from "@/utils/tokens";

const SubNav = ({ subLinks = [] }) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-96px 0px -70% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    subLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const mainNavHeight = 54;
      const subNavHeight = 40;
      const totalOffset = mainNavHeight + subNavHeight;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - totalOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      as="div"
      position="fixed"
      top="54px"
      zIndex="800"
      bg="rgba(15, 15, 17, 0.75)"
      style={{ backdropFilter: "blur(10px)" }}
      borderBottom="1px solid"
      borderColor={tokens.border}
      h="40px"
      display="flex"
      alignItems="center"
    >
      <Container maxW="container.xl" px={{ base: "24px", md: "60px" }}>
        <HStack as="ul" listStyleType="none" gap="24px">
          {subLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Box as="li" key={link.id}>
                <Box
                  display={"flex"}
                  onClick={() => handleScroll(link.id)}
                  cursor="pointer"
                  fontSize="10px"
                  fontWeight="600"
                  letterSpacing="0.1em"
                  color={isActive ? tokens.accent : tokens.muted}
                  _hover={{ color: tokens.accent, textDecoration: "none" }}
                  transition="color 0.2s"
                >
                  {link.label}
                </Box>
              </Box>
            );
          })}
        </HStack>
      </Container>
    </Box>
  );
};

export default SubNav;
