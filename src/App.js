import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';


class App extends Component {
  state = {
    loggedIn: null
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDkplXb_jfbMs4-LUUNOqMf1sc_4vmH7Js",
      authDomain: "test-fun-a7409.firebaseapp.com",
      databaseURL: "https://test-fun-a7409.firebaseio.com",
      projectId: "test-fun-a7409",
      storageBucket: "test-fun-a7409.appspot.com",
      messagingSenderId: "210268908785"
    });

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if(user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return(
          <Text>
            loggedIn true!
          </Text>
        );
        break;
      case false:
        return(
          <Text>
            loggedIn + this.state.loggedIn !
          </Text>
        );
        break;
      default:
        return (
          <Text>
            loggedIn default!
          </Text>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText={'Auth App'}/>
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
