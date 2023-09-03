import React, {
  createContext, useContext, useState, useMemo, ReactNode,
} from 'react';

interface CurrentUserContextType {
  loggedIn: boolean,
  login: () => void,
  logout: () => void,
  setName: (name: string) => void,
  setEmail: (email: string) => void,
  name: string,
  email: string,
}

interface ReactChildren {
  children: ReactNode
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export const useCurrentUser = () => useContext(CurrentUserContext);

export function CurrentUserProvider({ children }: ReactChildren) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('Name');
  const [email, setEmail] = useState('Email');

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const contextValue = useMemo(() => ({
    loggedIn, login, logout, name, email, setName, setEmail,
  }), [loggedIn]);

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
}
