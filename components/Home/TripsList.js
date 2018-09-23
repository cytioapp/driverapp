import React from 'react';
import {
  Alert,
  FlatList,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import SoundPlayer from 'react-native-sound-player'
import { Container, Spinner, Button } from 'native-base';
import geodist from 'geodist';
import Geolocation from 'react-native-geolocation-service';
import TripItem from './TripItem';
import Header from './Header';
import Api from '../../utils/api';
import Loading from '../Loading';
import Modal from '../Modal';
import firebase from 'react-native-firebase';

let dbRef = firebase.database().ref('server/holding_trips/');

const styles = StyleSheet.create({
  emptyWrapper: {
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyText: {
    fontSize: 22,
    textAlign: 'center'
  },
  emptyInstructions: {
    marginTop: 10,
    fontSize: 18
  }
})

class TripsList extends React.Component {
  state = {
    trips: [],
    refreshing: false,
    isWaiting: false,
    modalVisible: false,
    errors: [],
    fetchingTrips: false,
    error: ''
  }

  componentDidMount() {
    this.getHoldingTrips();

    // Solo debería traerme los trips que se generaron despues del componentDidMount
    dbRef.orderByChild('timestamp').startAt(Date.now()).on('child_added', (snapshot) => {
      let trip = snapshot.val();
      if (trip) {
        this.compareWithCurrentPosition(trip)
      } else {
        this.setState({ trips: [] });
      }
    });

    dbRef.on('child_removed', (snapshot) => {
      let trip = snapshot.val();
      if (trip) {
        this.setState({
          trips: this.state.trips.filter(item => item.id != trip.id)
        });
      }
    });

    SoundPlayer.onFinishedPlaying((success) => {})
  }

  componentWillUnmount() {
    dbRef.off('child_added');
    dbRef.off('child_removed');
    SoundPlayer.unmount();
  }

  compareWithCurrentPosition = (trip)  => {
    const geodistOptions = { exact: true, unit: 'km' };

    this.currentPosition().then(({ lat, lng }) => {
      let origin_coords = { lat, lon: lng };
      let destiny_coords = { lat: trip.lat_origin, lon: trip.lng_origin };
      let distance = geodist(origin_coords, destiny_coords, geodistOptions)
      if (distance <= 10) {
        try {
          SoundPlayer.playSoundFile('appointed', 'mp3');
        } catch (e) {
          console.log('No se puede reproducir el sonido', e);
        }
        this.setState({
          trips: [...this.state.trips, trip]
        })
      }
    }).catch(err => {
      console.log('No se pudo determinar la distancia del servicio', err);
    })
  }

  checkGPSPermissions = () => {
    return new Promise((resolve, reject) => {
      Platform.select({
        ios: () => resolve(),
        android: () => {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            .then(granted => {
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return resolve()
              } else {
                this.setState({ error: 'Se requieren permisos de ubicación' })
                return reject({ error: 'Se requieren permisos de ubicación' });
              }
            });
        }
      })();
    })
  }

  currentPosition = () => {
    return new Promise((resolve, reject) => {
      this.checkGPSPermissions().then(() => {
        Geolocation.getCurrentPosition((position) => {
          let { latitude, longitude } = position.coords;
          return resolve({ lat: latitude, lng: longitude });
        },
        (error) => this.setState({ error: 'No se pudo obtener la ubicación actual' }, () => reject(error)),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
      }).catch(err => {
        this.setState({ error: 'Se requieren permisos de ubicación' });
        return reject(err);
      })
    })
  }

  getHoldingTrips = () => {
    this.setState({ fetchingTrips: true });
    this.currentPosition().then(({ lat, lng }) => {
      Api.post('/drivers/trips_in_range', { lat, lng })
        .then(res => {
          if (Array.isArray(res.data)) {
            this.setState({
              trips: res.data,
              status: 'free',
              currentTripId: null
            });
          }
          this.setState({ fetchingTrips: false });
        }).catch(err => {
          console.log('Trips catch', err.response)
          this.setState({ fetchingTrips: false });
        })
    }).catch(err => {
      console.log('No se pudo obtener la ubicacion', err);
      this.setState({ fetchingTrips: false });
    })
  }

  takeTrip = (id, address) => {
    Alert.alert(
      'Nuevo servicio',
      `¿Tomar viaje a ${address}?`,
      [
        {text: 'No', onPress: () => {}, style: 'cancel'},
        {text: 'Si', onPress: () => this.acceptTrip(id)},
      ],
      { cancelable: false }
    );
  }

  acceptTrip = id => {
    this.setState({isWaiting: true})
    Api.put('/drivers/accept_trip', { trip_id: id })
    .then(res => {
      if (res.status == 200) {
        this.setState({isWaiting: false})
        this.props.setStatus('active');
      }
    })
    .catch( err => {
      this.setState({
        isWaiting: false,
        modalVisible: true,
        errors: err.response.data.errors
      })
    })
  }

  _keyExtractor = (item) => `${item.id}`;

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "95%",
          backgroundColor: "#CED0CE",
          marginLeft: 10
        }}
      />
    );
  }

  renderEmptyComponent = () => {
    const { fetchingTrips, error } = this.state;
    if (!error) {
      return (
        <View style={styles.emptyWrapper}>
          <Text style={styles.emptyText}>No hay servicios cercanos</Text>
          <TouchableOpacity onPress={this.getHoldingTrips}>
            <Text style={styles.emptyInstructions}>Toca para buscar servicios</Text>
          </TouchableOpacity>
          {fetchingTrips && <Spinner color="#333"/>}
        </View>
      );
    } else {
      return (
        <View style={[styles.emptyWrapper, { textAlign: 'center' }]}>
          <Text style={styles.emptyText}>{error}</Text>
        </View>
      );
    }
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
      errors: visible ? this.state.errors : []
    });
  }

  render() {
    const { trips } = this.state;
    const headerProps = {
      status: 'free',
      navigation: this.props.navigation
    };
    return (
      <Container contentContainerStyle={{flex: 1}}>
        {this.state.isWaiting && <Loading />}
        <Header {...headerProps}/>
        <Modal
          errors={this.state.errors}
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
        />
        <FlatList
          data={trips}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({item}) => <TripItem key={item.id} takeTrip={this.takeTrip} {...item} />}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.getHoldingTrips}
            />
          }
          ListEmptyComponent={this.renderEmptyComponent}
        />
      </Container>
    );
  }
}

export default TripsList;
