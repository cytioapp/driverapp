import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'native-base';

class Trip extends React.Component {
  state = {
    id: null,
    address: '',
    since: ''
  }

  componentDidMount() {
    this.setState({
      id: 1,
      address: 'Venustiano Carranza 1248, Santa Barbara, Colima',
      since: '00:06'
    })
  }

  cancelTrip = () => {
    Alert.alert(
      'Cancelar',
      '¿Está seguro que desea cancelar el servicio?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Si', onPress: () => this.props.cancelTrip() },
      ],
      { cancelable: false }
    );
  }

  render() {
    const { address, since } = this.state;
    return (
      <View style={{ padding: 15 }}>
        <View style={{}}>
          <Text style={styles.label}>Direccion</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.label}>Tiempo de espera</Text>
          <Text style={styles.time}>{since}</Text>
        </View>
        <Button large full danger style={{ marginTop: 7 }} onPress={this.cancelTrip}>
          <Text>Cancelar</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 15
  },
  label: {
    fontWeight: '700'
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 22
  },
  address: {
    fontSize: 22
  }
})

export default Trip;