import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Text } from 'native-base';

const styles = StyleSheet.create({
  item: {
    padding: 15,
    paddingTop: 25,
    paddingBottom: 25

  },
  label: {
    fontWeight: '700'
  },
  top: {
    flexDirection: 'row',
    fontFamily: 'Nunito-Bold',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  time: {
    color: '#333'
  },
  address: {
    fontFamily: 'Nunito-Regular',
    fontSize: 19
  },
  fontText: {
    fontFamily: 'Nunito-Bold'
  }
})

const TripItem = ({ address_origin, since, id, takeTrip }) => {
  return (
    <TouchableHighlight onPress={() => takeTrip(id, address_origin)} underlayColor="#F2C874" >
      <View style={styles.item}>
        <View style={styles.top}>
          <Text style={styles.label}>Dirección</Text>
        </View>
        <Text style={styles.address}>{address_origin}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default TripItem;
