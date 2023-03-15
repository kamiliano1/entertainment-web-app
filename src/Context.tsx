import { doc, getDoc } from "firebase/firestore";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MoviesInterface } from "./components/MoviesInterface/MoviesInterface";
import { auth, firestore } from "./firebase/clientApp";
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

  bookmarkTitle: string[];
  setBookmarkTitle?: Dispatch<SetStateAction<string[]>>;
};

const defaultState: PageContextType = {
  isOpen: false,
  view: "login",
  searchBarValue: "",
  bookmarkTitle: [],
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
  const [bookmarkTitle, setBookmarkTitle] = useState<string[]>([""]);

  const [movieList, setMovieList] = useState<MoviesInterface[]>([]);

  const [user, loading, error] = useAuthState(auth);

  const openLoginModal = () => {
    if (!user) {
      setIsOpen(true);
      setModalView("login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("bookmark") && !user)
      setBookmarkTitle(JSON.parse(localStorage.getItem("bookmark") as string));

    fetch("data/data.json")
      .then((res) => res.json())
      .then((data) =>
        setMovieList(
          data.map((item: MoviesInterface) =>
            bookmarkTitle.includes(item.title)
              ? { ...item, isBookmarked: true }
              : { ...item, isBookmarked: false }
          )
        )
      );
  }, []);

  useEffect(() => {
    setMovieList((prev) =>
      prev.map((item) =>
        bookmarkTitle.includes(item.title)
          ? { ...item, isBookMarked: true }
          : { ...item, isBookMarked: false }
      )
    );
  }, [bookmarkTitle]);
  useEffect(() => {
    if (bookmarkTitle.length !== 1 && !user)
      localStorage.setItem("bookmark", JSON.stringify(bookmarkTitle));
  }, [bookmarkTitle]);
  useEffect(() => {
    if (user) setModalView("userSettings");
  }, [user, modalView]);

  useEffect(() => {
    if (user) {
      const getBookmark = async () => {
        try {
          const bookmarkRef = doc(firestore, "users", user!.uid);
          const bookmark = await getDoc(bookmarkRef);
          const bookmarkData = bookmark.data();
          if (bookmarkData) setBookmarkTitle(bookmarkData.bookmarkList);
        } catch (error) {}
      };
      getBookmark();
    }
  }, [user]);
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
        setBookmarkTitle,
        bookmarkTitle,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
export { PageContextProvider, PageContext };
