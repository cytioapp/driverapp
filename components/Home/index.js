import React from 'react';
import {
  View
} from 'react-native';
import Trip from './Trip';
import TripList from './TripsList';
import Api from '../../utils/api';
import Loading from '../Loading';
import firebase from 'react-native-firebase';

class Home extends React.Component {

  state = {
    status: '',
    currentTripId: null,
    isWaiting: false
  }

  componentDidMount() {
    this.setState({isWaiting: true});
    Api.get('/drivers/active_trip')
      .then(res => {
        this.setState({isWaiting: false});
        if (res.data && res.data.active) {
          this.setState({
            status: res.data.trip.status,
            currentTripId: res.data.trip.id
          });
        } else {
          this.setState({ status: 'free' })
        }
      }).catch(err => {
        this.setState({isWaiting: false});
        if (err.response.status == 401) {
          this.props.screenProps.session.logout();
        }
        console.log('Active trip catch', err.response)
      });

    firebase.messaging().requestPermission()
      .then(() => {
        firebase.messaging().getToken()
          .then(fcmToken => {
            if (fcmToken) {
              Api.put('/users/profile', { device_id: fcmToken }).then(res => {});
            }
          });
      })
      .catch(error => {
        // User has rejected permissions  
      });
  }

  setStatus = (status) => {
    this.setState({ status });
  }

  render() {
    const { status } = this.state;
    {this.state.isWaiting && <Loading />}
    if (status == '') {
      return <Loading />
    } else if (status === 'free') {
      return (
        <TripList
          navigation={this.props.navigation}
          setStatus={this.setStatus}
        />
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
