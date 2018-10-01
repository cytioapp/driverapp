import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Text } from 'native-base';
import styles from './style';
import logoImage from '../../assets/logo2.png';
import { SessionProvider } from '../Providers';

const underlayColor = '#989898';

class DrawerMenu extends Component {
  componentDidMount = () => {
    const { session } = this.props;
    session.fetchUserData();
  };

  render() {
    const { navigate } = this.props.navigation;
    const { session } = this.props;
    const { organizationName, number } = session.state.user;
    return (
      <ScrollView style={styles.menu}>
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <View style={styles.logoWrapper}>
            <Image source={logoImage} style={styles.logo} />
            <TouchableHighlight onPress={() => navigate('AssignVehicle')}>
              <View>
                <Text style={styles.vehicleText}>
                  {`${organizationName} ${number}`}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <TouchableHighlight
            onPress={() => navigate('Home')}
            underlayColor={underlayColor}
          >
            <View style={styles.item}>
              <Text style={styles.itemText}>Inicio</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigate('Profile')}
            underlayColor={underlayColor}
          >
            <View style={styles.item}>
              <Text style={styles.itemText}>Perfil</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigate('AssignVehicle')}
            underlayColor={underlayColor}
          >
            <View style={styles.item}>
              <Text style={styles.itemText}>Asignar vehículo</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={session.logout}
            underlayColor={underlayColor}
          >
            <View style={styles.item}>
              <Text style={styles.itemText}>Cerrar sesión</Text>
            </View>
          </TouchableHighlight>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default SessionProvider(DrawerMenu);
