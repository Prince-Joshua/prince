import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./theme";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { tokens } from "./utils/tokens";

function App() {
  return (
    <ChakraProvider value={system} bg={tokens.bg}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
