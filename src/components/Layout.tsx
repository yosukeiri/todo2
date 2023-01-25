import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

interface PROPS {
  children: any;
}

const Layout: React.FC<PROPS> = ({ children }) => (
  <ChakraProvider>{children}</ChakraProvider>
);

export default Layout;
