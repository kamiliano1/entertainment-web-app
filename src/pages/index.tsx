import Navbar from "../components/Navbar/Navbar";
import TrendingItem from "../components/Trending/TrendingItem";
import MovieItem from "../components/Movie/MovieItem";
import { nanoid } from "nanoid";
import { useEffect, useState, useContext } from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { TrendingItemInterface } from "../components/Trending/TrendingItemInterface";
import { PageContext } from "../Context";
import InputElement from "../components/Layout/InputElement";
export default function Home() {
  const { trendingList, setTrendingList, recommendedList, movieList } =
    useContext(PageContext);

  const recommended = movieList!
    .filter((movies) => movies.isTrending === false)
    .map((item) => (
      <MovieItem
        thumbnail={item.thumbnail}
        thumnailSmall={item.thumbnail.regular.small}
        thumnailMedium={item.thumbnail.regular.medium}
        thumnailLarge={item.thumbnail.regular.large}
        title={item.title}
        year={item.year}
        category={item.category}
        rating={item.rating}
        isBookMarked={item.isBookMarked}
        isTrending={item.isTrending}
      />
    ));
  const trendings = movieList!
    .filter((movies) => movies.isTrending)
    .map((item) => (
      <TrendingItem
        thumbnail={item.thumbnail}
        thumnailSmall={item.thumbnail.regular.small}
        thumnailMedium={item.thumbnail.regular.medium}
        thumnailLarge={item.thumbnail.regular.large}
        title={item.title}
        year={item.year}
        category={item.category}
        rating={item.rating}
        isBookMarked={item.isBookMarked}
        isTrending={item.isTrending}
      />
    ));
  return (
    <Box display={{ lg: "flex" }} my="2rem">
      <Navbar />
      <Stack mt={{ lg: "2rem" }}>
        <InputElement />

        <Text
          px="1rem"
          pt={{ base: "24px", md: "33px", lg: "34px" }}
          pb={{ base: "16px", md: "25px" }}
          as="h1"
          textColor="white"
          fontSize={{ base: "20px", md: "32px" }}
          lineHeight={{ base: "25.2px", md: "40.32px" }}
        >
          Trending
        </Text>
        <Flex
          px="1rem"
          flexWrap="nowrap"
          overflowX="auto"
          gap={{ base: "16px", md: "40px" }}
        >
          {trendings}
        </Flex>

        <Text
          px="1rem"
          pt={{ base: "24px", md: "39px", lg: "40px" }}
          // py="24px"
          pb={{ base: "24px", lg: "32px" }}
          as="h2"
          textColor="white"
          fontSize={{ base: "20px", md: "32px" }}
          lineHeight={{ base: "25.2px", md: "40.32px" }}
        >
          Recommended for you
        </Text>
        <Flex
          px="1rem"
          flexWrap="wrap"
          gap="1rem"
          // px="1rem"
          w={{ lg: "90vw" }}
          // backgroundColor="red"
          // w="90vw"
          // mx="2rem"
          // alignContent="center"
          maxWidth="3000px"
        >
          {recommended}
        </Flex>
      </Stack>
    </Box>
  );
}
