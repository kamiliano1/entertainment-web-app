import { PageContext } from "@/src/Context";
import { auth, firestore, storage } from "@/src/firebase/clientApp";
import { Box, Button, Image, Stack } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
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
  const selectFileRef = useRef<HTMLInputElement>(null);

  const { setModalView, setIsOpen, setBookmarkTitle, setAvatarURL } =
    useContext(PageContext);
  const [user, userLoading, userError] = useAuthState(auth);
  const [selectFile, setSelectFile] = useState<string>("");
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [bookmarkButtonLoading, setBookmarkButtonLoading] = useState(false);

  const imageUpload = async () => {
    try {
      setImageLoading(true);
      const userDocRef = doc(firestore, "users", user!.uid);

      const imageRef = ref(storage, `users/${user?.uid}/avatar`);
      await uploadString(imageRef, selectFile, "data_url");

      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(userDocRef, {
        avatar: downloadURL,
      });
      const userDoc = await getDoc(userDocRef);
      setAvatarURL!(userDoc.data()!.avatar);
      setIsOpen!(false);

      setImageLoading(false);
    } catch (error: any) {
      console.log("getSnippetsError", error.message);
    }
  };
  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectFile(readerEvent.target.result as string);
      }
    };
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
        _hover={{ color: "black", backgroundColor: "white" }}
      >
        {"Clear Bookmark"}
      </Button>
      <Button
        onClick={() => selectFileRef.current?.click()}
        type="submit"
        background="red"
        isLoading={bookmarkButtonLoading}
        fontWeight={300}
        width={"100%"}
        py="1.5rem"
        _hover={{ color: "black", backgroundColor: "white" }}
      >
        {"Upload Avatar"}
      </Button>
      <input ref={selectFileRef} type="file" hidden onChange={onSelectImage} />
      {selectFile && (
        <Box
          alignItems="center"
          p="1rem"
          pt={{ lg: "1rem" }}
          display="flex"
          top={0}
          width="calc(100% - 3rem)"
          height="calc(100% - 3rem)"
          position="absolute"
          backgroundColor="darkBlue.1000"
          zIndex={30}
          borderRadius="5px"
        >
          <Image
            src={selectFile}
            maxWidth="150px"
            maxHeight="150px"
            alt="avatar image"
            border="1px solid white"
            mr="1rem"
          />
          <Stack spacing="1rem" width="100%">
            <Button
              onClick={imageUpload}
              background="red"
              isLoading={imageLoading}
              fontWeight={300}
              width={"100%"}
              py="1.5rem"
              _hover={{ color: "black", backgroundColor: "white" }}
            >
              {"Accept"}
            </Button>
            <Button
              onClick={() => selectFileRef.current?.click()}
              background="red"
              fontWeight={300}
              width={"100%"}
              py="1.5rem"
              _hover={{ color: "black", backgroundColor: "white" }}
            >
              {"Change"}
            </Button>
            <Button
              onClick={() => setSelectFile("")}
              background="red"
              fontWeight={300}
              width={"100%"}
              py="1.5rem"
              _hover={{ color: "black", backgroundColor: "white" }}
            >
              {"Cancel"}
            </Button>
          </Stack>
        </Box>
      )}
      <Button
        onClick={logout}
        type="submit"
        background="red"
        fontWeight={300}
        width={"100%"}
        py="1.5rem"
        _hover={{ color: "black", backgroundColor: "white" }}
      >
        {"Logout"}
      </Button>
    </Stack>
  );
};
export default UserSettings;
