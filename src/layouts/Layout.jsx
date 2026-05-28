import NavBar from "@/components/custom/NavBar";
import { ScrollToTop } from "@/utils/ScrollToTop";
import { tokens } from "@/utils/tokens";
import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box minH="100vh" bg={tokens.bg}>
      <ScrollToTop />
      <NavBar />
      <Box as={"main"} pt={"54px"}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
