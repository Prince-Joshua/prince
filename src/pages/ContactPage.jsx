import ContactForm from "@/components/custom/ContactForm";
import Contact from "@/sections/homePage/Contact";
import Footer from "@/sections/homePage/Footer";
import { tokens } from "@/utils/tokens";
import { Box } from "@chakra-ui/react";
import React from "react";

const ContactPage = () => {
  return (
    <Box
      maxW="1100px"
      mx="auto"
      px={{ base: "24px", md: "60px" }}
      bg={tokens.bg}
    >
      <Contact showLine={false} />
      <Footer />
    </Box>
  );
};

export default ContactPage;
