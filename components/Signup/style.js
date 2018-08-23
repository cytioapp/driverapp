import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1C1C1C'
  },
  errorsContainer:{
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 30
  },
  errorsIcon: {
    color: '#B72A2A',
    marginRight: 15
  },
  errorsText: {
    color: '#B72A2A',
    fontSize: 15,
    marginRight: 30
  },
  form: {
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 30,
  },
  item: {
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  },
  icon: {
    color: '#1F120D'
  },
  input: {
    textAlign: 'center',
    color: '#1F120D'
  },
  licenseWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  licenseButton: {
    alignItems: 'center',
    borderColor: '#1F120D',
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10,
    flex: 5
  },
  licensePreview: {
    width: 10,
    height: 40,
    margin: 10,
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  licenseImage: {
    height: 40,
    width: 40
  },
  licenseText: {
    color: '#1F120D',
  },
  signupButtonWrapper: {
    margin: 30
  },
  signupButton: {
    backgroundColor: '#1F120D',
    borderRadius: 0
  },
  signupButtonText: {
    color: '#E3C463',
    fontWeight: '500'
  },
  createAccountWrapper: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  loginWrapper: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  loginText: {
    color: '#1F120D'
  },
  loginLink: {
    color: '#1F120D',
    textDecorationLine: 'underline'
  }
});

export default styles;
