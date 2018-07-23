import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

const TripItem = ({ address, since, status, id, takeTrip }) => {
  return (
    <View style={styles.item}>
      <View style={styles.top}>
        <Text style={styles.label}>Direccion</Text>
        <Text style={styles.time}>{since}</Text>
      </View>
      <Text style={styles.address}>{address}</Text>
      <Button large full style={{ marginTop: 7 }} onPress={() => takeTrip(id)}>
        <Text>Tomar</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15
  },
  label: {
    fontWeight: '700'
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: '#333'
  },
  address: {
    fontSize: 19
  }
})

export default TripItem;
