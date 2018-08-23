import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
    marginTop: 40,
    paddingHorizontal: 30,
  },
  item: {
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  },
  input: {
    textAlign: 'center',
    color: '#1F120D'
  },
  icon: {
    color: '#1F120D'
  },
  sendEmailButtonWrapper: {
    margin: 40
  },
  sendEmailButton: {
    backgroundColor: '#1F120D',
    borderRadius: 0
  },
  sendEmailButtonText: {
    color: '#E3C463',
    fontWeight: '500'
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
