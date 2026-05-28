import { tokens } from "@/utils/tokens";
import { Flex, HStack, Box, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HamburgerIcon = ({ isOpen }) => (
  <Box
    w="22px"
    h="16px"
    position="relative"
    display="flex"
    flexDir="column"
    justify="space-between"
  >
    <Box
      as="span"
      display="block"
      h="1.5px"
      bg="brand.text"
      transition="all 0.3s ease"
      transform={isOpen ? "translateY(7px) rotate(45deg)" : "none"}
    />
    <Box
      as="span"
      display="block"
      h="1.5px"
      bg="brand.text"
      transition="all 0.3s ease"
      opacity={isOpen ? 0 : 1}
      transform={isOpen ? "scaleX(0)" : "scaleX(1)"}
    />
    <Box
      as="span"
      display="block"
      h="1.5px"
      bg="brand.text"
      transition="all 0.3s ease"
      transform={isOpen ? "translateY(-7px) rotate(-45deg)" : "none"}
    />
  </Box>
);

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Case Studies", path: "/case-studies" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact", mobileOnly: true },
  ];

  return (
    <Box ref={menuRef}>
      {/* ── Bar ── */}
      <Box
        as="nav"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="900"
        bg="rgba(10,10,11,0.88)"
        backdropFilter="blur(14px)"
        borderBottom="1px solid"
        borderColor="brand.border"
        px={{ base: "24px", md: "60px" }}
        h="54px"
      >
        <Flex h="100%" align="center" justify="space-between">
          <Text
            onClick={() => navigate("/")}
            fontFamily="heading"
            fontWeight="700"
            fontSize="13px"
            letterSpacing="0.02em"
            color="brand.text"
          >
            Prince{" "}
            <Box as="span" color="brand.accent">
              Joshua
            </Box>
          </Text>

          {/* Desktop links */}
          <HStack
            as="ul"
            gap="28px"
            listStyleType="none"
            display={{ base: "none", md: "flex" }}
          >
            {links
              .filter((link) => !link.mobileOnly)
              .map((link) => {
                const isActive =
                  link.path === "/"
                    ? location.pathname === link.path
                    : location.pathname.startsWith(link.path);

                return (
                  <Box as="li" key={link.label}>
                    <Text
                      onClick={() => navigate(link.path)}
                      fontSize="10px"
                      letterSpacing="0.2em"
                      textTransform="uppercase"
                      color={isActive ? tokens.accent : tokens.muted}
                      borderBottom={isActive ? "1px solid" : "none"}
                      borderColor={tokens.accent}
                      pb={isActive ? "1px" : "0"}
                      pointerEvents={isActive ? "none" : "auto"}
                      cursor={isActive ? "default" : "pointer"}
                      _hover={{
                        color: tokens.accent,
                        textDecoration: "none",
                      }}
                      transition="color 0.2s"
                    >
                      {link.label}
                    </Text>
                  </Box>
                );
              })}
          </HStack>

          <Flex align="center" gap="16px">
            {/* Hire Me — tablet and above only */}
            <Text
              display={{ base: "none", md: "block" }}
              onClick={() => navigate("/contact")}
              px="18px"
              py="8px"
              bg={tokens.accent}
              color={tokens.bg}
              fontFamily="heading"
              fontWeight="700"
              fontSize="10px"
              letterSpacing="0.15em"
              textTransform="uppercase"
              _hover={{
                opacity: 0.85,
                textDecoration: "none",
              }}
              transition="opacity 0.2s"
            >
              Contact Me
            </Text>

            {/* Hamburger — mobile only, right of Hire Me slot */}
            <Box
              display={{ base: "flex", md: "none" }}
              alignItems="center"
              justifyContent="center"
              w="36px"
              h="36px"
              cursor="pointer"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              role="button"
            >
              <HamburgerIcon isOpen={open} />
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* ── Mobile drawer ── */}
      <Box
        position="fixed"
        top="54px"
        left="0"
        right="0"
        zIndex="899"
        display={{ base: open ? "block" : "none", md: "none" }}
        transform={open ? "translateY(0)" : "translateY(-8px)"}
        opacity={open ? 1 : 0}
        pointerEvents={open ? "auto" : "none"}
        transition="transform 0.28s ease, opacity 0.28s ease"
        bg="rgba(10,10,11,0.97)"
        backdropFilter="blur(20px)"
        borderBottom="1px solid"
        borderColor="brand.border"
      >
        <Box h="2px" bg="brand.accent" w="100%" />

        <VStack gap="0" align="stretch" py="8px">
          {links.map((link, i) => {
            const isActive =
              link.path === "/"
                ? location.pathname === link.path
                : location.pathname.startsWith(link.path);
            return (
              <Box as="li" key={link.label}>
                <Box
                  onClick={() => {
                    navigate(link.path);
                    setOpen(false);
                  }}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  px="28px"
                  py="18px"
                  fontSize="11px"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color={isActive ? tokens.accent : tokens.muted}
                  borderBottom={isActive ? "1px solid" : "none"}
                  pointerEvents={isActive ? "none" : "auto"}
                  cursor={isActive ? "default" : "pointer"}
                  borderColor={tokens.accent}
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateX(0)" : "translateX(-10px)",
                    transition: `opacity 0.3s ease ${i * 40}ms, transform 0.3s ease ${i * 40}ms, color 0.2s, padding-left 0.2s`,
                  }}
                  _hover={{
                    color: tokens.accent,
                    textDecoration: "none",
                  }}
                >
                  <Box as="span">{link.label}</Box>
                  <Box
                    as="span"
                    fontFamily="heading"
                    fontWeight="700"
                    fontSize="9px"
                    color={tokens.border}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </Box>
                </Box>
              </Box>
            );
          })}

          <Flex px="28px" py="20px" gap="12px" align="center">
            <Box w="6px" h="6px" borderRadius="50%" bg="brand.accent" />
            <Text
              fontSize="10px"
              letterSpacing="0.15em"
              textTransform="uppercase"
              color="brand.muted"
            >
              Available for opportunities
            </Text>
          </Flex>
        </VStack>
      </Box>

      {/* ── Backdrop ── */}
      {open && (
        <Box
          position="fixed"
          inset="0"
          top="54px"
          zIndex="898"
          bg="rgba(0,0,0,0.5)"
          display={{ base: "block", md: "none" }}
          onClick={() => setOpen(false)}
        />
      )}
    </Box>
  );
};

export default NavBar;
