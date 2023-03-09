import { AspectRatio, Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { GiTv } from "react-icons/gi";
import { MdLocalMovies } from "react-icons/md";
import { AiFillPlayCircle } from "react-icons/ai";

type TrendingItemProps = {
  title: string;
  thumnailSmall: string;
  thumnailLarge: string;
  year: number;
  category: string;
  rating: string;
  isBookMarked: boolean;
  isHovered: boolean;
};

const TrendingItem: React.FC<TrendingItemProps> = ({
  title,
  thumnailSmall,
  thumnailLarge,
  year,
  category,
  rating,
  isBookMarked,
  isHovered,
}) => {
  const [isHover, setIsHover] = useState(false);
  const backgroundOpacity = isHover ? "0.5" : 0;
  const icon = category === "Movie" ? MdLocalMovies : GiTv;
  return (
    <Flex
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      flex="0 0 auto"
      position="relative"
      mx="1rem"
      p="1rem"
      color="white"
      borderRadius="8px"
      backgroundSize="cover"
      //   backgroundColor="greyishBlue.1000"
      backgroundColor="rgba(255, 0, 0, 0.5)"
      //   opacity={isHover ? ".6" : "1"}
      width={{ base: "240px", md: "470px" }}
      height={{ base: "140px", md: "230px" }}
      //   backgroundImage={{ base: `${thumnailSmall}`, md: thumnailLarge }}
      backgroundImage={{
        base: `linear-gradient(rgba(0,0,0,${backgroundOpacity}), rgba(0,0,0,${backgroundOpacity})), url(${thumnailSmall})`,
        md: `linear-gradient(rgba(0,0,0,${backgroundOpacity}), rgba(0,0,0,${backgroundOpacity})), url(${thumnailLarge})`,
      }}
    >
      {isHover && (
        <Flex
          //   backgrou

          //
          alignItems="center"
          position="absolute"
          w="calc(100% - 2rem)"
          h="calc(100% - 2rem)"
          justifyContent="center"
          zIndex={2}
        >
          <Flex
            cursor="pointer"
            // opacity={0.25}
            background="rgba(255, 255, 255, .25)"
            py="9px"
            px="1rem"
            borderRadius="28.5px"
            alignItems="center"
            zIndex={30}
          >
            <Icon fontSize="35px" as={AiFillPlayCircle}></Icon>
            <Text fontSize="18px" px="1rem" fontWeight={500}>
              Play
            </Text>
          </Flex>
        </Flex>
      )}
      <Stack justify="end">
        <Text
          as="h2"
          fontWeight={500}
          fontSize={{ base: "15px", md: "24px" }}
          lineHeight={{ base: "19px", md: "30px" }}
        >
          {title}
        </Text>
        <Flex alignItems="center" order="-1">
          <Text
            as="p"
            opacity={0.75}
            fontSize={{ base: "12px", md: "15px", lg: "24px" }}
          >
            {year}
          </Text>
          <Text
            as="span"
            backgroundColor="white"
            w="3px"
            h="3px"
            borderRadius="50%"
            opacity={0.5}
            mx="0.5rem"
          ></Text>
          <Icon as={icon} fontSize={{ lg: "1.3rem" }} mx=".2rem" />
          <Text
            as="p"
            opacity={0.75}
            fontSize={{ base: "12px", md: "15px", lg: "24px" }}
          >
            {" "}
            {category}
          </Text>
          <Text
            as="span"
            backgroundColor="white"
            w="3px"
            h="3px"
            borderRadius="50%"
            opacity={0.5}
            mx="0.5rem"
          ></Text>
          <Text
            as="p"
            opacity={0.75}
            fontSize={{ base: "12px", md: "15px", lg: "24px" }}
          >
            {" "}
            {rating}
          </Text>
        </Flex>
      </Stack>
      <AspectRatio
        zIndex={50}
        cursor="pointer"
        position="absolute"
        right="calc(0% + 1rem)"
        w={{ base: "2rem", lg: "2.5rem" }}
        ratio={1}
        backgroundColor="black"
        alignSelf="start"
        borderRadius="50%"
        opacity="50%"
      >
        <Icon
          onMouseEnter={() => setIsHover(false)}
          onMouseLeave={() => setIsHover(true)}
          px={2}
          as={isBookMarked ? BsFillBookmarkFill : BsBookmark}
          _hover={{
            borderRadius: "50%",
            backgroundColor: "white",
            opacity: "1",
            textColor: "black",
          }}
        ></Icon>
      </AspectRatio>
    </Flex>
  );
};
export default TrendingItem;
