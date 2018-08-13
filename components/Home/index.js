import React from 'react';
import {
  Alert,
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  Text
} from 'react-native';
import {
  Container,
  Content,
} from 'native-base';
import Trip from './Trip';
import TripList from './TripsList';
import Api from '../../utils/api';

class Home extends React.Component {

  state = {
    status: 'free',
    currentTripId: null,
  }

  componentDidMount() {
    Api.get('/drivers/active_trip')
      .then(res => {
        if (res.data && res.data.active) {
          this.setState({
            status: res.data.trip.status,
            currentTripId: res.data.trip.id
          });
        }
      }).catch(err => {
        if (err.response.status == 401) {
          this.props.screenProps.session.logout();
        }
        console.log('Active trip catch', err.response)
      })
  }

  /* monitorTrip() {
    let { currentTripId, trips } = this.state;
    firebase.database().ref('server/taken_trips/').child(`${currentTripId}`).on('child_removed', (snapshot) => {
      if (snapshot.val()) {
        this.setState({
          trips: trips.filter(item => item.id != snapshot.val().id)
        });
      } else {
        this.setState({ trips: [] });
      }
    });
  }*/

  setStatus = (status) => {
    this.setState({ status });
  }

  render() {
    const { status } = this.state;
      if (status === 'free') {
        return (
          <TripList
            navigation={this.props.navigation}
            setStatus={this.setStatus} />
        )
      } else {
        return (
          <Trip
            status={status}
            navigation={this.props.navigation}
            setStatus={this.setStatus}
          />
        )
      }
  }
}

export default Home;
