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
export const useErrorPopupContext = () => {
  const context = useContext(ErrorPopupContext);

  if (context === undefined) {
    throw new Error('useCurrentUser must be used within a ErrorPopupProvider');
  }

  return context;
};

export function ErrorPopupProvider({ children }: IReactChildren) {
  const [newErVal, setNewErVal] = useState('');
  const [er, setEr] = useState('');

  const setErMsg = (val: string) => {
    setEr('');
    setNewErVal(val);
  };

  const contextValue = useMemo(() => ({
    er, setErMsg,
  }), [er]);

  useEffect(() => {
    if (newErVal) {
      setEr(newErVal);
      setNewErVal('');
    }
  }, [newErVal]);

  return (
    <ErrorPopupContext.Provider value={contextValue}>
      {children}
    </ErrorPopupContext.Provider>
  );
}
