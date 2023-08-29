import React, {
  createContext, useContext, useState, useMemo, ReactNode,
} from 'react';

interface CurrentUserContextType {
  loggedIn: boolean,
  login: () => void,
  logout: () => void,
}

interface ReactChildren {
  children: ReactNode
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export const useCurrentUser = () => useContext(CurrentUserContext);

export function CurrentUserProvider({ children }: ReactChildren) {
  const [loggedIn, setLoggedIn] = useState(true);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const contextValue = useMemo(() => ({ loggedIn, login, logout }), [loggedIn]);

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
}
