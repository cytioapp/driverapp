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
import styles from './style';


const HeaderH = ({ status, cancelTrip, navigation }) => {
  return (
    <Header style={styles.header} iosBarStyle="light-content" androidStatusBarColor="#262626">
      <Left style={styles.headerLeft}>
        <Button transparent onPress={navigation.openDrawer}>
          <Icon name='menu' style={styles.menuIcon} />
        </Button>
      </Left>
      <Body style={styles.bodyHeader}>
        <Title style={styles.fontText}>{status === 'free' ? 'Servicios' : 'Detalles'}</Title>
      </Body>
      <Right style={styles.headerRight}>
        {status === 'active' &&
          <Button transparent onPress={cancelTrip}>
            <Icon name='ios-close-circle-outline' style={styles.cancelIcon} />
          </Button>
        }
        {status === 'free' && 
          <Button transparent onPress={() => navigation.navigate('AssignVehicle')}>
            <Icon name='ios-car' style={styles.carIcon} />
          </Button>
        }
      </Right>
    </Header>
  );
}

export default HeaderH;
