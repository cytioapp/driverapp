import React, { Component } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
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
import Api from '../../utils/api';
import styles from './style';

export default class AssignVehicle extends Component {

  state = {
    organization: '',
    number: '',
    organizations: []
  };

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
          <Header style={styles.header} iosBarStyle="light-content">
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
            <View>
              <Picker
                renderHeader={backAction =>
                  <Header style={styles.header} iosBarStyle="light-content">
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
                mode="dropdown"
                style={styles.picker}
                placeholder="Selecciona el sitio"
                placeholderStyle={styles.placeholder}
                placeholderIconColor="#5C5C5C"
                selectedValue={this.state.organization}
                onValueChange={this.onValueChange}
              >
                {this.renderOrganizations()}
              </Picker>
            </View>

            <View style={styles.inputWrapper}>
              <Item style={styles.inputItem}>
                <Input
                  autoCapitalize="none"
                  keyboardType="numeric"
                  maxLength = {4}
                  onChangeText={number => this.setState({ number })}
                  placeholder="Número del taxi"
                  placeholderStyle={styles.placeholder}
                  value={this.state.number}
                  style={styles.input}
                />
              </Item>
            </View>

            <View style={styles.buttonWrapper}>
              <Button large full style={styles.asignButton} onPress={this.assignVehicle}>
                <Text style={styles.asignButtonText}>Asignar vehículo</Text>
              </Button>
            </View>

          </Content>
        </Container>
      </KeyboardAvoidingView>
    )
  }
}
