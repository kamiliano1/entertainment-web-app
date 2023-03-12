import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import InputElement from "../components/Layout/InputElement";
import MovieItem from "../components/Movie/MovieItem";
import { MoviesInterface } from "../components/MoviesInterface/MoviesInterface";
import Navbar from "../components/Navbar/Navbar";
import TrendingItem from "../components/Trending/TrendingItem";
import { PageContext } from "../Context";
export default function Home() {
  const { movieList, searchBarValue } = useContext(PageContext);
  const [searchedMovie, setSearchedMovies] = useState<MoviesInterface[]>([]);
  useEffect(() => {
    if (movieList)
      setSearchedMovies(
        movieList.filter((item) =>
          item.title
            .toLocaleLowerCase()
            .includes(searchBarValue.toLocaleLowerCase())
        )
      );
  }, [searchBarValue, movieList]);

  const searchItems = searchedMovie.map((item) => (
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

  const recommendedItems = movieList!
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
  const trendingsItems = movieList!
    .filter((movies) => movies.isTrending)
    .map((item) => (
      <TrendingItem
        thumbnail={item.thumbnail}
        thumnailSmall={item.thumbnail.trending!.small}
        thumnailLarge={item.thumbnail.trending!.large}
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
        <InputElement placeholder={"Search for movies or TV series"} />
        {searchBarValue ? (
          <Text
            px="1rem"
            pt={{ base: "24px", md: "33px", lg: "34px" }}
            pb={{ base: "16px", md: "25px" }}
            as="h1"
            textColor="white"
            fontSize={{ base: "20px", md: "32px" }}
            lineHeight={{ base: "25.2px", md: "40.32px" }}
          >{`Found ${searchedMovie.length} result${
            searchedMovie.length === 1 ? "" : "s"
          } for '${searchBarValue}' `}</Text>
        ) : (
          <>
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
              // width="3710px"
              px="1rem"
              flexWrap="nowrap"
              overflowX="scroll"
              gap={{ base: "16px", md: "40px" }}
            >
              {trendingsItems}
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
          </>
        )}
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
          {searchBarValue ? searchItems : recommendedItems}
        </Flex>
      </Stack>
    </Box>
  );
}
