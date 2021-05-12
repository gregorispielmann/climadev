import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {useLoading} from './Loading';

interface IDataContext {
  user: Record<string, unknown>;
  updateUser(updated: Record<string, unknown>): void;
}

export interface IUserState {
  user: Record<string, unknown>;
}

export const DataContext = createContext<IDataContext>({} as IDataContext);

export const DataProvider: React.FC = ({children}) => {
  const [data, setData] = useState<IUserState>({} as IUserState);
  const {showLoading, hideLoading} = useLoading();

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      try {
        showLoading();
        const user = await AsyncStorage.getItem('@SafeDay:user');

        if (user) setData({user: JSON.parse(user)});
      } catch (e) {
        console.log(e);
      } finally {
        hideLoading();
      }
    }

    loadStorageData();
  }, []);

  const updateUser = useCallback(async updated => {
    try {
      await AsyncStorage.setItem('@SafeDay:user', JSON.stringify(updated));
      setData({...data, user: updated});
    } catch (e) {
      console.log(e);
    } finally {
      hideLoading();
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        user: data.user,
        updateUser,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export function useData(): IDataContext {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useData must be used within an DataProvider');
  }

  return context;
}
