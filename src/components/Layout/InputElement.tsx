import { PageContext } from "@/src/Context";
import { Flex, Icon, Input, Stack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FiSearch } from "react-icons/fi";
type InputElementProps = {
  placeholder: string;
};
const InputElement: React.FC<InputElementProps> = ({ placeholder }) => {
  const { setSearchBarValue } = useContext(PageContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarValue!(e.target.value);
  };
  return (
    <Stack maxWidth="1400px" px="18px" mt={{ base: "24px", md: "33px" }}>
      <Flex>
        <Icon
          alignSelf="center"
          as={FiSearch}
          color="white"
          pointerEvents="none"
          fontSize="1.3rem"
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
          placeholder={placeholder}
          _placeholder={{ color: "white", opacity: 0.5, fontWeight: 300 }}
          _focus={{
            borderBottom: "hsl(0 0% 100% /.3) 1px solid",
            borderRadius: 0,
          }}
        />
      </Flex>
    </Stack>
  );
};
export default InputElement;
{
}
