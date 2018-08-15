import { Dimensions, StyleSheet } from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  backgroundImage: {
    minHeight: window.height,
    width: '100%'
  },
  completeContainer: {
    flex: 1
  },
  content: {
    flex: 1
  },
  logoContainer: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'flex-end',
    marginBottom: 40
  },
  logoImage: {
    height: 125,
    width: 150
  },
  contentContainer: {
    flex: 2
  },
  termsButtonsWrapper: {
    paddingVertical: 10
  },
  termsTextButton: {
    color: '#1F1F1F',
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  footer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginVertical: 15
  }
});

export default styles;
