import { PageContext, PageNameType } from "@/src/Context";
import { auth } from "@/src/firebase/clientApp";
import { Flex, Icon, Image, Stack, VisuallyHidden } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillBookmarkFill } from "react-icons/bs";
import { GiTv } from "react-icons/gi";
import { MdLocalMovies, MdMovie } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { SiWindows11 } from "react-icons/si";
import LoginModal from "../Modal/Modal";
type NavbarProps = {};
const Navbar: React.FC<NavbarProps> = () => {
  const { setIsOpen, currentTab, setCurrentTab, avatarURL } =
    useContext(PageContext);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const currentPageAddress = router.pathname.split("/")[1] as PageNameType;
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    user ? setIsLogged(true) : setIsLogged(false);
  }, [user]);
  useEffect(() => {
    if (setCurrentTab)
      setCurrentTab(currentPageAddress ? currentPageAddress : "home");
  }, [router, setCurrentTab, currentPageAddress]);

  return (
    <Flex
      role="navigation"
      backgroundColor="semiDarkBlue.1000"
      p={{ base: "1rem", md: "1.5rem 1.5rem 1.19rem 1.4rem" }}
      m={{ base: "0", md: "1.4rem", lg: "2rem" }}
      borderRadius={{ md: "10px", lg: "20px" }}
      alignItems="center"
      justifyContent={{ base: "space-between", lg: "start" }}
      direction={{ lg: "column" }}
      width={{ lg: "96px" }}
      height={{ lg: "90vh" }}
      position={{ lg: "fixed" }}
    >
      <LoginModal />
      <Icon
        as={MdMovie}
        color="red"
        fontSize={{ base: "30px", md: "38px" }}
        title="logo"
      />
      <Stack
        justifyContent="center"
        alignItems="center"
        direction={{ base: "row", lg: "column" }}
        spacing="2rem"
        mt={{ lg: "2rem" }}
        mb={{ lg: "auto" }}
      >
        <Link href="/" rel="preload">
          <VisuallyHidden>Home Page</VisuallyHidden>
          <Icon
            as={SiWindows11}
            color={`${currentTab === "home" ? "white" : "greyishBlue.1000"}`}
            fontSize={{ base: "16px", md: "20px" }}
            _hover={{ color: "red" }}
            onClick={() => {
              if (setCurrentTab) setCurrentTab("home");
            }}
          />
        </Link>

        <Link href="/movies" rel="preload">
          <VisuallyHidden>Movies</VisuallyHidden>
          <Icon
            as={MdLocalMovies}
            color={`${currentTab === "movies" ? "white" : "greyishBlue.1000"}`}
            fontSize={{ base: "24px", md: "28px" }}
            _hover={{ color: "red" }}
            onClick={() => {
              if (setCurrentTab) setCurrentTab("movies");
            }}
          />
        </Link>

        <Link href="/tvSeries" rel="preload">
          <VisuallyHidden>TV series</VisuallyHidden>
          <Icon
            as={GiTv}
            color={`${
              currentTab === "tvSeries" ? "white" : "greyishBlue.1000"
            }`}
            fontSize={{ base: "20px", md: "25px" }}
            _hover={{ color: "red" }}
            onClick={() => {
              if (setCurrentTab) setCurrentTab("tvSeries");
            }}
          />
        </Link>
        <Link href="/bookmarked" rel="preload">
          <VisuallyHidden>Bookmark</VisuallyHidden>
          <Icon
            as={BsFillBookmarkFill}
            color={`${
              currentTab === "bookmarked" ? "white" : "greyishBlue.1000"
            }`}
            fontSize={{ base: "18px", md: "20px" }}
            _hover={{ color: "red" }}
            onClick={() => {
              if (setCurrentTab) setCurrentTab("bookmarked");
            }}
          />
        </Link>
      </Stack>
      {isLogged ? (
        <Image
          mt={{ lg: "1rem" }}
          cursor="pointer"
          src={avatarURL ? avatarURL : "/assets/image-avatar.png"}
          boxSize={{ base: "24px", md: "32px", lg: "40px" }}
          alt="avatar image"
          border="1px solid white"
          borderRadius="50%"
          onClick={() => setIsOpen!((prev) => !prev)}
        />
      ) : (
        <Icon
          cursor="pointer"
          as={RxAvatar}
          color="greyishBlue.1000"
          fontSize={{ base: "24px", md: "32px", lg: "40px" }}
          mt={{ lg: "1rem" }}
          _hover={{ color: "red" }}
          onClick={() => setIsOpen!((prev) => !prev)}
        />
      )}
    </Flex>
  );
};
export default Navbar;
