import { PageContext } from "@/src/Context";
import { auth } from "@/src/firebase/clientApp";
import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
type LoginModalProps = { focusRef: MutableRefObject<null> };

const LoginModal: React.FC<LoginModalProps> = ({ focusRef }) => {
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
  const { setModalView, setIsOpen } = useContext(PageContext);

  useEffect(() => {
    if (userName) setIsOpen!(false);
  }, [setIsOpen, userName]);
  const onSubmit: SubmitHandler<loginUserInputs> = (data) => {
    setError("");

    signInWithEmailAndPassword(data.email, data.password);
  };
  return (
    <Stack>
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
        {firebaseError?.message && (
          <Text color="red" py={2}>
            Wrong email or password
          </Text>
        )}
        <Button
          type="submit"
          background="red"
          isLoading={loading}
          fontWeight={300}
          width={"100%"}
          py="1.5rem"
          _hover={{ color: "black", backgroundColor: "white" }}
        >
          {"Login to your account"}
        </Button>

        <Flex justifyContent="center" p="1.5rem 0 2rem 0">
          <Text>{"Don't have an account?"} </Text>
          <Text
            onClick={() => setModalView!("register")}
            ml={2}
            color="red"
            cursor="pointer"
            _hover={{ color: "white" }}
          >
            Sign Up
          </Text>
        </Flex>
      </form>
    </Stack>
  );
};
export default LoginModal;
