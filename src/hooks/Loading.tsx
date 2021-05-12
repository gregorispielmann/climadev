import React, {createContext, useCallback, useState, useContext} from 'react';

interface ILoadingContext {
  loading: boolean;
  showLoading(): void;
  hideLoading(): void;
}

export const LoadingContext = createContext<ILoadingContext>(
  {} as ILoadingContext,
);

export const LoadingProvider: React.FC = ({children}) => {
  const [loading, setLoading] = useState(false);

  const showLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const hideLoading = useCallback(async () => {
    setLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{loading, showLoading, hideLoading}}>
      {children}
    </LoadingContext.Provider>
  );
};

export function useLoading(): ILoadingContext {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading must be used within an LoadingProvider');
  }

  return context;
}
