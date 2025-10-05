"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UsernameContextType {
  username: string;
  setUsername: (username: string) => void;
}

const UsernameContext = createContext<UsernameContextType | undefined>(
  undefined
);

export function UsernameProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsernameState] = useState<string>("");

  // Load username from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("maintainer_username");
    if (saved) {
      setUsernameState(saved);
    }
  }, []);

  const setUsername = (newUsername: string) => {
    setUsernameState(newUsername);
    if (newUsername) {
      localStorage.setItem("maintainer_username", newUsername);
    } else {
      localStorage.removeItem("maintainer_username");
    }
  };

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
}

export function useUsername() {
  const context = useContext(UsernameContext);
  if (context === undefined) {
    throw new Error("useUsername must be used within a UsernameProvider");
  }
  return context;
}
