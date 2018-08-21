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
  actualOrganization: {
    alignSelf: 'center',
    fontFamily: 'Nunito-Italic',
    marginBottom: 20
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
    borderRadius: 2,
    borderWidth: 1,
    flex: 1,
    marginRight: 15
  },
  label: {
    color: label,
    fontFamily: 'Nunito-Bold'
  },
  inputItem: {
  },
  input: {
    textAlign: 'center'
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 70
  },
  asignButton: {
    backgroundColor: yellow,
    marginHorizontal: 30
  },
  asignButtonText: {
    color: label,
    fontFamily: 'Nunito-Bold',
    fontSize: 15
  },
  imageWrapper: {
    marginVertical: 10
  },
  taxiOrganization: {
    fontFamily: 'Nunito-Regular',
    left: 125,
    top: 60,
    position: 'absolute',
  },
  taxiNumber: {
    fontFamily: 'Nunito-Regular',
    left: 135,
    top: 80,
    position: 'absolute',
  },
  taxiImage: {
    height: 120,
    width: 'auto'
  }

});

export default styles;
