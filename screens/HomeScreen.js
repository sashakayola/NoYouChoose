import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import LoginForm from './LoginForm';


class App extends Component {
    componentDidMount() {
        firebase.initializeApp({
          apiKey: "AIzaSyBY2RMCGYPwsrs5M3wwsDgWSSPlPN-9800",
          authDomain: "noyouchoose-9f5b1.firebaseapp.com",
          databaseURL: "https://noyouchoose-9f5b1.firebaseio.com",
          projectId: "noyouchoose-9f5b1",
          storageBucket: "noyouchoose-9f5b1.appspot.com",
          messagingSenderId: "837429104319"
        });
    }
    render() {
        return (
            <View>
                <Text>Howdy World!</Text>
            <LoginForm />
            </View>
      )
    }
}

export default App;
