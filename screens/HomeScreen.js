// import React from 'react';
// import {
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { WebBrowser } from 'expo';

// import { MonoText } from '../components/StyledText';

// export default class HomeScreen extends React.Component {
//   static navigationOptions = {
//     header: null,
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//           <View style={styles.getStartedContainer}>
//             {/* <Text style={styles.getStartedText}>Get started by opening</Text> */}

//             {/* <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
//               <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
//             </View> */}

//             <Text style={styles.getStartedText}>
//              See the map view below!
//             </Text>
//           </View>

//           <View style={styles.helpContainer}>
//             <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
//               <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>

//         <View style={styles.tabBarInfoContainer}>
//           <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

//           <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
//             <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
//           </View>
//         </View>
//       </View>
//     );
//   }

//   _maybeRenderDevelopmentModeWarning() {
//     if (__DEV__) {
//       const learnMoreButton = (
//         <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
//           Learn more
//         </Text>
//       );

//       return (
//         <Text style={styles.developmentModeText}>
//           Development mode is enabled, your app will be slower but you can use useful development
//           tools. {learnMoreButton}
//         </Text>
//       );
//     } else {
//       return (
//         <Text style={styles.developmentModeText}>
//           You are not in development mode, your app will run at full speed.
//         </Text>
//       );
//     }
//   }

//   _handleLearnMorePress = () => {
//     WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
//   };

//   _handleHelpPress = () => {
//     WebBrowser.openBrowserAsync(
//       'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
//     );
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   developmentModeText: {
//     marginBottom: 20,
//     color: 'rgba(0,0,0,0.4)',
//     fontSize: 14,
//     lineHeight: 19,
//     textAlign: 'center',
//   },
//   contentContainer: {
//     paddingTop: 30,
//   },
//   welcomeContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   welcomeImage: {
//     width: 100,
//     height: 80,
//     resizeMode: 'contain',
//     marginTop: 3,
//     marginLeft: -10,
//   },
//   getStartedContainer: {
//     alignItems: 'center',
//     marginHorizontal: 50,
//   },
//   homeScreenFilename: {
//     marginVertical: 7,
//   },
//   codeHighlightText: {
//     color: 'rgba(96,100,109, 0.8)',
//   },
//   codeHighlightContainer: {
//     backgroundColor: 'rgba(0,0,0,0.05)',
//     borderRadius: 3,
//     paddingHorizontal: 4,
//   },
//   getStartedText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 24,
//     textAlign: 'center',
//   },
//   tabBarInfoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: { height: -3 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 20,
//       },
//     }),
//     alignItems: 'center',
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 20,
//   },
//   tabBarInfoText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     textAlign: 'center',
//   },
//   navigationFilename: {
//     marginTop: 5,
//   },
//   helpContainer: {
//     marginTop: 15,
//     alignItems: 'center',
//   },
//   helpLink: {
//     paddingVertical: 15,
//   },
//   helpLinkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });

import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const config = {
  headers: {
    Authorization: 'Bearer fmAW0diM5L5-44HUuua0b-fpqdCl7nb24nwic9nO54zMM4FE-kb3inLE2ToZ9HENk1LEbXEvghTqIijaQ4Mch8sA6NfRbBBMRr_Skmhs9P_KGjmN9DTOETqNTyDDXHYx',
  }
}

let coordinates;

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      locationResult: null,
      location: {coords: { latitude: 40.6980, longitude: -73.9963}},
      marker: '',
      isLoading: true,
      food: null
    }
    this.getFoodData = this.getFoodData.bind(this)
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  getFoodData() {
    return fetch(`https://api.yelp.com/v3/businesses/search?term=food&latitude=${this.state.marker.latitude}&longitude=${this.state.marker.longitude}&radius=800&limit=20`, config)
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        isLoading: false,
        food: responseJson.businesses
      })
    })
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
    this.setState({ locationResult: JSON.stringify(location), location });
  };

  async addMarker(coordinates) {
    // console.warn(coordinates);
    await this.setState({
      marker: coordinates
    })
    this.getFoodData()
  }

  render() {
    return (
      <View style={{flex: 1}}>
    {/* //     {this.state.isLoading && console.warn(this.state.food)} */}
        { <MapView
        ref={ref => { this.map = ref; }}
        style={styles.map}
        region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        showsUserLocation={true}
        onPress={(e) => {
          this.addMarker(e.nativeEvent.coordinate)
          // await this.getFoodData()
        }}
        >

{this.state.marker !== '' &&
        <MapView.Marker
            coordinate={{latitude: this.state.marker.latitude,
            longitude: this.state.marker.longitude}}
            title={"Let's get food around here!"}
            // description={"description"}
            // pinColor={'aqua'}
            // pinColor={'plum'}
            // pinColor={'orange'}
            // pinColor={'tomato'}
            // pinColor={'green'}
            // pinColor={'indigo'}
            // color={'#76BBB7'}
         >
         <Icon name="silverware-fork-knife" size={40} color={"indigo"} />
        </MapView.Marker>
        }

          {this.state.marker !== '' &&
            <MapView.Circle
                    key = { (this.state.marker.latitude + this.state.marker.longitude).toString() }
                    center = { this.state.marker }
                    radius = { 1000 }
                    strokeWidth = { 1 }
                    strokeColor = { '#1a66ff' }
                    fillColor = { 'rgba(230,238,255,0.5)' }
            />
          }

      {!this.state.isLoading &&
       this.state.food.map(val => {
          return (
            <View>
            <MapView.Marker
                  coordinate={{latitude: val.coordinates.latitude, longitude: val.coordinates.longitude}}
                  pinColor={'aqua'}
              >
              </MapView.Marker>

            </View>
          )
        })
      }
      </MapView>}
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
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  map: {
    flex: 1
  }
});
