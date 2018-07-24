import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button, Text } from 'native-base';
import openMap from 'react-native-open-maps';
import mapsIcon from '../../assets/maps-icon.png'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  item: {
    padding: 15
  },
  label: {
    fontFamily: 'Nunito-Bold',
    marginBottom: 5
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 22
  },
  text: {
    flex: 1,
    fontSize: 22,
    fontFamily: 'Nunito-Regular'
  },
  finishButton: {
    backgroundColor: '#000000',
    borderRadius: 50,
    margin: 20
  },
  finishButtonText: {
    fontFamily: 'Nunito-Bold'
  },
  buttonWrapper: {
    alignItems: 'center',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0
  },
  labelWrapper: {
    marginBottom: 20
  }
})

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
      <View style={styles.container}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>Usuario</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>Nombre usuario</Text>
          </View>
        </View>

        <View style={styles.labelWrapper}>
          <Text style={styles.label}>Dirección</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>{address}</Text>
            <TouchableOpacity onPress={this.showMap} style={{height: 70, width: 70}}>
              <Image style={{ height: '100%', width: '100%' }} source={mapsIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.label}>Tiempo de espera</Text>
          <Text style={styles.time}>{since}</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Button large full danger style={styles.finishButton} onPress={this.finishTrip}>
            <Text style={styles.finishButtonText}>Finalizar servicio</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default Trip;
