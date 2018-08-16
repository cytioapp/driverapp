import React, { Component } from 'react';
import { Text, Image, KeyboardAvoidingView, View } from 'react-native';
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

export default class Profile extends Component {
  render(){
    return(
      <KeyboardAvoidingView style={styles.keyboard}>
        <Header style={styles.header} iosBarStyle="light-content" androidStatusBarColor="#262626">
          <View style={styles.headerTop}>
            <Left style={styles.headerLeft}>
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='menu' style={styles.menuIcon} />
              </Button>
            </Left>
            <Body/>
            <Right style={styles.headerRight}>
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='create' style={styles.menuIcon} />
              </Button>
            </Right>
          </View>
          <View style={styles.headerBottom}>
            <View style={styles.profilePhotoWrapper}>
              <Image style={styles.profilePhoto} source={profile} />
            </View>
            <View style={styles.driverInfoWrapper}>
              <Text style={styles.name}>Juan Pérez Larios</Text>
              <StarsRate stars={5} rate={3} />
              {/* <Text style={styles.email}></Text> */}
              <Text style={styles.phoneNumber}>3123203876</Text>
            </View>
          </View>
        </Header>

        <View style={styles.container}>

          <View style={styles.darkFieldWrapper}>
            <Text style={styles.label}>Correo:</Text>
            <Text style={styles.text}>driver1@gmail.com</Text>
          </View>
          <View style={styles.darkFieldWrapper}>
            <Text style={styles.label}>Licencia:</Text>
            <Text style={styles.text}>67326-SJHDG23-WEF2</Text>
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Modelo del taxi:</Text>
            <Text style={styles.text}>Nissan 2015</Text>
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Sitio y número:</Text>
            <Text style={styles.text}>Tabachines 43</Text>
          </View>

        </View>

      </KeyboardAvoidingView>
    )
  }
}
