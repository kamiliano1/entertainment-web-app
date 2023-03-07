import React from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
type InputElementProps = {};

const InputElement: React.FC<InputElementProps> = () => {
  return (
    <Stack spacing={4} alignItems="center">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<FiSearch color="white" />}
        />
        <Input
          focusBorderColor="transparent"
          border="none"
          type="tel"
          fontSize="1rem"
          color="white"
          fontWeight={300}
          placeholder="Search for movies or TV series"
          _placeholder={{ color: "white", opacity: 0.5, fontWeight: 300 }}
          _focus={{
            borderBottom: "hsl(0 0% 100% /.3) 1px solid",
            borderRadius: 0,
          }}
        />
      </InputGroup>
    </Stack>
  );
};
export default InputElement;
{
}
