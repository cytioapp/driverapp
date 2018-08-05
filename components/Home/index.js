import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform
} from 'react-native';
import {
  Container,
  Content,
} from 'native-base';
import TripItem from './TripItem';
import Trip from './Trip';
import Api from '../../utils/api';
import Header from './Header';
window.navigator.userAgent = "react-native";
import io from 'socket.io-client/dist/socket.io';
import geodist from 'geodist';
import Geolocation from 'react-native-geolocation-service';
import SoundPlayer from 'react-native-sound-player'

const styles = StyleSheet.create({
  fontText: {
    fontFamily: 'Nunito-Bold'
  }
})

class Home extends React.Component {

  constructor() {
    super()

    this.state = {
      status: 'free',
      currentTripId: null,
      trips: []
    }

    this.socket = io('https://murmuring-thicket-35416.herokuapp.com');
  }

  componentDidMount() {
    //Se une al room cuando se aceptó el trip por un driver
    this.socket.emit('joinToDrivers', '');

    //En caso de que haya un nuevo viaje por parte del user se debe reflejar
    //en el index de todos los drivers que tengan el trip a 4km a la redonda
    this.socket.on('newTrip', (trip) => {
      Platform.select({
        ios: () => this.compareWithCurrentPosition(trip),
        android: () => {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            .then(granted => {
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.compareWithCurrentPosition(trip)
                try {
                  // play the file appointed.mp3
                  SoundPlayer.playSoundFile('appointed', 'mp3')
                } catch (e) {
                  console.log(`cannot play the sound file`, e)
                }
              } else {
                this.setState({ error: 'Se requieren permisos de ubicación' })
              }
            });
        }
      })();
    });

    //Cuando un taxista tome un trip, debe reflejarse en el index de todos
    this.socket.on('tripTaken', (trip_id) => {
      this.setState({
        trips: this.state.trips.filter(trip => !(trip.id == trip_id.trip_id))
      });
    });

    //Cuando el usuario cancela el viaje, se refleja en el index
    this.socket.on("deleteTrip", (trip_id) => {
      this.setState({
        trips: this.state.trips.filter(trip => !(trip.id == trip_id.trip_id))
      });
    });

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
        console.log('Active trip catch', err.response)
      })
  }

  componentWillUnmount() {
    SoundPlayer.unmount()
  }

  compareWithCurrentPosition = (trip)  => {
    const geodistOptions = { exact: true, unit: 'km' };

    Geolocation.getCurrentPosition(
      (position) => {
        let { latitude, longitude } = position.coords;
        let origin_coords = {lat: latitude, lon: longitude};
        let destiny_coords = {lat: trip.lat_origin, lon: trip.lng_origin};
        let distance = geodist(origin_coords, destiny_coords, geodistOptions)
        if(distance <= 4){
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
    const { trips, status } = this.state;
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
