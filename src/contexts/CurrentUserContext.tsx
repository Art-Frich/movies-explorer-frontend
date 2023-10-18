/* eslint-disable no-underscore-dangle */
import React, {
  createContext, useContext, useState, useMemo, ReactNode,
} from 'react';
import mainApi from '../helpers/utils/MainApi';
import { inputEmailSettings, inputNameSettings } from '../helpers/constants';
import { IdataUser, IdataUserAndInputValues } from '../helpers/InterfacesOfDataUser';

interface CurrentUserContextType {
  loggedIn: boolean,
  id: string,
  name: string,
  email: string,
  sbtMsg: string,
  resData: IdataUser | null,
  setResData: React.Dispatch<React.SetStateAction<IdataUser | null>>
  login: () => void,
  logout: () => void,
  setName: (name: string) => void,
  setEmail: (email: string) => void,
  setId: (id: string) => void,
  setSbtMsg: (sbtMsg: string) => void,
  checkToken: () => undefined | Promise<void>,
  setUserData: (data: IdataUserAndInputValues) => void,
  setUserDataAndLogin: (data: IdataUserAndInputValues) => void,
}

interface IReactChildren {
  children: ReactNode
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);

  if (context === null) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }

  return context;
};

export function CurrentUserProvider({ children }: IReactChildren) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('Name');
  const [email, setEmail] = useState('Email@email.email');
  const [id, setId] = useState('');
  const [sbtMsg, setSbtMsg] = useState('');
  const [resData, setResData] = useState<IdataUser | null>(
    { data: { _id: id, name, email } }
  );

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
    setSbtMsg('');
  };

  // values от useForm, values.data от main.toLogin(), т.к. name отсутствует в values при login
  const setUserData = ({ values }: IdataUserAndInputValues) => {
    setEmail(values[inputEmailSettings.name] || values.data.email);
    setName(values[inputNameSettings.name] || values.data.name);
    setId(values.data._id);
  };

  const setUserDataAndLogin = (data: IdataUserAndInputValues) => {
    login();
    setUserData(data);
  };

  const checkToken = () => {
    if (!loggedIn) {
      return mainApi.checkJWT()
        .then((res) => {
          setUserDataAndLogin({ values: res } as IdataUserAndInputValues);
        })
        .catch(() => {
        });
    }
    return Promise.resolve();
  };

  const contextValue = useMemo(() => ({
    loggedIn,
    sbtMsg,
    email,
    name,
    id,
    resData,
    setResData,
    login,
    logout,
    setName,
    setEmail,
    setId,
    checkToken,
    setUserDataAndLogin,
    setUserData,
    setSbtMsg,
  }), [loggedIn, name, email, id, sbtMsg]);

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
}
