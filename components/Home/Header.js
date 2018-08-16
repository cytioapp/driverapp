import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Body,
  Header,
  Left,
  Right,
  Title,
  Button,
  Icon
} from 'native-base';
import styles from './headerStyle';


const HeaderH = ({ status, cancelTrip, navigation }) => {
  return (
    <Header style={styles.header} iosBarStyle="light-content" androidStatusBarColor="#262626">
      <Left>
        <Button transparent onPress={navigation.openDrawer}>
          <Icon name='menu' style={styles.menuIcon} />
        </Button>
      </Left>
      <Body>
        <Title style={styles.fontText}>{status === 'free' ? 'Servicios' : 'Detalles'}</Title>
      </Body>
      <Right>
        {status === 'active' &&
          <Button transparent onPress={cancelTrip}>
            <Icon name='ios-close-circle-outline' style={styles.cancelIcon} />
          </Button>
        }
      </Right>
    </Header>
  );
}

export default HeaderH;
