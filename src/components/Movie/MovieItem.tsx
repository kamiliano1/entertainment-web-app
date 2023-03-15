import { PageContext } from "@/src/Context";
import { AspectRatio, Flex, Icon, Stack, Text } from "@chakra-ui/react";

import React, { useContext, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { GiTv } from "react-icons/gi";
import { MdLocalMovies } from "react-icons/md";

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
  const { setMovieList, openLoginModal, bookmarkTitle, setBookmarkTitle } =
    useContext(PageContext);
  const toggleBookmark = (searchTitle: string) => {
    bookmarkTitle.includes(searchTitle)
      ? setBookmarkTitle!((prev) => prev.filter((item) => item !== searchTitle))
      : setBookmarkTitle!((prev) => [...prev, title]);
  };
  const [isHover, setIsHover] = useState<boolean>(false);
  const backgroundOpacity = isHover ? "0.5" : "0";
  const [loadingImage, setLoadingImage] = useState(true);
  const icon = category === "Movie" ? MdLocalMovies : GiTv;
  return (
    <Flex
      maxWidth={{ base: "164px", md: "220px", lg: "280px" }}
      display="inline-flex"
      direction="column"
      textColor="white"
      flexGrow={1}
      flexBasis={{ base: "154px", md: "220px", lg: "280px" }}
    >
      <Flex
        borderRadius="8px"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        flex="0 0 auto"
        position="relative"
        backgroundSize="cover"
        height={{ base: "110px", md: "140px", lg: "174px" }}
        backgroundColor="semiDarkBlue.1000"
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
            w="100%"
            h="100%"
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
              onClick={openLoginModal}
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
          _hover={{
            opacity: "100%",
          }}
        >
          <Icon
            onMouseEnter={() => setIsHover(false)}
            onMouseLeave={() => setIsHover(true)}
            onClick={() => toggleBookmark!(title)}
            px=".5rem"
            as={bookmarkTitle.includes(title) ? BsFillBookmarkFill : BsBookmark}
            _hover={{
              borderRadius: "50%",
              backgroundColor: "white",
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

//  <Box bg="semiDarkBlue.1000" position="relative">
//           <Skeleton
//             borderRadius="8px"
//             bg="semiDarkBlue.1000"
//             noOfLines={4}
//             width={{ base: "164px", md: "220px", lg: "280px" }}
//             height={{ base: "110px", md: "140px", lg: "174px" }}
//           />
//           <SkeletonCircle
//             size="9"
//             border="10px solid white"
//             position="absolute"
//             top="calc(0% + .7rem)"
//             right="calc(0% + .7rem)"
//           />
//           <SkeletonText
//             mt="4"
//             noOfLines={2}
//             spacing="3"
//             skeletonHeight="3"
//             width="70%"
//           />
//         </Box>
