import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  View,
  StatusBar,
  Platform,

} from 'react-native';

import Routes from './routes';

import AppProvider from './hooks';
import { useData } from './hooks/UserData';

const App: React.FC = () => {
  const { updateUser } = useData();

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <AppProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: '#f1f2f3',
          }}
        >
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;