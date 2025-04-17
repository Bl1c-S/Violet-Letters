"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { UserProvider } from "@/app/components/contexts/userContext";

interface MainContextType {
  bgUrl: string;
  setBgUrl: (url: string) => void;
  bgStyle: React.CSSProperties;
  setBgStyle: (style: React.CSSProperties) => void;
  setDefaultBgStyle: () => void;
  pageTitle: string;
  setPageTitle: (title: string) => void;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const defaultDbStyle: React.CSSProperties = {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  };
  const setDefaultBgStyle = () => {
    setBgStyle(defaultDbStyle);
  };

  const [bgUrl, setBgUrl] = useState<string>("/assets/violet3.png");
  const [bgStyle, setBgStyle] = useState<React.CSSProperties>(defaultDbStyle);
  const [pageTitle, setPageTitle] = useState<string>("Violet Letters");

  useEffect(() => {
    setBgStyle((prevStyle) => ({
      ...prevStyle,
      backgroundImage: `url(${bgUrl})`,
    }));
  }, [bgUrl]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <MainContext.Provider
      value={{
        bgUrl,
        setBgUrl,
        bgStyle,
        setBgStyle,
        setDefaultBgStyle,
        pageTitle,
        setPageTitle,
      }}
    >
      <UserProvider>
        <div style={bgStyle}>{children}</div>
      </UserProvider>
    </MainContext.Provider>
  );
};

export const useMainContext = (): MainContextType => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext должен использоваться внутри MainProvider");
  }
  return context;
};
