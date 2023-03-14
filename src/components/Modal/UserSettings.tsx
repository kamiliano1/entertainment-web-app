import { PageContext } from "@/src/Context";
import { auth } from "@/src/firebase/clientApp";
import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
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
  const { setModalView, setIsOpen, isOpen } = useContext(PageContext);

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
  return (
    <Stack>
      <Button
        onClick={logout}
        type="submit"
        background="red"
        isLoading={loading}
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
