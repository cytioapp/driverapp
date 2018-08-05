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
      number: '',
      organizations: []
    };
  }

  componentDidMount(){
    this.fetchOrganizations()
  }

  assignVehicle = () => {
    Api.post('/vehicles', { organization_id: this.state.organization,
                            number: this.state.number
                          })
      .then(res => {
        console.log(res)
        this.props.navigation.navigate('Home')
      }).catch(err => {
        console.log(err.response)
      });;
  }

  onValueChange = (value) => {
    this.setState({
      organization: value
    })
  };

  fetchOrganizations = () => {
    Api.get('/organizations').then(res => {
      this.setState({
        organizations: res.data
      });
    })
  }

  renderOrganizations = () => {
    return this.state.organizations.map(organization => {
      return <Picker.Item key={organization.id} label={organization.name} value={organization.id} />
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
                    {this.renderOrganizations()}
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
            {/* this.assignVehicle(this.state) */}
              <Button block rounded success onPress={this.assignVehicle}>
                <Text>Asignar vehículo</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </KeyboardAvoidingView>
    )
  }
}
