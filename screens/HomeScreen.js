// import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import firebase from 'firebase';
// import LoginForm from './LoginForm';


// class App extends Component {
//     componentDidMount() {
//         firebase.initializeApp({
//           apiKey: "AIzaSyBY2RMCGYPwsrs5M3wwsDgWSSPlPN-9800",
//           authDomain: "noyouchoose-9f5b1.firebaseapp.com",
//           databaseURL: "https://noyouchoose-9f5b1.firebaseio.com",
//           projectId: "noyouchoose-9f5b1",
//           storageBucket: "noyouchoose-9f5b1.appspot.com",
//           messagingSenderId: "837429104319"
//         });
//     }
//     render() {
//         return (
//             <View>
//                 <Text>Howdy World!</Text>
//             <LoginForm />
//             </View>
//       )
//     }
// }

// export default App;

import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Alert, Dimensions, Animated, Image } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import io from 'socket.io-client';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class App extends Component {
  constructor(){
    super()
    this.id = this.makeid();
    this.state = {
      mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      locationResult: null,
      random: false,
      location: {coords: { latitude: 40.6980, longitude: -73.9963}},
    }
    this.socket = io('http://d5306bc9.ngrok.io', {
      transports: ['websocket'], jsonp: false,
    });

    // this.socket = io('http://localhost:5000', {
    //   transports: ['websocket'],
    // })
    // this.socket.connect();
    // this.socket.on('connect', () => console.log('connected!'));

    // this.socket.on('response', (data) => {console.log(data)})
  }

  makeid() {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  componentDidMount() {
    this.socket.connect();
    this.socket.on('connect', () => {
      console.log('connected to socket server');
    });

    // fetch('http://b52cf9f3.ngrok.io')
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     console.log(responseJson);
    //     this.setState({
    //       random: responseJson
    //     })
    //   })


    this._getLocationAsync();
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    // this.socket.emit('position', {
    //   data: location,
    //   id: this.id
    // })

    this.setState({ locationResult: JSON.stringify(location), location });
  };

  render() {
    // this.socket.on('greeting', (data) => console.log(data));
    // this.socket.emit('initial', {hello: 'hi'});
    // this.socket.on('response', (data) => console.log(data))

    return (
      <View style={{flex: 1}}>

         <MapView
        ref={ref => { this.map = ref; }}
        style={styles.map}
        region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        showsUserLocation={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    // margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  map: {
    flex: 1
  }
});
