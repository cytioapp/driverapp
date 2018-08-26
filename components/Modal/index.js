import React, { Component } from 'react';
import { Modal, Text, View } from 'react-native';
import { Button } from 'native-base';
import styles from './style';

export default class errorModal extends Component {
  renderErrors = errors => {
    return errors.map((error, i) => {
      return <Text key={i}>{error.message}</Text>;
    });
  };

  render() {
    const { errors, modalVisible, setModalVisible, ...modalProps } = this.props;
    return (
      <Modal
        animationType="slide"
        style={styles.modal}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}
        {...modalProps}
      >
        <View style={styles.backgroundView}>
          <View style={styles.alert}>
            <View style={styles.messages}>{this.renderErrors(errors)}</View>
            <View style={styles.buttonWrapper}>
              <Button
                rounded
                onPress={() => {
                  this.props.setModalVisible(!modalVisible);
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Ok</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
