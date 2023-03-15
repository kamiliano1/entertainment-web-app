import { PageContext } from "@/src/Context";
import { AspectRatio, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { GiTv } from "react-icons/gi";
import { MdLocalMovies } from "react-icons/md";
import { MoviesInterface } from "../MoviesInterface/MoviesInterface";
const TrendingItem: React.FC<MoviesInterface> = ({
  title,
  thumnailSmall,
  thumnailLarge,
  year,
  category,
  rating,
  isBookMarked,
  isHovered,
}) => {
  const { setMovieList, openLoginModal, setBookmarkTitle, bookmarkTitle } =
    useContext(PageContext);

  // const toggleBookmark = (title: string) => {
  //   setMovieList!((prev) =>
  //     prev.map((item) =>
  //       title === item.title ? { ...item, isBookMarked: !isBookMarked } : item
  //     )
  //   );
  // };
  const toggleBookmark = (searchTitle: string) => {
    // bookmarkTitle.includes(searchTitle)
    //   ? setBookmarkTitle!((prev) => prev.filter((item) => item !== searchTitle))
    //   : setBookmarkTitle!((prev) => [...prev, title]);
    // console.log(bookmarkTitle.includes(searchTitle));
    console.log("bookmarkTitle", bookmarkTitle);
  };
  const [isHover, setIsHover] = useState<boolean>(false);
  const backgroundOpacity = isHover ? "0.5" : "0";
  const icon = category === "Movie" ? MdLocalMovies : GiTv;
  return (
    <Flex
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      flex="0 0 auto"
      position="relative"
      p="1rem"
      color="white"
      borderRadius="8px"
      backgroundSize="cover"
      backgroundColor="semiDarkBlue.1000"
      width={{ base: "240px", md: "470px" }}
      height={{ base: "140px", md: "230px" }}
      backgroundImage={{
        base: `linear-gradient(rgba(0,0,0,${backgroundOpacity}), rgba(0,0,0,${backgroundOpacity})), url(${thumnailSmall})`,
        md: `linear-gradient(rgba(0,0,0,${backgroundOpacity}), rgba(0,0,0,${backgroundOpacity})), url(${thumnailLarge})`,
      }}>
      {isHover && (
        <Flex
          alignItems="center"
          position="absolute"
          w="calc(100% - 2rem)"
          h="calc(100% - 2rem)"
          justifyContent="center"
          zIndex={2}>
          <Flex
            cursor="pointer"
            background="rgba(255, 255, 255, .25)"
            py="9px"
            px="1rem"
            borderRadius="28.5px"
            alignItems="center"
            zIndex={30}
            onClick={openLoginModal}>
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
          lineHeight={{ base: "19px", md: "30px" }}>
          {title}
        </Text>
        <Flex alignItems="center" order="-1">
          <Text
            as="p"
            opacity={0.75}
            fontSize={{ base: "12px", md: "15px", lg: "15px" }}>
            {year}
          </Text>
          <Text
            as="span"
            backgroundColor="white"
            w="3px"
            h="3px"
            borderRadius="50%"
            opacity={0.5}
            mx="0.5rem"></Text>
          <Icon as={icon} fontSize={{ lg: "1.3rem" }} mx=".2rem" />
          <Text
            as="p"
            opacity={0.75}
            fontSize={{ base: "12px", md: "15px", lg: "15px" }}>
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
            mx="0.5rem"></Text>
          <Text
            as="p"
            opacity={0.75}
            fontSize={{ base: "12px", md: "15px", lg: "15px" }}>
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
        _hover={{
          opacity: "100%",
        }}>
        <Icon
          onMouseEnter={() => setIsHover(false)}
          onMouseLeave={() => setIsHover(true)}
          onClick={() => toggleBookmark(title)}
          px={2}
          as={isBookMarked ? BsFillBookmarkFill : BsBookmark}
          _hover={{
            borderRadius: "50%",
            backgroundColor: "white",
            textColor: "black",
          }}></Icon>
      </AspectRatio>
    </Flex>
  );
};
export default TrendingItem;

//  <Box bg="semiDarkBlue.1000">
//           <Skeleton
//             borderRadius="8px"
//             bg="semiDarkBlue.1000"
//             noOfLines={4}
//             width={{ base: "240px", md: "470px" }}
//             height={{ base: "140px", md: "230px" }}
//           />
//           <Image
//             w={0}
//             h={0}
//             alt=""
//             src={thumnailLarge}
//             onLoad={() => {
//               setLoadingImage(false);
//             }}
//           />
//         </Box>
