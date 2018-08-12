import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  Text
} from 'react-native';
import {
  Container,
  Content,
} from 'native-base';
import TripItem from './TripItem';
import Trip from './Trip';
import Api from '../../utils/api';
import Header from './Header';
import geodist from 'geodist';
import firebase from 'firebase';
import firebaseConfig from '../../firebaseconfig.json';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class Home extends React.Component {

  state = {
    status: 'free',
    currentTripId: null,
    trips: [],
    refreshing: false,
  }

  componentDidMount() {
    // Solo debería traerme los trips que se generaron despues del componentDidMount
    firebase.database().ref('server/holding_trips/').on('child_added', (snapshot, prevChildKey) => {
      if (snapshot.val()) {
        this.setState({
          trips: [...this.state.trips, snapshot.val()]
        });
      } else {
        this.setState({ trips: [] });
      }
    });

    firebase.database().ref('server/holding_trips/').on('child_removed', (snapshot, prevChildKey) => {
      if (snapshot.val()) {
        this.setState({
          trips: this.state.trips.filter(item => item.id != snapshot.val().id)
        });
      } else {
        this.setState({ trips: [] });
      }
    });

    //En caso de que haya un nuevo viaje por parte del user se debe reflejar
    //en el index de todos los drivers que tengan el trip a 4km a la redonda
    /*this.socket.on('newTrip', (trip) => {
      console.log('newTrip')
      Platform.select({
        ios: () => this.compareWithCurrentPosition(trip),
        android: () => {
          console.log('Android Permissions')
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            .then(granted => {
              console.log(granted, PermissionsAndroid.RESULTS.GRANTED)
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.compareWithCurrentPosition(trip)
              } else {
                this.setState({ error: 'Se requieren permisos de ubicación' })
              }
            });
        }
      })();
    });*/

    Api.get('/drivers/active_trip')
      .then(res => {
        if (res.data && res.data.active) {
          this.setState({
            status: res.data.trip.status,
            currentTripId: res.data.trip.id
          });
        } else {
          this.getHoldingTrips();
        }
      }).catch(err => {
        if (err.response.status == 401) {
          this.props.screenProps.session.logout();
        }
        console.log('Active trip catch', err.response)
      })
  }

  compareWithCurrentPosition = (trip)  => {
    const geodistOptions = { exact: true, unit: 'km' };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let { latitude, longitude } = position.coords;
        let origin_coords = {lat: latitude, lon: longitude};
        let destiny_coords = {lat: trip.lat_origin, lon: trip.lng_origin};
        let distance = geodist(origin_coords, destiny_coords, geodistOptions)
        if (distance <= 4){
          this.setState({
            trips: [...this.state.trips, trip]
          })
        }
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  getHoldingTrips = () => {
    Api.get('/trips') //Change this endpoint to bring only the one's 4km away
      .then(res => {
        if (Array.isArray(res.data)) {
          this.setState({
            trips: res.data.filter(item => item.status == 'holding'),
            status: 'free',
            currentTripId: null
          });
        }
      }).catch(err => {
        console.log('Trips catch', err.response)
      })
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

  takeTrip = (id, address) => {
    Alert.alert(
      'Nuevo servicio',
      `¿Tomar viaje a ${address}?`,
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Si', onPress: () =>
        Api.put('/drivers/accept_trip', { trip_id: id }).then(res => {
          if (res.status == 200) {
            this.setState({
              status: 'inprogress',
              currentTripId: id
            })
          }
        })
        },
      ],
      { cancelable: false }
    );
  }

  finishTrip = () => {
    Api.put('/drivers/finish_trip')
      .then(res => {
        if (res.status == 200) {
          this.getHoldingTrips();
        } else {
          console.log(res);
        }
      })
  }

  startTrip = () => {
    Api.put('/drivers/start_trip')
      .then(res => {
        if (res.status == 200) {
          this.setState({
            status: 'active'
          });
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
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Si', onPress: () => this.getHoldingTrips()},
      ],
      { cancelable: false }
    );
  }

  render() {
    const { trips, status, tests} = this.state;
    const headerProps = {
      status,
      cancelTrip: this.cancelTrip,
      navigation: this.props.navigation
    };

    return (
      <Container contentContainerStyle={{flex: 1}}>
        <Header {...headerProps}/>
        {status === 'free' &&
          <FlatList
            data={trips}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({item}) => <TripItem key={item.id} takeTrip={this.takeTrip} status={status} {...item} />}
            refreshControl={
              <RefreshControl
               refreshing={this.state.refreshing}
               onRefresh={this.getHoldingTrips}
              />
            }
          />
        }
        {['taken', 'inprogress', 'active'].includes(status) &&
          <Content contentContainerStyle={{flex: 1}}>
            <Trip status={status} finishTrip={this.finishTrip} cancelTrip={this.cancelTrip} startTrip={this.startTrip} />
          </Content>
        }
      </Container>
    )
  }
}

export default Home;
