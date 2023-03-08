import { Button, Flex, Icon, Stack } from "@chakra-ui/react";
import Image from "next/image";
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
    console.log(user);
  };
  return (
    <Flex
      backgroundColor="semiDarkBlue"
      p={{ base: "1rem", md: "1.5rem 1.5rem 1.19rem 1.4rem" }}
      m={{ base: "0", md: "1.4rem" }}
      borderRadius={{ md: "10px", lg: "20px" }}
      alignItems="center"
      justifyContent={{ base: "space-between", lg: "start" }}
      direction={{ lg: "column" }}
      width={{ lg: "96px" }}
      height={{ lg: "90vh" }}
    >
      <LoginModal />
      {!user ? (
        <Button
          onClick={() => {
            setIsOpen!((prev) => !prev);
          }}
        >
          LogIn
        </Button>
      ) : (
        <Button onClick={logout}>LogOut</Button>
      )}
      <Icon as={MdMovie} color="red" fontSize={{ base: "25px", md: "32px" }} />
      <Stack
        alignItems="center"
        direction={{ base: "row", lg: "column" }}
        spacing="2rem"
        mt={{ lg: "2rem" }}
        mb={{ lg: "auto" }}
      >
        <Icon
          as={SiWindows11}
          color="greyishBlue"
          fontSize={{ base: "16px", md: "20px" }}
          _hover={{ color: "red" }}
        />
        <Icon
          as={MdLocalMovies}
          color="greyishBlue"
          fontSize={{ base: "20px", md: "25px" }}
          _hover={{ color: "red" }}
        />
        <Icon
          as={GiTv}
          color="greyishBlue"
          fontSize={{ base: "20px", md: "25px" }}
          _hover={{ color: "red" }}
        />
        <Icon
          as={BsFillBookmarkFill}
          color="greyishBlue"
          fontSize={{ base: "16px", md: "20px" }}
          _hover={{ color: "red" }}
        />
      </Stack>
      <Image src={avatar} alt="avatar image" width="24" height="24" />
      <InputElement />
    </Flex>
  );
};
export default Navbar;
