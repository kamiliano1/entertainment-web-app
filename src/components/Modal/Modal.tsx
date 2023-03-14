import { PageContext } from "@/src/Context";
import {
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { MdMovie } from "react-icons/md";
import Login from "./Login";
import Register from "./Register";
import UserSettings from "./UserSettings";
export default function LoginModal() {
  const { isOpen, setIsOpen, view } = useContext(PageContext);
  const initialRef = useRef(null);
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        isCentered={true}
        onClose={() => setIsOpen!(false)}
      >
        <ModalOverlay bg="darkBlue.1000" w="100%" h="100%" />
        <ModalContent
          background="semiDarkBlue.1000"
          textColor="white"
          mx="1rem"
        >
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
            {view === "userSettings" && "Account Settings"}
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody fontSize=".93rem">
            {view === "login" && <Login focusRef={initialRef} />}
            {view === "register" && <Register focusRef={initialRef} />}
            {view === "userSettings" && <UserSettings focusRef={initialRef} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
