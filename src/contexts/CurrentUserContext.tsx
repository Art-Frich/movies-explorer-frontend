/* eslint-disable no-underscore-dangle */
import React, {
  createContext, useContext, useState, useMemo, ReactNode,
} from 'react';
import mainApi from '../helpers/utils/MainApi';
import { inputEmailSettings, inputNameSettings } from '../helpers/constants';

interface CurrentUserContextType {
  loggedIn: boolean,
  login: () => void,
  logout: () => void,
  setName: (name: string) => void,
  setEmail: (email: string) => void,
  setId: (id: string) => void,
  setSbtMsg: (sbtMsg: string) => void,
  id: string,
  name: string,
  email: string,
  sbtMsg: string,
  checkToken: () => undefined | Promise<void>,
  setUserData: any,
  setUserDataAndLogin: any,
}

interface IReactChildren {
  children: ReactNode
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export const useCurrentUser = () => useContext(CurrentUserContext);

export function CurrentUserProvider({ children }: IReactChildren) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('Name');
  const [email, setEmail] = useState('Email@email.email');
  const [id, setId] = useState('');
  const [sbtMsg, setSbtMsg] = useState('');

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
    setSbtMsg('');
  };

  // values от useForm, values.data от main.toLogin(), т.к. name отсутствует в values при login
  const setUserData = ({ values, curUser }: any) => {
    setEmail(values[inputEmailSettings.name] || values?.data?.email);
    setName(values[inputNameSettings.name] || values?.data?.name);
    setId(values?.data?._id || curUser.id);
  };

  const setUserDataAndLogin = (data: any) => {
    login();
    setUserData(data);
  };

  const checkToken = () => {
    if (!loggedIn) {
      return mainApi.checkJWT()
        .then((res) => {
          setUserDataAndLogin({ values: res });
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
