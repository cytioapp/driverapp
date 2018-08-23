import React from 'react';
import { Dimensions, Modal, StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base';
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  }
});

const SimpleLoading = () => {
  return (
    <Modal animationType="fade" transparent={true} >
      <View style={styles.backgroundView}>
        <Spinner color="#1F120D" />
      </View>
    </Modal>
  );
}

export default SimpleLoading;
