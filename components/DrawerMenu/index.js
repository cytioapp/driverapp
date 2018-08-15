import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Subscribe } from 'unstated';
import sessionState from '../../states/session';
import styles from './drawerMenuStyle';

export default class DrawerMenu extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Subscribe to={[sessionState]}>
        {(session) => (
          <ScrollView>
            <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
              <TouchableOpacity onPress={() => navigate('Home')}>
                <View style={styles.item}>
                  <Text>Inicio</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate('AssignVehicle')}>
                <View style={styles.item}>
                  <Text>Asignar vehículo</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={session.logout}>
                <View style={styles.item}>
                  <Text>Cerrar sessión</Text>
                </View>
              </TouchableOpacity>
            </SafeAreaView>
          </ScrollView>
        )}
      </Subscribe>
    )
  }
}
