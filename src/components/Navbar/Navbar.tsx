import { Button, Flex, Icon, Image, Stack } from "@chakra-ui/react";
import { PageContext } from "@/src/Context";
import { auth } from "@/src/firebase/clientApp";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillBookmarkFill } from "react-icons/bs";
import { GiTv } from "react-icons/gi";
import { MdLocalMovies, MdMovie } from "react-icons/md";
import { SiWindows11 } from "react-icons/si";
import LoginModal from "../Modal/Modal";
type NavbarProps = {};
const Navbar: React.FC<NavbarProps> = () => {
  const { isOpen, setIsOpen, currentTab, setCurrentTab } =
    useContext(PageContext);
  const [user, loading, error] = useAuthState(auth);

  const logout = async () => {
    await signOut(auth);
  };
  return (
    <>
      <Flex
        backgroundColor="semiDarkBlue.1000"
        p={{ base: "1rem", md: "1.5rem 1.5rem 1.19rem 1.4rem" }}
        m={{ base: "0", md: "1.4rem", lg: "2rem" }}
        borderRadius={{ md: "10px", lg: "20px" }}
        alignItems="center"
        justifyContent={{ base: "space-between", lg: "start" }}
        direction={{ lg: "column" }}
        width={{ lg: "96px" }}
        height={{ lg: "90vh" }}
      >
        <LoginModal />
        {/* <Button onClick={logout}>LogOut</Button> */}
        <Icon
          as={MdMovie}
          color="red"
          fontSize={{ base: "30px", md: "38px" }}
        />
        <Stack
          alignItems="center"
          direction={{ base: "row", lg: "column" }}
          spacing="2rem"
          mt={{ lg: "2rem" }}
          mb={{ lg: "auto" }}
        >
          <Link href="/">
            <Icon
              as={SiWindows11}
              color={`${currentTab === "home" ? "red" : "greyishBlue.1000"}`}
              fontSize={{ base: "16px", md: "20px" }}
              _hover={{ color: "red" }}
              name="home"
              onClick={() => {
                if (setCurrentTab) setCurrentTab("home");
              }}
            />
          </Link>
          <Link href="/movies">
            <Icon
              as={MdLocalMovies}
              color={`${currentTab === "movies" ? "red" : "greyishBlue.1000"}`}
              fontSize={{ base: "24px", md: "28px" }}
              _hover={{ color: "red" }}
              name="movies"
              onClick={() => {
                if (setCurrentTab) setCurrentTab("movies");
              }}
            />
          </Link>
          <Link href="/tvSeries">
            <Icon
              as={GiTv}
              color={`${
                currentTab === "tvSeries" ? "red" : "greyishBlue.1000"
              }`}
              fontSize={{ base: "20px", md: "25px" }}
              _hover={{ color: "red" }}
              name="tvSeries"
              onClick={() => {
                if (setCurrentTab) setCurrentTab("tvSeries");
              }}
            />
          </Link>
          <Link href="/bookmarked">
            <Icon
              as={BsFillBookmarkFill}
              color={`${
                currentTab === "bookmarked" ? "red" : "greyishBlue.1000"
              }`}
              fontSize={{ base: "18px", md: "20px" }}
              _hover={{ color: "red" }}
              name="bookmarked"
              onClick={() => {
                if (setCurrentTab) setCurrentTab("bookmarked");
              }}
            />
          </Link>
        </Stack>
        <Image
          mt={{ lg: "1rem" }}
          cursor="pointer"
          src={"assets/image-avatar.png"}
          boxSize={{ base: "24px", md: "32px", lg: "40px" }}
          alt="avatar image"
          border="1px solid white"
          borderRadius="50%"
          onClick={() => setIsOpen!((prev) => !prev)}
        />
      </Flex>
    </>
  );
};
export default Navbar;
