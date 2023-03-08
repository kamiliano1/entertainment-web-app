import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Text,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { PageContext } from "@/src/Context";
import Login from "./Login";
import Register from "./Register";
import { MdMovie } from "react-icons/md";
export default function LoginModal() {
  const { isOpen, setIsOpen, view, setModalView } = useContext(PageContext);
  const initialRef = useRef(null);
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        isCentered={true}
        onClose={() => setIsOpen!(false)}
      >
        <ModalOverlay bg="darkBlue.1000" />
        <ModalContent background="semiDarkBlue.1000" textColor="white">
          <Flex position="relative" top="-20" justifyContent="center">
            <Icon
              as={MdMovie}
              position="absolute"
              color="red"
              fontSize="2.5rem"
              textAlign="center"
            ></Icon>
          </Flex>
          <ModalHeader fontSize="2rem" fontWeight={300}>
            {view === "login" && "Login"}
            {view === "register" && "Sign Up"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize=".93rem">
            {view === "login" && <Login focusRef={initialRef} />}
            {view === "register" && <Register focusRef={initialRef} />}

            {/* <Text>Don't have an account?</Text>
            <Text onClick={() => setModalView!("register")} cursor="pointer">
              Sign Up
            </Text> */}
          </ModalBody>

          {/* <ModalFooter>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}
