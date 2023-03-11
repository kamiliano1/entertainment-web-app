import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { TrendingItemInterface } from "./components/Trending/TrendingItemInterface";
import { MovieItemInterface } from "./components/Movie/MovieItemInterface";
import { MoviesInterface } from "./components/MoviesInterface/MoviesInterface";
type ModalViewType = "login" | "register";

type PageContextType = {
  isOpen: boolean;
  view: ModalViewType;
  searchBarValue: string;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setModalView?: Dispatch<SetStateAction<ModalViewType>>;
  searchBarValueState?: Dispatch<SetStateAction<string>>;

  trendingList?: MoviesInterface[];
  setTrendingList?: Dispatch<SetStateAction<MoviesInterface[]>>;

  bookMarkList?: MoviesInterface[];
  setBookMarkList?: Dispatch<SetStateAction<MoviesInterface[]>>;
  recommendedList?: MoviesInterface[];
  setRecommendedList?: Dispatch<SetStateAction<MoviesInterface[]>>;

  movieList?: MoviesInterface[];
  setMovieList?: Dispatch<SetStateAction<MoviesInterface[]>>;
  // toggleBookmark?: (title: string) => void;
};

const defaultState: PageContextType = {
  isOpen: false,
  view: "login",
  searchBarValue: "",
};

interface Props {
  children: React.ReactNode;
}
const PageContext = createContext<PageContextType>(defaultState);

const PageContextProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalView, setModalView] = useState<ModalViewType>("login");
  const [searchBar, setSearchBar] = useState("");
  const [trendingList, setTrendingList] = useState<MoviesInterface[]>([]);
  const [recommendedList, setRecommendedList] = useState<MoviesInterface[]>([]);
  const [movieList, setMovieList] = useState<MoviesInterface[]>([]);
  const [bookMarkList, setBookMarkList] = useState<MoviesInterface[]>([]);
  console.log(bookMarkList);

  useEffect(() => {
    fetch("data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data);
        setTrendingList(
          data.filter((item: TrendingItemInterface) => item.isTrending === true)
        );
        setRecommendedList(
          data.filter((item: MovieItemInterface) => item.isTrending === false)
        );
      });
  }, []);

  useEffect(() => {
    setBookMarkList;
  }, [trendingList, recommendedList]);

  // const toggleBookmark = (title: string) => {
  //   setTrendingList!((prev) =>
  //     prev.map((item) =>
  //       title === item.title ? { ...item, isBookMarked: !isBookMarked } : item
  //     )
  //   );
  // };
  return (
    <PageContext.Provider
      value={{
        isOpen,
        setIsOpen,
        view: modalView,
        setModalView,
        searchBarValue: searchBar,
        searchBarValueState: setSearchBar,
        trendingList,
        setTrendingList,
        bookMarkList,
        setBookMarkList,
        recommendedList,
        setRecommendedList,
        movieList,
        setMovieList,
        // toggleBookmark,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
export { PageContextProvider, PageContext };
