  import styled from 'styled-components/native';

  export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
  `;

  export const TextContainer = styled.View`
    flex: 1;
  `;

  export const Title = styled.Text`
    font-size: 36px;
    font-family: 'Spartan-Regular';
    letter-spacing: .5px;
    color: #333;
  `;

  export const Text = styled.Text`
    font-size: 16px;
    font-family: 'Spartan-Regular';
    letter-spacing: .5px;
    color: #333;

    margin-top: 20px;
  `;

  export const Animation = styled.Image`
    flex: 5;
  `;

  export const ButtonContainer = styled.View`
    flex: 1;
    margin-top: 10px;
  `;

  export const Button = styled.TouchableOpacity`
    background: #ddd;

    padding: 20px 30px;
    border-radius: 5px;

    margin: 0;
  `;

  export const ButtonText = styled.Text`
    font-family: 'Spartan-Bold';
  `;