import React from 'react';
import {
  Alert,
  FlatList,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  View,
} from 'react-native';
import { Container } from 'native-base';
import geodist from 'geodist';
import TripItem from './TripItem';
import Header from './Header';
import Api from '../../utils/api';
import firebase from 'firebase';
import firebaseConfig from '../../firebaseconfig.json';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

let dbRef = firebase.database().ref('server/holding_trips/');

class TripsList extends React.Component {
  state = {
    trips: [],
    refreshing: false,
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
  }

  componentWillUnmount() {
    dbRef.off('child_added');
    dbRef.off('child_removed');
  }

  compareWithCurrentPosition = (trip)  => {
    const geodistOptions = { exact: true, unit: 'km' };

    this.currentPosition().then(({ lat, lng }) => {
      let origin_coords = { lat, lon: lng };
      let destiny_coords = { lat: trip.lat_origin, lon: trip.lng_origin };
      let distance = geodist(origin_coords, destiny_coords, geodistOptions)
      if (distance <= 4) {
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
        navigator.geolocation.getCurrentPosition((position) => {
          let { latitude, longitude } = position.coords;
          return resolve({ lat: latitude, lng: longitude });
        },
        (error) => this.setState({ error: error.message }, () => reject(error)),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
      }).catch(err => {
        console.log('Gps permissions', err);
        return reject(err);
      })
    })
  }

  getHoldingTrips = () => {
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
        }).catch(err => {
          console.log('Trips catch', err.response)
        })
    }).catch(err => {
      console.log('No se pudo obtener la ubicacion', err)
    })
  }

  takeTrip = (id, address) => {
    Alert.alert(
      'Nuevo servicio',
      `¿Tomar viaje a ${address}?`,
      [
        {text: 'No', onPress: () => {}, style: 'cancel'},
        {text: 'Si', onPress: () =>
        Api.put('/drivers/accept_trip', { trip_id: id })
          .then(res => {
            if (res.status == 200) {
              this.props.setStatus('active');
            }
          })
          .catch(err => {
            console.log(err);
            alert('No se ha logrado tomar el servicio');
          })
        },
      ],
      { cancelable: false }
    );
  }

  _keyExtractor = (item, index) => `${item.id}`;

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

  render() {
    const { trips } = this.state;
    const headerProps = {
      status: 'free',
      navigation: this.props.navigation
    };
    return (
      <Container contentContainerStyle={{flex: 1}}>
        <Header {...headerProps}/>
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
        />
      </Container>
    );
  }
}

export default TripsList;
