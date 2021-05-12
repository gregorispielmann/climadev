import React, {useEffect} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Image, View} from 'react-native';

import {useData} from '../hooks/UserData';

import {useLoading} from '../hooks/Loading';
import Intro from '../pages/Intro';
import Home from '../pages/Home';
import {checkPermission} from '../utils';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  const {loading} = useLoading();
  const {user, updateUser} = useData();

  useEffect(() => {
    const loadData = async () => {
      const permission = await checkPermission();
      if (permission) updateUser({...user, granted: true});
    };
    loadData();
  }, []);

  return (
    <>
      {loading && (
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 9999,
            top: 0,
            left: 0,
            backgroundColor: '#2979FF',
          }}>
          <Image
            style={{width: 300, height: 300}}
            source={require('../assets/images/sun_loading.gif')}
          />
        </View>
      )}
      <App.Navigator headerMode="none">
        {user?.granted ? (
          <App.Screen name="Home" component={Home} />
        ) : (
          <App.Screen name="Intro" component={Intro} />
        )}
      </App.Navigator>
    </>
  );
};

export default AppRoutes;
