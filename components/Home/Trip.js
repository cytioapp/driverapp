import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'native-base';
import openMap from 'react-native-open-maps';

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
      since: '00:06',
      latitude: '19.267041',
      longitude: '-103.717528'
    })
  }

  finishTrip = () => {
    this.props.finishTrip()
  }

  showMap = () => {
    const { latitude, longitude, address } = this.state;
    openMap({ latitude,longitude, zoom: 30, query: address });
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
        <View>
          <Button onPress={this.showMap}>
            <Text>Mostrar mapa</Text>
          </Button>
        </View>
        <Button large full danger style={{ marginTop: 7 }} onPress={this.finishTrip}>
          <Text>Finalizar servicio</Text>
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