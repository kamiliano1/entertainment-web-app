import { Button, Stack, Image, Box } from "@chakra-ui/react";
import React from "react";

type AvatarUploadProps = {
  selectFileRef: React.RefObject<HTMLInputElement>;
  onSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectFile: string;
  imageUpload: () => Promise<void>;
  imageLoading: boolean;
  setSelectFile: (value: React.SetStateAction<string>) => void;
};

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  selectFileRef,
  selectFile,
  setSelectFile,
  onSelectImage,
  imageUpload,
  imageLoading,
}) => {
  return (
    <>
      <Button
        onClick={() => selectFileRef.current?.click()}
        type="submit"
        background="red"
        fontWeight={300}
        width={"100%"}
        py="1.5rem"
        _hover={{ color: "black", backgroundColor: "white" }}
      >
        {"Upload Avatar"}
      </Button>
      <input ref={selectFileRef} type="file" hidden onChange={onSelectImage} />
      {selectFile && (
        <Box
          alignItems="center"
          p="1rem"
          pt={{ lg: "1rem" }}
          display="flex"
          top={0}
          width="calc(100% - 3rem)"
          height="calc(100% - 3rem)"
          position="absolute"
          backgroundColor="darkBlue.1000"
          zIndex={30}
          borderRadius="5px"
        >
          <Image
            src={selectFile}
            maxWidth="150px"
            maxHeight="150px"
            alt="avatar image"
            border="1px solid white"
            mr="1rem"
          />
          <Stack spacing="1rem" width="100%">
            <Button
              onClick={imageUpload}
              background="red"
              isLoading={imageLoading}
              fontWeight={300}
              width={"100%"}
              py="1.5rem"
              _hover={{ color: "black", backgroundColor: "white" }}
            >
              {"Accept"}
            </Button>
            <Button
              onClick={() => selectFileRef.current?.click()}
              background="red"
              fontWeight={300}
              width={"100%"}
              py="1.5rem"
              _hover={{ color: "black", backgroundColor: "white" }}
            >
              {"Change"}
            </Button>
            <Button
              onClick={() => setSelectFile("")}
              background="red"
              fontWeight={300}
              width={"100%"}
              py="1.5rem"
              _hover={{ color: "black", backgroundColor: "white" }}
            >
              {"Cancel"}
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
};
export default AvatarUpload;
