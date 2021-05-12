import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useData} from '../../hooks/UserData';

import {
  Container,
  TextContainer,
  Title,
  Text,
  Animation,
  ButtonContainer,
  Button,
  ButtonText,
} from './styles';
import {requestPermission} from '../../utils';

interface IComponent extends React.FC {
  navigation: any;
}

const Intro: React.FC<IComponent> = ({navigation}) => {
  const {user, updateUser} = useData();
  const [granted, setGranted] = useState(false);

  const handlePermissionClick = async () => {
    try {
      const permission = await requestPermission();
      if (permission) {
        setGranted(true);
      } else {
        Alert.alert('Oopss', 'Acesso não permitido! Tente novamente!');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleContinue = () => {
    updateUser({...user, granted: true});
    navigation.navigate('Home');
  };

  return (
    <Container>
      <Animation
        source={
          granted
            ? require('./images/location-check.gif')
            : require('./images/location-pin.gif')
        }
      />
      <TextContainer>
        <Title>{granted ? 'Que legal' : 'Olá!'}</Title>
        <Text>
          {granted
            ? 'Já temos a sua localização, então podemos continuar!'
            : 'Vamos precisar da sua localização!'}
        </Text>
      </TextContainer>
      <ButtonContainer>
        <Button
          onPress={() =>
            granted ? handleContinue() : handlePermissionClick()
          }>
          <ButtonText>
            {granted ? 'Continuar' : 'Quero permitir minha localização'}
          </ButtonText>
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Intro;
