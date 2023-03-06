// 1. Import `extendTheme`
// import { extendTheme } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import {} from "next/router";
import "@fontsource/outfit/300.css";
import "@fontsource/outfit/500.css";
import { customIcons } from "./icons";
// import "@fontsource/open-sans/300.css";
// import "@fontsource/open-sans/400.css";
// import "@fontsource/open-sans/700.css";
// import { Button } from "./button";
// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    darkBlue: "hsl(223 30% 9%)",
    red: "hsl(0 97% 63%)",
    greyishBlue: "hsl(223 23% 46%)",
    semiDarkBlue: "hsl(223 36% 14%)",
    white: "hsl(0 0% 100%)",
  },
  fonts: {
    body: `'Outfit', sans-serif`,
  },
  styles: {
    global: () => ({
      body: {
        bg: "darkBlue",
      },
    }),
  },
  icons: {
    customIcons,
  },
  // components: {
  //   Button,
  // },
});
