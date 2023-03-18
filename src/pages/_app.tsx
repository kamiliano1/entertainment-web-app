import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra/theme";

import { PageContextProvider } from "../Context";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <PageContextProvider>
        <Component {...pageProps} />
      </PageContextProvider>
    </ChakraProvider>
  );
}
