import React, { Component } from 'react';
import { Alert, Image, Text, View, TextInput } from 'react-native';
import {
  Body,
  Button,
  Header,
  Icon,
  Input,
  Left,
  Right,
  Title
} from 'native-base';
import styles from './style';
import profile from '../../assets/profile.png';
import Api from '../../utils/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from '../Modal';

export default class EditPhoneNumber extends Component {
  state = {
    original_phone_number: '',
    new_phone_number: '',
    buttonDisabled: true,
    errors: [],
    modalVisible: false
  };

  componentDidMount() {
    this.fillFields();
  }

  fillFields = () => {
    Api.get('/drivers/profile').then(res => {
      this.setState({
        original_phone_number: res.data.phone_number,
        new_phone_number: res.data.phone_number
      });
      this.difference();
    });
  };

  handleReturn = () => {
    if (this.difference() === true) {
      Alert.alert(
        'Cambios sin guardar',
        '¿Guardar y salir?',
        [
          {
            text: 'No',
            onPress: () => this.props.navigation.navigate('Profile')
          },
          { text: 'Si', onPress: () => this.handleSave(true) }
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.navigate('Profile');
    }
  };

  handleSave = () => {
    if (this.validatesPhone(this.state.new_phone_number)) {
      Api.put('/drivers/profile', {
        phone_number: this.state.new_phone_number
      }).then(() => {
        this.props.navigation.navigate('Profile');
      });
    } else {
      this.setState({
        errors: ['Teléfono inválido'],
        modalVisible: true
      });
    }
  };

  difference = () => {
    if (this.state.original_phone_number !== this.state.new_phone_number) {
      this.setState({ buttonDisabled: false });
      return true;
    } else {
      this.setState({ buttonDisabled: true });
      return false;
    }
  };

  validatesPhone = phone => {
    const regex = /^[0-9+ -]{10,16}$/;
    return phone.match(regex);
  };

  setModalVisible = visible => {
    this.setState({
      modalVisible: visible,
      errors: visible ? this.state.errors : []
    });
  };

  render() {
    return (
      <KeyboardAwareScrollView style={styles.keyboard}>
        <Modal
          errors={this.state.errors}
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
        />
        <Header
          style={styles.header}
          iosBarStyle="light-content"
          androidStatusBarColor="#262626"
        >
          <Left style={styles.leftHeader}>
            <Button transparent onPress={() => this.handleReturn()}>
              <Icon name="ios-arrow-back" style={styles.menuIcon} />
            </Button>
          </Left>
          <Body style={styles.bodyHeader}>
            <Title style={styles.fontText}>Editar número</Title>
          </Body>
          <Right style={styles.rightHeader} />
        </Header>

        <View style={styles.container}>
          <View style={styles.container}>
            <View style={styles.darkFieldWrapper}>
              <View style={styles.generalItem}>
                <Text style={styles.label}>Número de celular:</Text>
                <TextInput
                  placeholder="Número de celular"
                  autoCapitalize="none"
                  onChangeText={new_phone_number => {
                    this.setState({ new_phone_number }, () =>
                      this.difference()
                    );
                  }}
                  value={this.state.new_phone_number}
                  placeholderTextColor="#5C5C5C"
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.buttonWrapper}>
              <Button
                block
                style={
                  this.state.buttonDisabled
                    ? styles.buttonDisabled
                    : styles.button
                }
                disabled={this.state.buttonDisabled}
                onPress={() => this.handleSave()}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
