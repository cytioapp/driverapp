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
    paddingHorizontal: 30
  },
  errorsIcon: {
    color: '#B72A2A',
    marginRight: 15
  },
  errors: {
    color: '#B72A2A',
    fontSize: 15
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
  forgotPasswordButtonWrapper: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#1F120D',
    textDecorationLine: 'underline'
  },
  signupButtonWrapper: {
    margin: 40
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
