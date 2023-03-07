import { PageContext } from "@/src/Context";
import { Input, Button, Text } from "@chakra-ui/react";
import React, { MutableRefObject, useContext } from "react";

type RegisterProps = { focusRef: MutableRefObject<null> };

const Register: React.FC<RegisterProps> = ({ focusRef }) => {
  const { setModalView } = useContext(PageContext);
  return (
    <>
      <Text>Register</Text>
      <Input ref={focusRef}></Input>
      <Input></Input>
      <Button></Button>
      <Text as="span">Already have an account? </Text>
      <Text as="span" onClick={() => setModalView!("login")}>
        Login
      </Text>
    </>
  );
};
export default Register;
