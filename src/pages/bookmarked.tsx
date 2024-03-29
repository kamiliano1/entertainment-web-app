import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import InputElement from "../components/Layout/InputElement";
import MovieItem from "../components/Layout/Movie/MovieItem";
import { MoviesInterface } from "../components/Layout/MoviesInterface/MoviesInterface";
import Navbar from "../components/Navbar/Navbar";
import { PageContext } from "../Context";
export default function Home() {
  const { movieList, searchBarValue } = useContext(PageContext);
  const [searchedMovie, setSearchedMovies] = useState<MoviesInterface[]>([]);
  useEffect(() => {
    if (movieList)
      setSearchedMovies(
        movieList
          .filter((item) => item.isBookMarked === true)
          .filter((movie) =>
            movie.title
              .toLocaleLowerCase()
              .includes(searchBarValue.toLocaleLowerCase())
          )
      );
  }, [searchBarValue, movieList]);

  const searchItemsBookmarked = searchedMovie
    .filter((movie) => movie.isBookMarked === true)
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
  const movieItemsBookmarked = movieList!
    .filter(
      (movie) => movie.category === "Movie" && movie.isBookMarked === true
    )
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
  const tvSeriesItemsBookmarked = movieList!
    .filter(
      (movie) => movie.category === "TV Series" && movie.isBookMarked === true
    )
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
    <>
      <Head>
        <title>Bookmark - Frontend Mentor | Entertainment web app</title>
      </Head>
      <Box
        display={{ lg: "flex" }}
        mb={{ base: "3.8125rem", md: "3.5rem", lg: "3rem" }}
      >
        <Navbar />
        <Stack mt={{ lg: "2rem" }} ml={{ lg: "10rem" }} role="main">
          <InputElement placeholder="Search for bookmarked shows" />
          {searchBarValue ? (
            <>
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
              <Flex
                px="1rem"
                flexWrap="wrap"
                gap={{
                  base: ".9375rem 1rem",
                  md: "1.875rem 1.5rem",
                  lg: "2.5rem 2rem",
                }}
                w={{ lg: "90vw" }}
                maxWidth="3000px"
              >
                {searchItemsBookmarked}
              </Flex>
            </>
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
                Bookmarked Movies
              </Text>
              {!movieItemsBookmarked.length && (
                <Text
                  px="1rem"
                  pt={{ base: "24px", md: "33px", lg: "34px" }}
                  pb={{ base: "16px", md: "25px" }}
                  as="h2"
                  textColor="white"
                  fontSize={{ base: "20px", md: "32px" }}
                  lineHeight={{ base: "25.2px", md: "40.32px" }}
                >
                  List is empty
                </Text>
              )}
              <Flex
                px="1rem"
                flexWrap="wrap"
                gap={{
                  base: ".9375rem 1rem",
                  md: "1.875rem 1.5rem",
                  lg: "2.5rem 2rem",
                }}
                w={{ lg: "90vw" }}
                maxWidth="3000px"
              >
                {movieItemsBookmarked}
              </Flex>
              <Text
                px="1rem"
                pt={{ base: "24px", md: "33px", lg: "34px" }}
                pb={{ base: "16px", md: "25px" }}
                as="h2"
                textColor="white"
                fontSize={{ base: "20px", md: "32px" }}
                lineHeight={{ base: "25.2px", md: "40.32px" }}
              >
                Bookmarked TV Series
                {!tvSeriesItemsBookmarked.length && (
                  <Text
                    pt={{ base: "24px", md: "33px", lg: "34px" }}
                    pb={{ base: "16px", md: "25px" }}
                    as="p"
                    textColor="white"
                    fontSize={{ base: "20px", md: "32px" }}
                    lineHeight={{ base: "25.2px", md: "40.32px" }}
                  >
                    List is empty
                  </Text>
                )}
              </Text>
              <Flex
                px="1rem"
                flexWrap="wrap"
                gap={{
                  base: ".9375rem 1rem",
                  md: "1.875rem 1.5rem",
                  lg: "2.5rem 2rem",
                }}
                w={{ lg: "90vw" }}
                maxWidth="3000px"
              >
                {tvSeriesItemsBookmarked}
              </Flex>
            </>
          )}
        </Stack>
      </Box>
    </>
  );
}
