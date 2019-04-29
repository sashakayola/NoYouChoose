// import React, { Component } from 'react';
// import { View, StyleSheet, Text, Button, TouchableOpacity, Alert, Dimensions, Animated, Image } from 'react-native';
// import { Constants, MapView, Location, Permissions } from 'expo';
// import io from 'socket.io-client';

// export default class App extends Component {
//   constructor(){
//     super()
//     // this.id = this.makeid();
//     this.state = {
//       mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
//       locationResult: null,
//       random: false,
//       id: null,
//       location: {coords: { latitude: 41.6980, longitude: -73.9963}},
//       friends: [],
//     }
//     this.socket = io('http://31bdf7fe.ngrok.io', {
//       transports: ['websocket'], jsonp: false,
//     });
//   }

//   componentDidMount() {
//     this.socket.connect();
//     this.socket.on('connect', () => {
//       console.log('connected to socket server');
//     });
//     this.socket.emit('register')
//     this.socket.on('registered', (id) => {
//       console.log('registered!')
//       this.setState({
//         id: id
//       })
//     })

//     this._getLocationAsync();
//     this.index = 0;
//     this.animation = new Animated.Value(0);
//   }

//   _getLocationAsync = async () => {
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);
//     if (status !== 'granted') {
//       this.setState({
//         locationResult: 'Permission to access location was denied',
//         location,
//       });
//     }

//     let location = await Location.getCurrentPositionAsync({});

//     this.socket.emit('getPosition', {
//       data: location,
//       id: this.state.id
//     });

//     this.socket.on('sendPosition', (position) => {
//       this.setState({
//         locationResult: position,
//         location: position
//       })

//       this.socket.emit('getFriends', {});
//     });

//     this.socket.on('sendFriends', (allUsers) => {
//       this.setState({
//         friends: JSON.parse(allUsers)
//       })
//       console.log("Friends on state", this.state.friends)
//     })
//   };

//   render() {
//     return (
//       <View style={{flex: 1}}>

//       <MapView
//         ref={ref => { this.map = ref; }}
//         style={styles.map}
//         region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
//         showsUserLocation={true}
//         >
//         <MapView.Marker
//           coordinate={{latitude: this.state.location.coords.latitude,
//           longitude: this.state.location.coords.longitude}}
//           title={'YOU!'}
//           pinColor={'#00ced1'}
//          >
//         </MapView.Marker>

//         {this.state.friends !== [] && this.state.friends.map((friend) => {
//           return (
//             <View key={friend.location.coords.latitude}>
//             <MapView.Marker
//           coordinate={{latitude: friend.location.coords.latitude,
//           longitude: friend.location.coords.longitude}}
//           pinColor={'#00ced1'}
//          >
//         </MapView.Marker>
//         </View>
//         )
//         })}
//       </MapView>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//   },
//   paragraph: {
//     // margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#34495e',
//   },
//   map: {
//     flex: 1
//   }
// });

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'NoYouChoose',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
    <View style={styles.container}>
      <Text style={styles.text}>No, You Choose!</Text>
      <Text>

      </Text>
      <Text style={styles.smallText}>Are you and your friends indecisive about where to eat? If so, let this app be your guide...</Text>
      <Text>


      </Text>
      <Icon name="silverware-fork-knife" size={90} color={"#db7093"}/>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    // textAlign: 'center',
    backgroundColor: '#e0ffff',
    justifyContent: 'center',
    // textAlignVertical: 'center',
    alignItems: 'center',
    flex: 1
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#c71585',
  },
  smallText: {
    fontSize: 25,
    // fontWeight: 'bold',
    color: '#c71585',
  }
})
