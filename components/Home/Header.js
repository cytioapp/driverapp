import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Body,
  Header,
  Left,
  Right,
  Title,
  Button,
  Icon,
  Text
} from 'native-base';
import styles from './headerStyle';


const HeaderH = ({ status, cancelTrip, navigation }) => {
  return (
    <Header>
      <Left>
        <Button transparent onPress={navigation.openDrawer}>
          <Icon name='menu' />
        </Button>
      </Left>
      <Body>
        <Title style={styles.fontText}>{status === 'free' ? 'Servicios' : 'Detalles'}</Title>
      </Body>
      <Right>
        {status === 'active' &&
          <TouchableOpacity onPress={cancelTrip}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
        }
      </Right>
    </Header>
  );
}

export default HeaderH;
