import { background, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import { useContext } from "react";
import { PageContext } from "@/src/Context";
type LoginModalProps = { focusRef: MutableRefObject<null> };

const LoginModal: React.FC<LoginModalProps> = ({ focusRef }) => {
  const { setModalView } = useContext(PageContext);
  return (
    <Stack fontWeight={300}>
      <Input ref={focusRef} placeholder="Email address"></Input>
      <Input placeholder="Password"></Input>
      <Button
        background="red"
        fontWeight={300}
        _hover={{ color: "black", background: "white" }}
      >
        Login to your account
      </Button>
      <Flex>
        <Text>Don't have an account? </Text>
        <Text
          ml={2}
          color="red"
          cursor="pointer"
          _hover={{ color: "white" }}
          onClick={() => setModalView!("register")}
        >
          Sign Up
        </Text>
      </Flex>
    </Stack>
  );
};
export default LoginModal;
