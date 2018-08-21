import React, { Component } from 'react';
import { Image, Platform, View } from 'react-native';
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
  Left,
  Picker,
  Right,
  Text,
  Title
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Api from '../../utils/api';
import styles from './style';
import taxi from '../../assets/taxi.png'

export default class AssignVehicle extends Component {

  state = {
    organization: '',
    organization_name: '',
    number: '',
    organizations: [],
    actual: ''
  };

  componentDidMount(){
    this.getActualInfo();
    this.fetchOrganizations();
  }

  assignVehicle = () => {
    Api.post('/vehicles', { organization_id: this.state.organization,
                            number: this.state.number
                          })
      .then(res => {
        this.props.navigation.navigate('Home')
      }).catch(err => {
        console.log(err.response)
      });;
  }

  getActualInfo = () => {
    Api.get('/drivers/profile').then(res => {
      console.log(res)
      this.setState({
        actual: `${res.data.vehicle.organization.name} ${res.data.vehicle.number}`
      });
    })
  }

  onValueChange = (value) => {
    if(value){
      const organization = this.state.organizations.find(organization => value === organization.id);
      this.setState({
        organization: value,
        organization_name: organization.name
      })
    }
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
      <KeyboardAwareScrollView style={{flex: 1}} behavior="padding">
        <Container>
          <Header style={styles.header} iosBarStyle="light-content" androidStatusBarColor="#262626">
            <Left style={styles.headerLeft}>
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='menu' style={styles.menuIcon} />
              </Button>
            </Left>
            <Body style={styles.bodyHeader}>
              <Title style={styles.fontText}>Asignar vehículo</Title>
            </Body>
            <Right style={styles.headerRight} />
          </Header>

          <Content contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
              <Text style={styles.actualOrganization}>
                Taxi actual: {this.state.actual}
              </Text>

              <Text style={styles.label}>Número y sitio del taxi:</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.textInputWrapper}>
                  <Item style={styles.inputItem}>
                    <Input
                      autoCapitalize="none"
                      keyboardType="numeric"
                      maxLength = {4}
                      onChangeText={number => this.setState({ number })}
                      placeholder="Número"
                      placeholderStyle={styles.placeholder}
                      value={this.state.number}
                      style={styles.input}
                    />
                  </Item>
                </View>

                <Picker
                  renderHeader={backAction =>
                    <Header style={styles.header} iosBarStyle="light-content" androidStatusBarColor="#262626">
                      <Left style={styles.headerLeft}>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={styles.menuIcon} />
                        </Button>
                      </Left>
                      <Body style={styles.bodyHeader}>
                        <Title style={styles.fontText}>Selecciona el sitio</Title>
                      </Body>
                      <Right style={styles.headerRight} />
                    </Header>}
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  androidIcon={<Icon name="ios-arrow-down-outline" />}
                  mode="dropdown"
                  style={styles.picker}
                  placeholder="Selecciona el sitio"
                  placeholderStyle={styles.placeholder}
                  placeholderIconColor="#5C5C5C"
                  selectedValue={this.state.organization}
                  onValueChange={this.onValueChange}
                >
                  {Platform.OS == 'android' && <Picker.Item key='x' label='Selecciona un sitio...' value='' />}
                  {this.renderOrganizations()}
                </Picker>
              </View>

              <View style={styles.imageWrapper}>
                <Image style={styles.taxiImage} source={taxi} />
                <Text style={styles.taxiOrganization}>{this.state.organization_name}</Text>
                <Text style={styles.taxiNumber}>{this.state.number}</Text>
              </View>

              <View style={styles.buttonWrapper}>
                <Button large full style={styles.asignButton} onPress={this.assignVehicle}>
                  <Text style={styles.asignButtonText}>Asignar vehículo</Text>
                </Button>
              </View>
            </View>

          </Content>
        </Container>
      </KeyboardAwareScrollView>
    )
  }
}
