import React, {useEffect, useState} from 'react';
import {APPID} from 'react-native-dotenv';
import Geolocation from '@react-native-community/geolocation';
import {Alert, StatusBar} from 'react-native';
import {useData} from '../../hooks/UserData';
import {checkPermission} from '../../utils';

import {
  Container,
  Title,
  Text,
  DataContainer,
  Row,
  Feat,
  Icon,
  Temperature,
  ButtonContainer,
  Button,
  ButtonText,
} from './styles';

import FadeInView from '../../components/FadeInView';
import api from '../../services/API';
import {useLoading} from '../../hooks/Loading';

interface IData {
  weather: {
    main: {
      humidity: number;
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
    };
    weather: [
      {
        description: string;
        icon: string;
      },
    ];
    name: string;
  };
  coords: {
    lat: number;
    lon: number;
  };
}

interface IComponent extends React.FC {
  navigation: any;
}

const Home: React.FC<IComponent> = ({navigation}) => {
  const {user, updateUser} = useData();
  const {loading, showLoading, hideLoading} = useLoading();
  const [data, setData] = useState<IData>({} as IData);

  const getLocation = () => {
    try {
      showLoading();
      Geolocation.getCurrentPosition(
        position => {
          setData({
            ...data,
            coords: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
          });
        },
        error => Alert.alert(error.message),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        },
      );
    } catch (e) {
      console.log(e);
    } finally {
      hideLoading();
    }
  };

  const getWeatherData = async () => {
    try {
      showLoading();
      if (APPID && data?.coords) {
        const res = await api.get(
          `weather?lat=${data?.coords?.lat}&lon=${data?.coords?.lon}&APPID=6fb66e1e6ef0ee2092539140cc9086d0&units=metric&lang=pt_br`,
        );
        setData({...data, weather: res.data});
      }
    } catch (e) {
      console.log(e);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    const loadData = async () => {
      showLoading();
      try {
        const permission = await checkPermission();
        if (permission) updateUser({...user, granted: true});
        else navigation.navigate('Intro');
      } catch (e) {
        console.log(e);
      } finally {
        hideLoading();
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (user?.granted) getLocation();
  }, [user?.granted]);

  useEffect(() => {
    if (data?.coords?.lat && data?.coords?.lon) getWeatherData();
  }, [data?.coords]);

  return (
    <FadeInView duration={1000} style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <Container>
        {data?.weather ? (
          <>
            <Title>Olá!</Title>
            <Text>O clima agora em {data?.weather?.name}</Text>
            <DataContainer>
              <Icon
                source={{
                  uri: `https://openweathermap.org/img/wn/${data?.weather?.weather[0]?.icon}@4x.png`,
                }}
              />
              <Feat>{data?.weather?.weather[0]?.description}</Feat>
              <Temperature>{data?.weather?.main?.temp}ºC</Temperature>
              <Feat>ST: {data?.weather?.main?.feels_like}ºC</Feat>
              <Row>
                <Text $paddingRight>
                  Mín: {data?.weather?.main?.temp_min}ºC
                </Text>
                <Text>Máx: {data?.weather?.main?.temp_max}ºC</Text>
              </Row>
              <Text>Umidade: {data?.weather?.main?.humidity}%</Text>
            </DataContainer>
          </>
        ) : (
          !loading && (
            <>
              <Title>Oopss!</Title>
              <Icon source={require('./images/error.gif')} />
              <Text>Não foi possível carregar as infos!</Text>
            </>
          )
        )}
        <ButtonContainer>
          <Button onPress={getWeatherData}>
            <ButtonText>Atualizar</ButtonText>
          </Button>
        </ButtonContainer>
      </Container>
    </FadeInView>
  );
};

export default Home;
