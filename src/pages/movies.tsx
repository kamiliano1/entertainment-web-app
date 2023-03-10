import Navbar from "../components/Navbar/Navbar";
import TrendingItem from "../components/Trending/TrendingItem";
import MovieItem from "../components/Movie/MovieItem";
import { nanoid } from "nanoid";
import { useEffect, useState, useContext } from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { TrendingItemInterface } from "../components/Trending/TrendingItemInterface";
import { PageContext } from "../Context";
import InputElement from "../components/Layout/InputElement";
export default function Home() {
  const { trendingList, setTrendingList, recommendedList } =
    useContext(PageContext);

  const trendings = trendingList!.map((item) => (
    <TrendingItem
      thumbnail={item.thumbnail}
      thumnailSmall={item.thumbnail.trending.small}
      thumnailLarge={item.thumbnail.trending.large}
      title={item.title}
      year={item.year}
      category={item.category}
      rating={item.rating}
      isBookMarked={item.isBookMarked}
      isTrending={item.isTrending}
    />
  ));
  const recommended = recommendedList!.map((item) => (
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
  return (
    <Box display={{ lg: "flex" }}>
      <Navbar />
      <Stack>
        <InputElement />

        <Flex flexWrap="nowrap" overflowX="auto">
          {trendings}
        </Flex>
        <Flex>{recommended}</Flex>
      </Stack>
    </Box>
  );
}
