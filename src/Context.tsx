import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MoviesInterface } from "./components/MoviesInterface/MoviesInterface";
import { auth } from "./firebase/clientApp";
type ModalViewType = "login" | "register" | "userSettings";
export type PageNameType = "home" | "movies" | "tvSeries" | "bookmarked";
type PageContextType = {
  isOpen: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  view?: ModalViewType;
  setModalView?: Dispatch<SetStateAction<ModalViewType>>;
  openLoginModal?: () => void;

  searchBarValue: string;

  currentTab?: PageNameType;
  setCurrentTab?: Dispatch<SetStateAction<PageNameType>>;

  setSearchBarValue?: Dispatch<SetStateAction<string>>;

  movieList?: MoviesInterface[];
  setMovieList?: Dispatch<SetStateAction<MoviesInterface[]>>;
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

  const [currentTab, setCurrentTab] = useState<PageNameType>("home");

  const [searchBarValue, setSearchBarValue] = useState("");

  const [movieList, setMovieList] = useState<MoviesInterface[]>([]);

  const [user, loading, error] = useAuthState(auth);
  const openLoginModal = () => {
    if (!user) {
      setIsOpen(true);
      setModalView("login");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("bookmark")) {
      setMovieList(JSON.parse(localStorage.getItem("bookmark") as string));
      return;
    }
    fetch("data/data.json")
      .then((res) => res.json())
      .then((data) => setMovieList(data));
  }, []);

  useEffect(() => {
    if (movieList.length)
      localStorage.setItem("bookmark", JSON.stringify(movieList));
  }, [movieList]);
  useEffect(() => {
    if (user) setModalView("userSettings");
  }, [user, modalView]);

  return (
    <PageContext.Provider
      value={{
        isOpen,
        setIsOpen,
        view: modalView,
        setModalView,
        openLoginModal,
        searchBarValue,
        setSearchBarValue,
        movieList,
        setMovieList,
        setCurrentTab,
        currentTab,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
export { PageContextProvider, PageContext };
