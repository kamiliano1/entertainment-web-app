import React from "react";
import logoIcon from "../../../public/assets/logo.svg";
import homeIcon from "../../../public/assets/icon-nav-home.svg";
import tvSeriesIcon from "../../../public/assets/icon-nav-tv-series.svg";
import moviesIcon from "../../../public/assets/icon-nav-movies.svg";
import bookmarkIcon from "../../../public/assets/icon-nav-bookmark.svg";
import avatar from "../../../public/assets/image-avatar.png";
import { Box, createIcon, Flex, Icon, Spacer, Stack } from "@chakra-ui/react";
import { EpMostlyCloudy } from "../../../public/assets/ikona";
import Image from "next/image";
import IconBookmarkEmpty from "../Layout/Icons/IconBookmarkEmpty";
import IconBookmarkFull from "../Layout/Icons/IconBookmarkFull";
import IconCategoryMovie from "../Layout/Icons/IconCategoryMovie";
import IconCategoryTv from "../Layout/Icons/IconCategoryTv";
import IconLogo from "../Layout/Icons/IconLogo";
import IconNavBookmark from "../Layout/Icons/IconNavBookmark";
import IconNavHome from "../Layout/Icons/IconNavHome";
import IconNavMovie from "../Layout/Icons/IconNavMovies";
import IconNavTvSeries from "../Layout/Icons/IconNavTvSeries";
import IconPlay from "../Layout/Icons/IconPlay";
import IconSearch from "../Layout/Icons/IconSearch";
// import Image from "@chakra-ui/react"
type NavbarProps = {};

function EpNotebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path
        fill="currentColor"
        d="M192 128v768h640V128H192zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z"
      ></path>
      <path
        fill="currentColor"
        d="M672 128h64v768h-64zM96 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32z"
      ></path>
    </svg>
  );
}

// export function EpCaretBottom(props: SVGProps<SVGSVGElement>) {
//     return (
//       <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" {...props}><path fill="currentColor" d="m192 384l320 384l320-384z"></path></svg>
//     )
//   }
<path
  d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z"
  fill="#5A698F"
/>;
const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Flex
      backgroundColor="semiDarkBlue"
      p={{ base: "1rem", md: "1.5rem 1.5rem 1.19rem 1.4rem" }}
      m={{ base: "0", md: "1.4rem" }}
      borderRadius={{ md: "10px", lg: "20px" }}
      alignItems="center"
      justifyContent={{ base: "space-between", lg: "start" }}
      //   display={{ base: "none", sm: "flex" }}
      direction={{ lg: "column" }}
      width={{ lg: "96px" }}
      height={{ lg: "90vh" }}
    >
      <Icon as={IconLogo} />
      <Stack
        direction={{ base: "row", lg: "column" }}
        spacing="2rem"
        mt={{ lg: "2rem" }}
        mb={{ lg: "auto" }}
      >
        <Icon
          background="red"
          as={IconNavHome}
          cursor="pointer"
          color="white"
          fontSize="30px"
          _hover={{ color: "gray.300" }}
        />
        <Icon as={IconNavMovie} />
        <Icon as={IconNavTvSeries} />
        <Icon as={IconNavBookmark} />
        {/* <Image src={moviesIcon} alt="movies Icon" />
        <Image src={tvSeriesIcon} alt="TV series Icon" />
        <Image src={bookmarkIcon} alt="bookmark Icon" /> */}
      </Stack>
      <Image src={avatar} alt="avatar image" width="24" height="24" />
      {/* {icon} */}
      {/* <img src={icon} alt="" /> */}
      {/* <Icon as={icon} color="green.200" /> */}
    </Flex>
  );
};
export default Navbar;
