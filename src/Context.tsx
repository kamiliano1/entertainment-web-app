import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type PageContextType = {
  isOpen: boolean;
  view: "login" | "register";
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setModalView?: Dispatch<SetStateAction<"login" | "register">>;
};

const defaultState: PageContextType = {
  isOpen: false,
  view: "login",
};

interface Props {
  children: React.ReactNode;
}
const PageContext = createContext<PageContextType>(defaultState);

const PageContextProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalView, setModalView] = useState<PageContextType["view"]>("login");
  return (
    <PageContext.Provider
      value={{
        isOpen: isOpen,
        setIsOpen: setIsOpen,
        view: modalView,
        setModalView: setModalView,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
export { PageContextProvider, PageContext };
