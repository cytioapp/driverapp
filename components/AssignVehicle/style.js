import { StyleSheet } from 'react-native';
const headerBackground = '#262626';
const yellow = '#E3C463';
const label = '#000';
const text = '#5C5C5C';
const textBackground = '#F3F3F3';

const styles = StyleSheet.create({
  fontText: {
    color: yellow,
    fontFamily: 'Nunito-Bold'
  },
  header: {
    backgroundColor: headerBackground,
  },
  headerLeft: {
    flex: 1
  },
  bodyHeader: {
    alignItems: 'center',
    flex: 2
  },
  headerRight: {
    flex: 1
  },
  menuIcon: {
    color: yellow
  },
  container: {
    padding: 15
  },
  currentOrganization: {
    backgroundColor: yellow,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  labelOrg: {
    alignSelf: 'center',
    fontFamily: 'Nunito-Bold',
  },
  textOrg: {
    fontFamily: 'Nunito-Regular',
  },
  picker: {
    backgroundColor: textBackground
  },
  placeholder: {
    color: text
  },
  icon: {
    color: text
  },
  inputWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    paddingVertical: 10
  },
  textInputWrapper: {
    borderColor: label,
    flex: 1,
    marginRight: 15
  },
  label: {
    color: label,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center'
  },
  inputItem: {
  },
  input: {
    backgroundColor: textBackground,
    textAlign: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  asignButton: {
    backgroundColor: yellow,
    marginTop: 20
  },
  asignButtonText: {
    color: label,
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
  },
  imageWrapper: {
    marginVertical: 20,
    alignItems: 'center'
  },
  wrapperOrgNum: {
    position: 'absolute',
    top: 115,
  },
  taxiOrganization: {
    fontFamily: 'Nunito-Bold',
    textAlign: 'center'
  },
  taxiNumber: {
    fontFamily: 'Nunito-Bold',
    textAlign: 'center'
  },
  taxiImage: {
    height: 250,
    width: 250
  }

});

export default styles;
