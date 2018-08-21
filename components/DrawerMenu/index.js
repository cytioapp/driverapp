import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Subscribe } from 'unstated';
import sessionState from '../../states/session';
import styles from './style';
import logoImage from '../../assets/logo2.png';
import Api from '../../utils/api';
const underlayColor = '#989898';

export default class DrawerMenu extends Component {
  state = {
    number: '',
    organizationName: ''
  }
  componentDidMount() {
    Api.get('/drivers/profile').then(res => {
      if (res.data && res.data.vehicle) {
        this.setState({
          number: res.data.vehicle.number,
          organizationName: res.data.vehicle.organization.name
        });
      }
    })
  }
  render() {
    const { navigate } = this.props.navigation;
    const { organizationName, number } = this.state;
    return (
      <Subscribe to={[sessionState]}>
        {(session) => (
          <ScrollView style={styles.menu}>
            <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
              <View style={styles.logoWrapper}>
                <Image source={logoImage} style={styles.logo}/>
                <TouchableHighlight onPress={() => navigate('AssignVehicle')}>
                  <View>
                    <Text style={styles.vehicleText}>
                      {`${organizationName} ${number}`}
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
              <TouchableHighlight onPress={() => navigate('Home')} underlayColor={underlayColor}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>Inicio</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => navigate('Profile')} underlayColor={underlayColor}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>Perfil</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => navigate('AssignVehicle')} underlayColor={underlayColor}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>Asignar vehículo</Text>
                </View>
              </TouchableHighlight >
              <TouchableHighlight onPress={session.logout} underlayColor={underlayColor}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>Cerrar sessión</Text>
                </View>
              </TouchableHighlight>
            </SafeAreaView>
          </ScrollView>
        )}
      </Subscribe>
    )
  }
}
