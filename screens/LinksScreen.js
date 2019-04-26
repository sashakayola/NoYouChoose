import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class App extends Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    marker: ''
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  addMarker(coordinates) {
    // console.warn(coordinates);
    this.setState({
      marker: coordinates
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

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
        style={styles.map}
        region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        showsUserLocation={true}
        onPress={(e) => this.addMarker(e.nativeEvent.coordinate)}
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
            pinColor={'indigo'}
         />
        }

          {this.state.marker !== '' &&
            <MapView.Circle
                    key = { (this.state.marker.latitude + this.state.marker.longitude).toString() }
                    center = { this.state.marker }
                    radius = { 400 }
                    strokeWidth = { 1 }
                    strokeColor = { '#1a66ff' }
                    fillColor = { 'rgba(230,238,255,0.5)' }
            />
          }
          {/* onRegionChange={this._handleMapRegionChange} */}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingTop: Constants.statusBarHeight,
  //   backgroundColor: '#ecf0f1',
  // },
  // paragraph: {
  //   margin: 24,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   color: '#34495e',
  // },
  map: {
    flex: 1
  }
});
