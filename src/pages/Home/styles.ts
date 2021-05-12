  import styled from 'styled-components/native';

  export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;

    background-color: #2979FF;
  `;

  export const Title = styled.Text`
    font-size: 36px;
    font-family: 'Spartan-Regular';
    letter-spacing: .5px;
    color: #FFF;

    margin-bottom: 10px;
  `;

  interface IText {
    $paddingRight?: boolean;
  }

  export const Text = styled.Text<IText>`
    font-size: 16px;
    font-family: 'Spartan-Regular';
    letter-spacing: .5px;
    color: #FFF;

    margin-top: 10px;
    padding-right: ${props => props.$paddingRight ? '15px' : 0};
  `;

  export const DataContainer = styled.View`
    padding: 20px 0;
    justify-content: center;
    align-items: center;
  `;

  export const Feat = styled.Text`
    font-family: 'Spartan-Bold';
    text-transform: uppercase;
    color: #fff;
    margin: 10px 0;
  `;

  export const Icon = styled.Image`
    width: 200px;
    height: 200px;
    margin-top: 10px;
  `;

  export const Temperature = styled.Text`
    font-size: 48px;
    font-family: 'Spartan-Black';
    letter-spacing: .5px;
    color: #FFF;
  `;

  export const ButtonContainer = styled.View`
    margin-top: 20px;
  `;

  export const Button = styled.TouchableOpacity`
    background: #0D47A1;

    padding: 20px 30px;
    border-radius: 5px;

    margin: 0;
  `;

  export const ButtonText = styled.Text`
    font-family: 'Spartan-Bold';
    color: #fff;
  `;

  export const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 10px 0;
  `;