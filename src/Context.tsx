import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MoviesInterface } from "./components/Layout/MoviesInterface/MoviesInterface";
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

  avatarURL?: string;
  setAvatarURL?: Dispatch<SetStateAction<string>>;
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
  const [avatarURL, setAvatarURL] = useState<string>("");
  const [searchBarValue, setSearchBarValue] = useState("");
  const [bookmarkTitle, setBookmarkTitle] = useState<string[]>([]);
  const [loadingDatabase, setLoadingDataBase] = useState(false);
  const [movieList, setMovieList] = useState<MoviesInterface[]>([]);
  const [user] = useAuthState(auth);

  const openLoginModal = () => {
    if (!user) {
      setIsOpen(true);
      setModalView("login");
    }
  };

  useEffect(() => {
    setSearchBarValue("");
  }, [currentTab]);

  useEffect(() => {
    if (loadingDatabase === false) {
      if (localStorage.getItem("bookmark") && !user)
        setBookmarkTitle(
          JSON.parse(localStorage.getItem("bookmark") as string)
        );
      const getUserData = async () => {
        try {
          const userDataRef = doc(firestore, "users", user!.uid);
          const userData = await getDoc(userDataRef);
          const bookmarkData = userData.data();

          if (bookmarkData) {
            setBookmarkTitle(bookmarkData.bookmarkList);
            setAvatarURL(bookmarkData.avatar);
          }
        } catch (error: any) {
          console.log("getBookmarkError", error.message);
        }
      };
      if (user) getUserData();
      fetch("data/data.json")
        .then((res) => res.json())
        .then((data) =>
          setMovieList(
            data.map((item: MoviesInterface) =>
              bookmarkTitle.includes(item.title)
                ? { ...item, isBookMarked: true }
                : { ...item, isBookMarked: false }
            )
          )
        );
      setLoadingDataBase(true);
    }
  }, [user, bookmarkTitle, loadingDatabase]);

  useEffect(() => {
    fetch("data/data.json")
      .then((res) => res.json())
      .then((data) =>
        setMovieList(
          data.map((item: MoviesInterface) =>
            bookmarkTitle.includes(item.title)
              ? { ...item, isBookMarked: true }
              : { ...item, isBookMarked: false }
          )
        )
      );
  }, [bookmarkTitle, movieList]);

  useEffect(() => {
    const updateUserBookmark = async () => {
      try {
        setMovieList((prev) =>
          prev.map((item) =>
            bookmarkTitle.includes(item.title)
              ? { ...item, isBookMarked: true }
              : { ...item, isBookMarked: false }
          )
        );
        if (user) {
          const bookmarkRef = doc(firestore, "users", user!.uid);
          const bookmark = await getDoc(bookmarkRef);

          await setDoc(bookmarkRef, {
            ...bookmark.data(),
            bookmarkList: bookmarkTitle,
          });
        }
      } catch (error: any) {
        console.log("updateUserBookmark", error.message);
      }
    };
    updateUserBookmark();
    localStorage.setItem("bookmark", JSON.stringify(bookmarkTitle));
  }, [bookmarkTitle, user]);

  useEffect(() => {
    if (user) setModalView("userSettings");
  }, [user, modalView]);

  useEffect(() => {
    if (user) {
      const getUserBookmark = async () => {
        try {
          const bookmarkRef = doc(firestore, "users", user!.uid);
          const bookmark = await getDoc(bookmarkRef);
          const bookmarkData = bookmark.data();

          if (bookmarkData) setBookmarkTitle(bookmarkData.bookmarkList);
        } catch (error: any) {
          console.log("getBookmarkError", error.message);
        }
      };
      getUserBookmark();
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
        avatarURL,
        setAvatarURL,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
export { PageContextProvider, PageContext };
