import { PageContext } from "@/src/Context";
import { auth, firestore } from "@/src/firebase/clientApp";
import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
type LoginModalProps = { focusRef: MutableRefObject<null> };

const UserSettings: React.FC<LoginModalProps> = ({ focusRef }) => {
  type loginUserInputs = {
    email: string;
    password: string;
  };

  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserInputs>();
  const [signInWithEmailAndPassword, userName, loading, firebaseError] =
    useSignInWithEmailAndPassword(auth);
  const { setModalView, setIsOpen, isOpen, setBookmarkTitle } =
    useContext(PageContext);
  const [user, userLoading, userRrror] = useAuthState(auth);
  const [bookmarkButtonLoading, setBookmarkButtonLoading] = useState(false);
  useEffect(() => {
    if (userName) setIsOpen!(false);
  }, [setIsOpen, userName]);
  const onSubmit: SubmitHandler<loginUserInputs> = (data) => {
    setError("");

    if (firebaseError) setError("Wrong email or password");

    signInWithEmailAndPassword(data.email, data.password);
  };

  const logout = async () => {
    await signOut(auth);
    setIsOpen!(false);
    setModalView!("login");
  };

  const clearBookmark = async () => {
    try {
      setBookmarkButtonLoading(true);
      const bookmarkRef = doc(firestore, "users", user!.uid);
      const bookmark = await getDoc(bookmarkRef);

      await setDoc(bookmarkRef, {
        ...bookmark.data(),
        bookmarkList: [""],
      });
    } catch (error: any) {
      console.log("clearBookmarkError", error.message);
    }
    setBookmarkTitle!([]);
    setBookmarkButtonLoading(false);
    setIsOpen!(false);
  };
  return (
    <Stack mb="1rem" spacing="1.5rem">
      <Button
        onClick={clearBookmark}
        type="submit"
        background="red"
        isLoading={bookmarkButtonLoading}
        fontWeight={300}
        width={"100%"}
        py="1.5rem"
        _hover={{ color: "black", backgroundColor: "white" }}>
        {"Clear Bookmark"}
      </Button>

      <Button
        onClick={logout}
        type="submit"
        background="red"
        isLoading={loading}
        fontWeight={300}
        width={"100%"}
        py="1.5rem"
        _hover={{ color: "black", backgroundColor: "white" }}>
        {"Logout"}
      </Button>
    </Stack>
  );
};
export default UserSettings;
