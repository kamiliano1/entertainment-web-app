import Navbar from "../components/Navbar/Navbar";
import TrendingItem from "../components/Trending/TrendingItem";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

export default function Home() {
  const [trendingList, setTrendingList] = useState([]);

  useEffect(() => {
    fetch("data/data.json")
      .then((res) => res.json())
      .then((data) =>
        setTrendingList(data.filter((item) => item.isTrending === true))
      );
  }, []);
  const data = {
    id: nanoid(),
    title: "Beyond Earth",
    thumnailSmall: "assets/thumbnails/beyond-earth/trending/small.jpg",
    thumnailLarge: "assets/thumbnails/beyond-earth/trending/large.jpg",
    year: 2019,
    category: "Movie",
    rating: "PG",
    isBookMarked: false,
  };
  useEffect(() => {
    console.log(trendingList);
  }, [trendingList]);

  const trendings = trendingList.map((item) => (
    <TrendingItem
      thumnailSmall={item.thumbnail.trending.small}
      thumnailLarge={item.thumbnail.trending.large}
      title={item.title}
      year={item.year}
      category={item.category}
      rating={item.rating}
      isBookMarked={item.isBookMarked}
    />
  ));
  return (
    <>
      <Navbar />

      <Flex flexWrap="nowrap" overflowX="auto">
        {trendings}
      </Flex>
    </>
  );
}
