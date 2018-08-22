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
  Title,
} from 'native-base';
import styles from './style';
import Api from '../../utils/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class EditLicense extends Component {
  state = {
    original_license_number: '',
    new_license_number: '',
    buttonDisabled: true
  }

  componentDidMount(){
    this.fillFields();
  }

  fillFields = () => {
    Api.get('/drivers/profile')
    .then(res => {
      this.setState({
        original_license_number: res.data.license_number,
        new_license_number: res.data.license_number
      });
      this.difference();
    }).catch(err => console.log(err))
  }

  handleReturn = () => {
    if(this.difference() === true){
      Alert.alert(
        'Cambios sin guardar',
        '¿Guardar y salir?',
        [
          {text: 'No'},
          {text: 'Si', onPress: () => this.handleSave(true)},
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.navigate('Profile')
    }
  }

  handleSave = (returnFlag = false) => {
    if(returnFlag) {
      Api.put('/drivers/profile', {license_number: this.state.new_license_number}).then( res => {
        this.props.navigation.navigate('Profile')
      });
    } else {
      Api.put('/drivers/profile', {license_number: this.state.new_license_number}).then( res => {
        this.fillFields();
      });
    }
  }

  difference = () => {
    if(this.state.original_license_number !== this.state.new_license_number) {
      this.setState({buttonDisabled: false})
      return true
    } else {
      this.setState({buttonDisabled: true})
      return false
    }
  }

  render(){
    return(
      <KeyboardAwareScrollView style={styles.keyboard}>
        <Header style={styles.header} iosBarStyle="light-content" androidStatusBarColor="#262626">
          <Left style={styles.leftHeader}>
            <Button transparent onPress={() => this.handleReturn()}>
              <Icon name='ios-arrow-back' style={styles.menuIcon} />
            </Button>
          </Left>
          <Body style={styles.bodyHeader}>
            <Title style={styles.fontText}>Editar licencia</Title>
          </Body>
          <Right style={styles.rightHeader} />
        </Header>

        <View style={styles.container}>
          <View style={styles.container}>
            <View style={styles.darkFieldWrapper}>
              <View style={styles.generalItem}>
                <Text style={styles.label}>Licencia:</Text>
                <Input
                    placeholder="Licencia"
                    autoCapitalize="none"
                    onChangeText={new_license_number => {
                      this.setState({ new_license_number }, () => this.difference())
                    }}
                    value={this.state.new_license_number}
                    placeholderTextColor="#5C5C5C"
                    style={styles.input}
                />
              </View>
            </View>

            <View style={styles.buttonWrapper} >
              <Button
                block
                style={ this.state.buttonDisabled ? styles.buttonDisabled : styles.button }
                disabled = {this.state.buttonDisabled}
                onPress={() => this.handleSave()}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </Button>
            </View>

          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
