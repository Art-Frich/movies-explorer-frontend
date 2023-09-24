import React, {
  useMemo, createContext, useContext, ReactNode, useState, useEffect,
} from 'react';

interface IErrorPopupContext {
  setErMsg: (newValue: string) => void,
  er: string,
}

interface IReactChildren {
  children: ReactNode;
}

const ErrorPopupContext = createContext<IErrorPopupContext | undefined>(undefined);
export const useErrorPopupContext = () => useContext(ErrorPopupContext);

export function ErrorPopupProvider({ children }: IReactChildren) {
  const [newVal, setnewVal] = useState('');
  const [er, setEr] = useState('');

  const setErMsg = (val: string) => {
    setEr('');
    setnewVal(val);
  };

  const contextValue = useMemo(() => ({
    er, setErMsg,
  }), [er]);

  useEffect(() => {
    if (newVal) {
      setEr(newVal);
      setnewVal('');
    }
  }, [newVal]);

  return (
    <ErrorPopupContext.Provider value={contextValue}>
      {children}
    </ErrorPopupContext.Provider>
  );
}
