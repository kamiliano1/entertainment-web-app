import { Button, Flex, Icon, Stack, Image } from "@chakra-ui/react";
// import Image from "next/image";
import React, { useState } from "react";
import { useContext } from "react";
import avatar from "../../../public/assets/image-avatar.png";
import InputElement from "../Layout/InputElement";
import { BsFillBookmarkFill } from "react-icons/bs";
import { GiTv } from "react-icons/gi";
import { MdLocalMovies, MdMovie } from "react-icons/md";
import { SiWindows11 } from "react-icons/si";
import { PageContext } from "@/src/Context";
import LoginModal from "../Modal/Modal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { signOut } from "firebase/auth";

type NavbarProps = {};
const Navbar: React.FC<NavbarProps> = () => {
  const { isOpen, setIsOpen } = useContext(PageContext);
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
        {/* {!user ? (
        <Button
          onClick={() => {
            setIsOpen!((prev) => !prev);
          }}
        >
          LogIn
        </Button>
      ) : (
        <Button onClick={logout}>LogOut</Button>
      )} */}
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
          <Icon
            as={SiWindows11}
            color="greyishBlue.1000"
            fontSize={{ base: "16px", md: "20px" }}
            _hover={{ color: "red" }}
          />
          <Icon
            as={MdLocalMovies}
            color="greyishBlue.1000"
            fontSize={{ base: "24px", md: "28px" }}
            _hover={{ color: "red" }}
          />
          <Icon
            as={GiTv}
            color="greyishBlue.1000"
            fontSize={{ base: "20px", md: "25px" }}
            _hover={{ color: "red" }}
          />
          <Icon
            as={BsFillBookmarkFill}
            color="greyishBlue.1000"
            fontSize={{ base: "18px", md: "20px" }}
            _hover={{ color: "red" }}
          />
        </Stack>
        <Image
          src={"assets/image-avatar.png"}
          boxSize={{ base: "24px", md: "32px", lg: "40px" }}
          alt="avatar image"
          border="1px solid white"
          borderRadius="50%"
          // width="24"
          // height="24"
        />
      </Flex>
      <InputElement />
    </>
  );
};
export default Navbar;
