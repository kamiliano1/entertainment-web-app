import { PageContext } from "@/src/Context";
import { auth, firestore, storage } from "@/src/firebase/clientApp";
import { Input, Button, Text, Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
type RegisterProps = { focusRef: MutableRefObject<null> };

type createUserInputs = {
  email: string;
  password: string;
  repeatPassword: string;
};

const Register: React.FC<RegisterProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserInputs>();
  const [
    createUserWithEmailAndPassword,
    userCredentials,
    loading,
    firebaseError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [error, setError] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const { setModalView, setIsOpen, movieList } = useContext(PageContext);
  const onSubmit: SubmitHandler<createUserInputs> = (data) => {
    if (firebaseError) setError("A user with that email already exists");
    if (data.password.length < 6) {
      setError("Pasword must contain at least 6 characters");
      return;
    }
    if (data.password !== data.repeatPassword) {
      setError("Password do not match");
      return;
    }
    createUserWithEmailAndPassword(data.email, data.password);
  };

  const createUserDocument = async (user: User) => {
    await addDoc(
      collection(firestore, "users"),
      JSON.parse(JSON.stringify(user))
    );
  };

  const createUserBookmark = async () => {
    setUserLoading(true);
    try {
      const postDocRef = await addDoc(
        collection(firestore, "posts"),
        movieList
      );
      const imageRef = ref(storage, `posts/${postDocRef.id}/bookmark`);
      await updateDoc(postDocRef, { bookmark: imageRef });
    } catch (error: any) {
      console.log("handle user", error.message);
    }
    setUserLoading(false);
  };
  useEffect(() => {
    if (userCredentials) {
      createUserDocument(userCredentials.user);
      setIsOpen!(false);
    }
  }, [userCredentials, setIsOpen]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex position="relative">
          <Input
            variant="flushed"
            pl="1rem"
            mb={3}
            py="1rem"
            cursor="pointer"
            border="none"
            focusBorderColor="#fff"
            borderBottom="1px solid"
            borderBottomColor={errors.email ? "red" : "greyishBlue.800"}
            borderRadius={0}
            placeholder="Email address"
            type="email"
            _placeholder={{ fontWeight: 300, fontSize: ".93rem" }}
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <Text position="absolute" top=".5rem" right="1rem" color="red">
              {"Can't be empty"}
            </Text>
          )}
        </Flex>
        <Flex position="relative">
          <Input
            variant="flushed"
            pl="1rem"
            mb={3}
            py="1rem"
            cursor="pointer"
            border="none"
            focusBorderColor="#fff"
            borderBottom="1px solid"
            borderBottomColor={errors.password ? "red" : "greyishBlue.800"}
            borderRadius={0}
            placeholder="Password"
            type="password"
            _placeholder={{ fontWeight: 300, fontSize: ".93rem" }}
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <Text position="absolute" top=".5rem" right="1rem" color="red">
              {"Can't be empty"}
            </Text>
          )}
        </Flex>
        <Flex position="relative">
          <Input
            variant="flushed"
            pl="1rem"
            mb={3}
            py="1rem"
            cursor="pointer"
            border="none"
            focusBorderColor="#fff"
            borderBottom="1px solid"
            borderBottomColor={
              errors.repeatPassword ? "red" : "greyishBlue.800"
            }
            borderRadius={0}
            placeholder="Repeat password"
            type="password"
            _placeholder={{ fontWeight: 300, fontSize: ".93rem" }}
            {...register("repeatPassword", { required: true })}
          />
          {errors.repeatPassword?.type === "required" && (
            <Text position="absolute" top=".5rem" right="1rem" color="red">
              {"Can't be empty"}
            </Text>
          )}
        </Flex>

        <Text color="red" py={2}>
          {error}
        </Text>

        <Button
          type="submit"
          background="red"
          isLoading={loading}
          fontWeight={300}
          width={"100%"}
          py="1.5rem"
          _hover={{ color: "black", backgroundColor: "white" }}
        >
          Create an account
        </Button>
      </form>
      <Flex justifyContent="center" p="1.5rem 0 2rem 0">
        <Text>Already have an account? </Text>
        <Text
          onClick={() => setModalView!("login")}
          ml={2}
          color="red"
          cursor="pointer"
          _hover={{ color: "white" }}
        >
          Login
        </Text>
      </Flex>
    </>
  );
};
export default Register;
