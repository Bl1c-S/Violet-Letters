"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import Cookies from "js-cookie";
import { User } from "@/backend/database/userDbManager";
import authorization, {
  BASIC_TOKEN,
  REFRESH_TOKEN,
  getBasicToken,
  getRefreshToken,
} from "@/app/login/components/Authorization";

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  logout: () => void;
  getUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = !!user;

  useEffect(() => {
    if (!isLoggedIn) {
      getUser().catch(() =>
        console.error("Ошибка чтения пользователя из куки"),
      );
    }
  }, [isLoggedIn]);

  const getUser = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Ошибка получения пользователя:", error);
    }
  };

  const login = async () => {
    try {
      const response = await fetchLogin();
      const data = await response.json();
      setUser(data.user);
    } catch (err) {}
  };

  const logout = () => {
    Cookies.remove(BASIC_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        logout,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser должен использоваться внутри UserProvider");
  }
  return context;
};

const fetchLogin = async () => {
  const token = getBasicToken();
  const response = await fetch(`/api/users/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 500) {
    await refreshLogin();
  } else if (!response.ok) {
    throw new Error("Ошибка при запросе получения пользователя");
  }

  return response;
};

const refreshLogin = async () => {
  const token = getRefreshToken();
  if (!token) throw new Error("Не найден токен обновления");

  const response = await fetch(`/api/authorization/refresh`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? "Ошибка обновления токенов");
  }

  authorization(data.basicToken, data.refreshToken);
};
