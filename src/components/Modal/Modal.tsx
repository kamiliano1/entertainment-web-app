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
} from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { PageContext } from "@/src/Context";
import Login from "./Login";
import Register from "./Register";
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
        <ModalOverlay bg="darkBlue" />
        <ModalContent background="semiDarkBlue" textColor="white">
          <ModalHeader fontSize="2rem" fontWeight={300}>
            {view === "login" && "Login"}
            {view === "register" && "Sign Up"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
