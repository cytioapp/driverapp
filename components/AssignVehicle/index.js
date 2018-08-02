import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView
} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Picker,
  Text,
  Title
} from 'native-base';

const styles = StyleSheet.create({
  pickerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  inputWrapper: {
    // backgroundColor: '#000000',
    alignItems: 'center',
    marginVertical: 20
  },
  inputItem: {
    height: 150,
    marginTop: 10,
    width: 150
  },
  input: {
    fontFamily: 'Nunito-Bold',
    fontSize: 50,
    textAlign: 'center'
  }

});

export default class AssignVehicle extends Component {
  constructor(){
    super();
    this.state = {
      organization: '',
      number: ''
    };
  }

  onValueChange = (value) => {
    this.setState({
      organization: value
    });
  }

  render(){
    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <Container>
          <Header>
            <Body><Title>Asignar vehículo</Title></Body>
          </Header>

          <Content contentContainerStyle={{ flex: 1 }}>
            <Form style={styles.form}>
              <Item style={styles.pickerItem} picker>
                <View>
                  <Text>Sitio</Text>
                </View>
                <View style={styles.pickerWrapper}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    style={{ width: undefined }}
                    placeholder="Selecciona el sitio"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.organization}
                    onValueChange={this.onValueChange}
                  >
                    <Picker.Item label="Libertad" value="key0" />
                    <Picker.Item label="Centro" value="key1" />
                    <Picker.Item label="El Trapiche" value="key2" />
                    <Picker.Item label="Quesería" value="key3" />
                    <Picker.Item label="Tabachines" value="key4" />
                  </Picker>
                </View>
              </Item>
            </Form>
            <View style={styles.inputWrapper}>
              <Text>Número del taxi</Text>
              <Item style={styles.inputItem} rounded>
                <Input style={styles.input} keyboardType="numeric" maxLength = {2} />
              </Item>
            </View>
          </Content>
        </Container>
      </KeyboardAvoidingView>
    )
  }
}
