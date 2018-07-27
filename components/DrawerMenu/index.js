import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';

export default class DrawerMenu extends React.Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
            <View>
              <Text>Inicio</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Alarma, alarma')}>
            <View>
              <Text>Show alert</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    )
  }
}