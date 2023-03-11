import React, { useState, useContext } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { PageContext } from "@/src/Context";
import { SubmitHandler, useForm } from "react-hook-form";
type InputElementProps = {};
const InputElement: React.FC<InputElementProps> = () => {
  const { searchBarValue, searchBarValueState } = useContext(PageContext);
  // const {
  //   register,
  //   onChange,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<searchInput>();

  // searchBarValue: searchBar,
  // searchBarValueState: setSearchBar,
  // const [searchBar, setSearchBar] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchBarValueState!(e.target.value);
  };
  return (
    <Stack spacing={4} alignItems="center" maxWidth="1400px" px="1rem">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<FiSearch color="white" />}
        />
        <Input
          onChange={onChange}
          focusBorderColor="transparent"
          border="none"
          type="text"
          name="searchBar"
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
