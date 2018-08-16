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
  leftHeader: {
    flex: 1
  },
  bodyHeader: {
    flex: 2
  },
  rightHeader: {
    flex: 1
  },
  menuIcon: {
    color: yellow
  },
  picker: {
    backgroundColor: textBackground,
    width: '100%'
  },
  placeholder: {
    color: text
  },
  icon: {
    color: text
  },
  inputWrapper: {
    paddingHorizontal: 20
  },
  inputItem: {
    marginVertical: 30
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
  }

});

export default styles;
