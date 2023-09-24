import React, {
  useMemo, createContext, useState, useEffect, useContext, ReactNode,
} from 'react';

interface IErrorPopupContext {
  isOpen: boolean,
  setErMsg: (newValue: string) => void,
  erMsg: string,
  setIsOpen: (newValue: boolean) => void,
}

interface IReactChildren {
  children: ReactNode;
}

const ErrorPopupContext = createContext<IErrorPopupContext | undefined>(undefined);
export const useErrorPopupContext = () => useContext(ErrorPopupContext);

export function ErrorPopupProvider({ children }: IReactChildren) {
  const defaultMsg = 'Или нет...';
  const [isOpen, setIsOpen] = useState(false);
  const [erMsg, setErMsg] = useState(defaultMsg);

  useEffect(() => {
    if (erMsg && erMsg !== defaultMsg) setIsOpen(true);
  }, [erMsg]);

  const contextValue = useMemo(() => ({
    isOpen, setErMsg, erMsg, setIsOpen,
  }), [isOpen]);

  return (
    <ErrorPopupContext.Provider value={contextValue}>
      {children}
    </ErrorPopupContext.Provider>
  );
}
