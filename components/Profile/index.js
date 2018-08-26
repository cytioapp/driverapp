import React, { Component } from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import {
  Body,
  Button,
  Header,
  Icon,
  Left,
  Right
} from 'native-base';
import styles from './style';
import profile from '../../assets/profile.png';
import StarsRate from './StarsRate';
import Api from '../../utils/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Profile extends Component {
  state = {
    full_name: '',
    rate: 0,
    phone_number: '',
    email: '',
    license_number: '',
    model: '',
    license_plate: '',
    organization: '',
    number: ''
  }

  componentDidMount(){
    this.fetchDriverData();

  }

  fetchDriverData = () => {
    Api.get('/drivers/profile')
      .then(res => {
        this.setState({
          full_name: res.data.user.full_name,
          email: res.data.user.email,
          rate: res.data.rate,
          license_number: res.data.license_number,
          phone_number: res.data.phone_number,
          model: res.data.vehicle ? `${res.data.vehicle.model} ${res.data.vehicle.year}` : '',
          license_plate: res.data.vehicle ? res.data.vehicle.license_plate : '',
          organization: res.data.vehicle ? `${res.data.vehicle.organization.name} ${res.data.vehicle.number}` : ''
        })
      }).catch(err => console.log(`Fetch driver's info error: ${err}`))
  }

  render(){
    return(
      <KeyboardAwareScrollView style={styles.keyboard}>
        <Header style={styles.header} iosBarStyle="light-content" androidStatusBarColor="#262626">
          <View style={styles.headerTop}>
            <Left style={styles.leftHeader}>
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='menu' style={styles.menuIcon} />
              </Button>
            </Left>
            <Body/>
            <Right style={styles.rightHeader} />
          </View>
          <View style={styles.headerBottom}>
            <TouchableOpacity onPress={() => console.log('click')} style={styles.profilePhotoWrapper}>
              <Image style={styles.profilePhoto} source={profile} />
            </TouchableOpacity>
            <View style={styles.driverInfoWrapper}>
              <View style={styles.rowWrapper}>
                <Text style={styles.name}>{this.state.full_name}</Text>
                <Button transparent style={styles.editButton} onPress={() => {this.props.navigation.navigate('EditName')}}>
                  <Icon name='create' style={styles.menuIcon} />
                </Button>
              </View>
              <StarsRate stars={5} rate={this.state.rate} />
              <View style={styles.rowWrapper}>
                <Text style={styles.phoneNumber}>{this.state.phone_number}</Text>
                <Button transparent onPress={() => {this.props.navigation.navigate('EditPhoneNumber')}}>
                  <Icon name='create' style={styles.menuIcon} />
                </Button>
              </View>
            </View>
          </View>
        </Header>

        <View style={styles.container}>

          <View style={styles.darkFieldWrapper}>
            <Text style={styles.label}>Correo:</Text>
            <View style={styles.rowWrapper}>
              <Text style={styles.text}>{this.state.email}</Text>
              <Button transparent onPress={() => {this.props.navigation.navigate('EditEmail')}}>
                <Icon name='create' style={styles.menuIcon} />
              </Button>
            </View>
          </View>
          <View style={styles.darkFieldWrapper}>
            <Text style={styles.label}>Licencia:</Text>
            <View style={styles.rowWrapper}>
              <Text style={styles.text}>{this.state.license_number}</Text>
              <Button transparent onPress={() => {this.props.navigation.navigate('EditLicense')}}>
                <Icon name='create' style={styles.menuIcon} />
              </Button>
            </View>
          </View>

          {this.state.model !== '' &&
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Modelo del taxi:</Text>
              <Text style={styles.text}>{this.state.model}</Text>
            </View>
          }

          {this.state.organization !== '' &&
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Sitio y número:</Text>
              <Text style={styles.text}>{this.state.organization}</Text>
            </View>
          }

          {this.state.license_plate !== '' &&
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Placas:</Text>
              <Text style={styles.text}>{this.state.license_plate}</Text>
            </View>
          }

          {this.state.model === '' &&
            <View style={styles.noTaxiMessageWrapper}>
              <Text style={styles.label}>No tienes taxi asignado</Text>
            </View>
          }

        </View>

      </KeyboardAwareScrollView>
    )
  }
}
