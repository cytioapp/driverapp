import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Title, Content, Body, Left, Right, Button } from 'native-base';
import TripItem from './TripItem';
import Trip from './Trip';

class Home extends React.Component {
  state = {
    status: 'free',
    currentTripId: null,
    trips: [
      {
        id: 1,
        address: 'Venustiano Carranza 1248, Santa Barbara, Colima',
        since: '00:06'
      },
      {
        id: 2,
        address: 'Bugambilias 24, Villa flores, Villa de alvarez',
        since: '02:02'
      },
      {
        id: 3,
        address: 'Calle Gral. Alvaro Obregón 48-127, Santa Martha, 28975 Villa de Álvarez, Col.',
        since: '09:22'
      }
    ]
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

  takeTrip = () => {
    this.setState({
      status: 'inprogress',
      currentTripId: 1
    });
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
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>{status === 'free' ? 'Servicios' : 'Detalles'}</Title>
          </Body>
          <Right>
            {status === 'inprogress' && 
              <TouchableOpacity onPress={this.cancelTrip}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            }
          </Right>
        </Header>
        {status === 'free' && 
          <FlatList
            data={trips}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({item}) => <TripItem key={item.id} takeTrip={this.takeTrip} status={status} {...item} />}
          />
        }
        {status === 'inprogress' && 
          <Content>
            <Trip finishTrip={this.finishTrip} cancelTrip={this.cancelTrip} />
          </Content>
        }
      </Container>
    );
  }
}

export default Home;
