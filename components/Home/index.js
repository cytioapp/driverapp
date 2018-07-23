import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Container, Header, Title, Content, Body, Button } from 'native-base';
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

  cancelTrip = () => {
    this.setState({
      status: 'free',
      currentTripId: null
    });
  }

  render() {
    const { trips, status } = this.state;
    return (
      <Container>
        <Header>
          <Body>
            <Title>Viajes disponibles</Title>
          </Body>
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
            <Trip cancelTrip={this.cancelTrip} />
          </Content>
        }
      </Container>
    );
  }
}

export default Home;
