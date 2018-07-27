import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import {
  Container,
  Content,
} from 'native-base';
import TripItem from './TripItem';
import Trip from './Trip';
import Api from '../../utils/api';
import { Subscribe } from 'unstated';
import sessionState from '../../states/session';
import Header from './Header';

const styles = StyleSheet.create({
  fontText: {
    fontFamily: 'Nunito-Bold'
  }
})

class Home extends React.Component {
  state = {
    status: 'free',
    currentTripId: null,
    trips: []
  }

  componentDidMount() {
    Api.get('/trips')
      .then(res => {
        if (Array.isArray(res.data)) {
          this.setState({ trips: res.data })
        }
      })
  }

  setFree = () => {
    this.setState({
      status: 'free',
      currentTripId: null
    });
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
        {text: 'Si', onPress: () => this.setState({
          status: 'inprogress',
          currentTripId: 1
        })},
      ],
      { cancelable: false }
    );
  }

  finishTrip = () => {
    this.setFree();
  }

  cancelTrip = () => {
    Alert.alert(
      'Cancelar',
      '¿Está seguro que desea cancelar el servicio?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Si', onPress: () => this.setFree()},
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
      <Subscribe to={[sessionState]}>
          {(session) => {
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
                {status === 'inprogress' &&
                  <Content contentContainerStyle={{flex: 1}}>
                    <Trip finishTrip={this.finishTrip} cancelTrip={this.cancelTrip} />
                  </Content>
                }
              </Container>
            )
          }}
        </Subscribe>
    );
  }
}

export default Home;
