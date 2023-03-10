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
type ModalViewType = "login" | "register";

type PageContextType = {
  isOpen: boolean;
  view: ModalViewType;
  searchBarValue: string;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setModalView?: Dispatch<SetStateAction<ModalViewType>>;
  searchBarValueState?: Dispatch<SetStateAction<string>>;
  trendingList?: TrendingItemInterface[];
  setTrendingList?: Dispatch<SetStateAction<TrendingItemInterface[]>>;
  bookMarkList?: TrendingItemInterface[];
  setBookMarkList?: Dispatch<SetStateAction<TrendingItemInterface[]>>;
  recommendedList?: MovieItemInterface[];
  setRecommendedList?: Dispatch<SetStateAction<MovieItemInterface[]>>;
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
  const [trendingList, setTrendingList] = useState<TrendingItemInterface[]>([]);
  const [recommendedList, setRecommendedList] = useState<MovieItemInterface[]>(
    []
  );
  const [bookMarkList, setBookMarkList] = useState<TrendingItemInterface[]>([]);
  useEffect(() => {
    fetch("data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setTrendingList(
          data.filter((item: TrendingItemInterface) => item.isTrending === true)
        );
        setRecommendedList(
          data.filter((item: MovieItemInterface) => item.isTrending === false)
        );
      });
  }, []);

  useEffect(() => {}, [trendingList]);
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
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
export { PageContextProvider, PageContext };
