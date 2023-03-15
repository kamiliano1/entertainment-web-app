import { PageContext, PageNameType } from "@/src/Context";
import { auth, firestore } from "@/src/firebase/clientApp";
import { Button, Flex, Icon, Image, Stack } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
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
  const { isOpen, setIsOpen, currentTab, setCurrentTab, movieList } =
    useContext(PageContext);
  const [user, loading, error] = useAuthState(auth);
  const [userLoading, setUserLoading] = useState(false);
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

  //firestore

  const createUserDocument = async () => {
    try {
      await runTransaction(firestore, async (transaction) => {
        // const bookmarkRef = doc(firestore, `users`, user!.uid);
        // transaction.set(bookmarkRef, {
        //   userId: user?.uid,
        //   email: user?.email,
        //   avatar: "",
        //   createdAt: serverTimestamp(),
        // });
        transaction.set(
          doc(
            firestore,
            `users/${user?.uid}/bookmarkSnippets`,
            "imieFIlmuDwaTrzy"
          ),
          {
            movieId: "tytulFIlmuDrugiego",
          }
        );
        // await setDoc(bookmarkRef, {
        //   userId: user?.uid,
        //   createdAt: serverTimestamp(),
        //   isBookmarked: false,
        // });
      });
      // const bookmarkDoc = await getDoc(bookmarkRef);

      // if (bookmarkDoc.exists()) {
      //   console.log("jest juz taki dokument");
      //   return;
      // }

      // create dokumenty
    } catch (error: any) {
      console.log("createUserDocumentError", error.message);
    }
  };
  // const createUserDocument = async () => {
  //   console.log("clicked");

  //   try {
  //     await runTransaction(firestore, async (transaction) => {
  //       const bookmarkRef = doc(firestore, "bookmarked", "userLiked");
  //       transaction.set(bookmarkRef, {
  //         movieTitle: "userMovie",
  //         createdAt: serverTimestamp(),
  //       });
  //       transaction.set(
  //         doc(firestore, `users/${user?.uid}/bookmarkSnippets`, "imieFIlmu"),
  //         {
  //           movieId: "tytulFIlmu",
  //         }
  //       );
  //       await setDoc(bookmarkRef, {
  //         userId: user?.uid,
  //         createdAt: serverTimestamp(),
  //         isBookmarked: false,
  //       });
  //     });
  //     // const bookmarkDoc = await getDoc(bookmarkRef);

  //     // if (bookmarkDoc.exists()) {
  //     //   console.log("jest juz taki dokument");
  //     //   return;
  //     // }

  //     // create dokumenty
  //   } catch (error: any) {
  //     console.log("createUserDocumentError", error.message);
  //   }
  // };
  const createUserDocuments = async () => {
    await addDoc(collection(firestore, "user"), { name: "user" });
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
        position={{ lg: "fixed" }}>
        <Button onClick={createUserDocument}>Klikaj</Button>
        <LoginModal />
        <Icon
          as={MdMovie}
          color="red"
          fontSize={{ base: "30px", md: "38px" }}
        />
        <Stack
          justifyContent="center"
          alignItems="center"
          direction={{ base: "row", lg: "column" }}
          spacing="2rem"
          mt={{ lg: "2rem" }}
          mb={{ lg: "auto" }}>
          <Link href="/">
            <Icon
              as={SiWindows11}
              color={`${currentTab === "home" ? "white" : "greyishBlue.1000"}`}
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
              color={`${
                currentTab === "movies" ? "white" : "greyishBlue.1000"
              }`}
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
                currentTab === "tvSeries" ? "white" : "greyishBlue.1000"
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
                currentTab === "bookmarked" ? "white" : "greyishBlue.1000"
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
        {isLogged ? (
          <Image
            mt={{ lg: "1rem" }}
            cursor="pointer"
            src="/assets/image-avatar.png"
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
            // fontSize="2.7rem"
            fontSize={{ base: "24px", md: "32px", lg: "40px" }}
            mt={{ lg: "1rem" }}
            _hover={{ color: "red" }}
            onClick={() => setIsOpen!((prev) => !prev)}
          />
        )}
      </Flex>
    </>
  );
};
export default Navbar;
