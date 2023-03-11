import { AspectRatio, Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { PageContext } from "@/src/Context";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { GiTv } from "react-icons/gi";
import { MdLocalMovies } from "react-icons/md";
import { AiFillPlayCircle } from "react-icons/ai";
import { MovieItemInterface } from "./MovieItemInterface";
// import { MoviesInterface } from "../Trending/TrendingItemInterface";
import { MoviesInterface } from "../MoviesInterface/MoviesInterface";
const MovieItem: React.FC<MoviesInterface> = ({
  title,
  thumnailSmall,
  thumnailMedium,
  thumnailLarge,
  year,
  category,
  rating,
  isBookMarked,
  isHovered,
}) => {
  const { setBookMarkList, setRecommendedList, movieList, setMovieList } =
    useContext(PageContext);
  // const toggleBookmark = (title: string) => {
  //   setRecommendedList!((prev) =>
  //     prev.map((item) =>
  //       title === item.title ? { ...item, isBookMarked: !isBookMarked } : item
  //     )
  //   );
  // };
  const toggleBookmark = (title: string) => {
    setMovieList!((prev) =>
      prev.map((item) =>
        title === item.title ? { ...item, isBookMarked: !isBookMarked } : item
      )
    );
    setBookMarkList!(movieList!.filter((item) => item.isBookMarked));
  };
  const [isHover, setIsHover] = useState<boolean>(false);
  const backgroundOpacity = isHover ? "0.5" : "0";
  const icon = category === "Movie" ? MdLocalMovies : GiTv;
  return (
    <Flex
      direction={"column"}
      textColor="white"
      flexGrow={1}
      flexBasis={{ base: "154px", md: "220px", lg: "280px" }}
    >
      <Flex
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        flex="0 0 auto"
        position="relative"
        p="1rem"
        color="white"
        borderRadius="8px"
        backgroundSize="cover"
        backgroundColor="rgba(255, 0, 0, 0.5)"
        // maxWidth={{ base: "164px", md: "220px", lg: "280px" }}
        height={{ base: "110px", md: "140px", lg: "174px" }}
        backgroundImage={{
          base: `linear-gradient(rgba(0,0,0,${backgroundOpacity}), rgba(0,0,0,${backgroundOpacity})), url(${thumnailSmall})`,
          md: `linear-gradient(rgba(0,0,0,${backgroundOpacity}), rgba(0,0,0,${backgroundOpacity})), url(${thumnailMedium})`,
          lg: `linear-gradient(rgba(0,0,0,${backgroundOpacity}), rgba(0,0,0,${backgroundOpacity})), url(${thumnailLarge})`,
        }}
      >
        {isHover && (
          <Flex
            alignItems="center"
            position="absolute"
            w="calc(100% - 2rem)"
            h="calc(100% - 2rem)"
            justifyContent="center"
            zIndex={2}
          >
            <Flex
              cursor="pointer"
              background="rgba(255, 255, 255, .25)"
              py="9px"
              px="1rem"
              borderRadius="28.5px"
              alignItems="center"
              zIndex={30}
            >
              <Icon fontSize="22px" as={AiFillPlayCircle}></Icon>
              <Text fontSize="15px" px="1rem" fontWeight={500}>
                Play
              </Text>
            </Flex>
          </Flex>
        )}

        <AspectRatio
          zIndex={50}
          cursor="pointer"
          position="absolute"
          top="calc(0% + .5rem)"
          right="calc(0% + .5rem)"
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
            onClick={() => toggleBookmark!(title)}
            px=".5rem"
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
      <Stack justify="end">
        <Text
          as="h2"
          fontWeight={500}
          fontSize={{ base: "14px", md: "18px" }}
          lineHeight={{ base: "18px", md: "23px" }}
        >
          {title}
        </Text>
        <Flex alignItems="center" order="-1">
          <Text as="p" opacity={0.75} fontSize={{ base: "11px", md: "13px" }}>
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
          <Text as="p" opacity={0.75} fontSize={{ base: "11px", md: "13px" }}>
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
          <Text as="p" opacity={0.75} fontSize={{ base: "11px", md: "13px" }}>
            {" "}
            {rating}
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
};
export default MovieItem;
