import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import InputElement from "../components/Layout/InputElement";
import MovieItem from "../components/Movie/MovieItem";
import { MoviesInterface } from "../components/MoviesInterface/MoviesInterface";
import Navbar from "../components/Navbar/Navbar";
import { PageContext } from "../Context";
export default function Home() {
  const { movieList, searchBarValue } = useContext(PageContext);
  const [searchedMovie, setSearchedMovies] = useState<MoviesInterface[]>([]);
  useEffect(() => {
    if (movieList)
      setSearchedMovies(
        movieList
          .filter((item) => item.category === "Movie")
          .filter((movie) =>
            movie.title
              .toLocaleLowerCase()
              .includes(searchBarValue.toLocaleLowerCase())
          )
      );
  }, [searchBarValue, movieList]);

  const searchItems = searchedMovie
    .filter((movie) => movie.category === "Movie")
    .map((item) => (
      <MovieItem
        key={item.title}
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

  const movieItems = movieList!
    .filter((movies) => movies.category === "Movie")
    .map((item) => (
      <MovieItem
        key={item.title}
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
        <InputElement placeholder="Search for movies" />
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
          <Text
            px="1rem"
            pt={{ base: "24px", md: "33px", lg: "34px" }}
            pb={{ base: "16px", md: "25px" }}
            as="h1"
            textColor="white"
            fontSize={{ base: "20px", md: "32px" }}
            lineHeight={{ base: "25.2px", md: "40.32px" }}
          >
            Movies
          </Text>
        )}
        <Flex
          px="1rem"
          flexWrap="wrap"
          gap="1rem"
          w={{ lg: "90vw" }}
          maxWidth="3000px"
        >
          {searchBarValue ? searchItems : movieItems}
        </Flex>
      </Stack>
    </Box>
  );
}
