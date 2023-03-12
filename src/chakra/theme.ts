import { extendTheme } from "@chakra-ui/react";
import {} from "next/router";
import "@fontsource/outfit/300.css";
import "@fontsource/outfit/500.css";
export const theme = extendTheme({
  colors: {
    darkBlue: {
      1000: "hsla(223, 30%, 9%, 1)",
      800: "hsla(223, 30%, 9%, .8)",
      600: "hsla(223, 30%, 9%, .6)",
    },
    greyishBlue: {
      1000: "hsla(223, 23%, 46%, 1)",
      800: "hsla(223, 23%, 46%, .8)",
      600: "hsla(223, 23%, 46%, .6)",
    },
    semiDarkBlue: {
      1000: "hsla(223, 36%, 14%, 1)",
      800: "hsla(223, 36%, 14%, .8)",
      600: "hsla(223, 36%, 14%, .6)",
    },
    red: "hsl(0 97% 63%)",
    white: "hsl(0 0% 100%)",
  },
  fonts: {
    body: `'Outfit', sans-serif`,
  },
  styles: {
    global: () => ({
      body: {
        bg: "darkBlue.1000",
        fontWeight: 300,
      },
    }),
  },
});
