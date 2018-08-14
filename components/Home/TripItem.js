import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Text } from 'native-base';
import styles from './tripItemStyle';



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
