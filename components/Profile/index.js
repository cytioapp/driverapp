import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
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
    phoneNumber: '+52 312 450 5499',
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
          model: `${res.data.vehicle.license_plate} ${res.data.vehicle.year}`,
          license_plate: res.data.vehicle.license_plate,
          organization: `Tabachines ${res.data.vehicle.number}`
        })
      }).catch(err => console.log(err))
  }

  render(){
    return(
      <KeyboardAwareScrollView style={styles.keyboard}>
        <Header style={styles.header} iosBarStyle="light-content" androidStatusBarColor="#262626">
          <View style={styles.headerTop}>
            <Left style={styles.headerLeft}>
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='menu' style={styles.menuIcon} />
              </Button>
            </Left>
            <Body/>
            <Right style={styles.headerRight}>
              <Button transparent onPress={() => {this.props.navigation.navigate('EditProfile')}}>
                <Icon name='create' style={styles.menuIcon} />
              </Button>
            </Right>
          </View>
          <View style={styles.headerBottom}>
            <View style={styles.profilePhotoWrapper}>
              <Image style={styles.profilePhoto} source={profile} />
            </View>
            <View style={styles.driverInfoWrapper}>
              <Text style={styles.name}>{this.state.full_name}</Text>
              <StarsRate stars={5} rate={this.state.rate} />
              <Text style={styles.phoneNumber}>{this.state.phoneNumber}</Text>
            </View>
          </View>
        </Header>

        <View style={styles.container}>

          <View style={styles.darkFieldWrapper}>
            <Text style={styles.label}>Correo:</Text>
            <Text style={styles.text}>{this.state.email}</Text>
          </View>
          <View style={styles.darkFieldWrapper}>
            <Text style={styles.label}>Licencia:</Text>
            <Text style={styles.text}>{this.state.license_number}</Text>
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Modelo del taxi:</Text>
            <Text style={styles.text}>{this.state.model}</Text>
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Sitio y número:</Text>
            <Text style={styles.text}>{this.state.organization}</Text>
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Placas:</Text>
            <Text style={styles.text}>{this.state.license_plate}</Text>
          </View>

        </View>

      </KeyboardAwareScrollView>
    )
  }
}
