import React, {Component} from 'react';
import {Text} from 'react-native'
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
  }

  onLoginFail() {
    const { email, password } = this.state;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onRegisterSuccess.bind(this))
      .catch(this.onRegisterFail.bind(this));
  }

  onRegisterSuccess() {
    this.setState({
      error: '',
      loading: false
    });
  }

  onRegisterFail() {
    this.setState({
      error: 'Authentication Failed',
      loading: false
    });
  }

  renderButton() {
    if( this.state.loading ){
      return (
        <Spinner size={'small'}/>
      );
    }

    return (
      <Button onPress = {this.onButtonPress.bind(this)} >
        Log in
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder = {'user@gmail.com'}
            label = {'Email'}
            value = {this.state.email}
            onChangeText = {text => this.setState({ email: text })}/>
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder = {'password'}
            label = {'Password'}
            value = {this.state.password}
            onChangeText = {password => this.setState({ password })}/>
        </CardSection>

        <Text
          style = {styles.errorStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          { this.renderButton() }
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorStyle : {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }

}

export default LoginForm;
