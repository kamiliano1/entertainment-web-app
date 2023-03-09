import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type ModalViewType = "login" | "register";

type PageContextType = {
  isOpen: boolean;
  view: ModalViewType;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setModalView?: Dispatch<SetStateAction<ModalViewType>>;
  searchBarValue: string;
  searchBarValueState?: Dispatch<SetStateAction<string>>;
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
  return (
    <PageContext.Provider
      value={{
        isOpen: isOpen,
        setIsOpen: setIsOpen,
        view: modalView,
        setModalView: setModalView,
        searchBarValue: searchBar,
        searchBarValueState: setSearchBar,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
export { PageContextProvider, PageContext };
