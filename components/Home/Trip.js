import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Button, Text, Container, Content } from 'native-base';
import openMap from 'react-native-open-maps';
import mapsIcon from '../../assets/maps-icon.png'
import Header from './Header';
import Api from '../../utils/api';
import firebase from 'firebase';
import firebaseConfig from '../../firebaseconfig.json';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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
    since: '',
    full_name: '',
    refreshing: false,
    status: '',
  }

  componentDidMount() {
    this.getActiveTrip();
  }
  
  getActiveTrip = () => {
    // this.setState({ refreshing: true });
    
    Api.get('/drivers/active_trip')
      .then(res => {
        this.setState({
          refreshing: false,
          id: res.data.trip.id,
          address: res.data.trip.address_origin,
          since: '00:06',
          latitude: res.data.trip.lat_origin,
          longitude: res.data.trip.lng_origin,
          full_name: res.data.trip.user.full_name
        })
      }).catch(err => {
        // this.setState({ refreshing: false });
        console.log(err.response);
        alert('No se pudo obtener la informacion del servicio');
      })
  }

  finishTrip = () => {
    Api.put('/drivers/finish_trip')
      .then(res => {
        if (res.status == 200) {
          this.props.setStatus('free');
        } else {
          console.log(res);
        }
      })
  }

  cancelTrip = () => {
    Alert.alert(
      'Cancelar',
      '¿Está seguro que desea cancelar el servicio?',
      [
        {text: 'No', onPress: () => {}, style: 'cancel'},
        {text: 'Si', onPress: () => 
          Api.put('/drivers/cancel_trip')
            .then(res => {
              this.props.setStatus('free');
            })
            .catch(err => {
              console.log(err.response);
              alert('Ha ocurrido un error');
            })
        },
      ],
      { cancelable: false }
    );
  }

  showMap = () => {
    const { latitude, longitude, address } = this.state;
    openMap({ latitude,longitude, zoom: 30, query: address });
  }

  render() {
    const { address, since, full_name } = this.state;
    const { status } = this.props;
    const headerProps = {
      status,
      navigation: this.props.navigation,
      cancelTrip: this.cancelTrip
    };
    return (
      <Container contentContainerStyle={{flex: 1}}>
        <Header {...headerProps}/>
        <Content contentContainerStyle={{flex: 1}}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>Usuario</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.text}>{full_name}</Text>
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

          {status == 'taken' &&
            <View style={styles.buttonWrapper}>
              <Button large full primary style={styles.finishButton} onPress={this.startTrip}>
                <Text style={styles.finishButtonText}>Iniciar servicio</Text>
              </Button>
            </View>
          }

          {status == 'active' &&
            <View style={styles.buttonWrapper}>
              <Button large full danger style={styles.finishButton} onPress={this.finishTrip}>
                <Text style={styles.finishButtonText}>Finalizar servicio</Text>
              </Button>
            </View>
          }
        </Content>
      </Container>
    );
  }
}

export default Trip;
