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
import Api from '../../utils/api';

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

  assignVehicle = (data) => {
    Api.post('/vehicles', { organization: data.organization,
                            number: data.number,
                            license_plate: '0101018435',
                            model: 'Tsuru',
                            year: '2010',
                            service_type_id: 1
                          })
      .then(res => {
        console.log(res)
        this.props.navigation.navigate('Home')
      })
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
                    <Picker.Item label="Libertad" value="Libertad" />
                    <Picker.Item label="Centro" value="Centro" />
                    <Picker.Item label="El Trapiche" value="El Trapiche" />
                    <Picker.Item label="Quesería" value="Quesería" />
                    <Picker.Item label="Tabachines" value="Tabachines" />
                  </Picker>
                </View>
              </Item>
            </Form>
            <View style={styles.inputWrapper}>
              <Text>Número del taxi</Text>
              <Item style={styles.inputItem} rounded>
                <Input
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength = {2}
                  onChangeText={number => this.setState({ number })} />
              </Item>
            </View>
            <View>
            <Button block rounded success onPress={() => this.assignVehicle(this.state)}>
              <Text>Asignar vehículo</Text>
            </Button>
            </View>
          </Content>
        </Container>
      </KeyboardAvoidingView>
    )
  }
}
