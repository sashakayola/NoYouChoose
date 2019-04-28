import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Alert, Dimensions, Animated, Image } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {YELP_APP_SECRET} from 'react-native-dotenv'

const config = {
  headers: {
    Authorization: 'Bearer fmAW0diM5L5-44HUuua0b-fpqdCl7nb24nwic9nO54zMM4FE-kb3inLE2ToZ9HENk1LEbXEvghTqIijaQ4Mch8sA6NfRbBBMRr_Skmhs9P_KGjmN9DTOETqNTyDDXHYx'
  }
}

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4.7;
const CARD_WIDTH = CARD_HEIGHT + 35;

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      locationResult: null,
      location: {coords: { latitude: 40.6980, longitude: -73.9963}},
      marker: '',
      isLoading: true,
      food: null,
      canAdjustFood: true
    }
    this.getFoodData = this.getFoodData.bind(this)
    this.confirmRadius = this.confirmRadius.bind(this)
  }

  componentDidMount() {
    this._getLocationAsync();
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  getFoodData() {
    if (this.state.canAdjustFood) {
      return fetch(`https://api.yelp.com/v3/businesses/search?term=food&latitude=${this.state.marker.latitude}&longitude=${this.state.marker.longitude}&radius=800&limit=5`, config)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          food: responseJson.businesses
        })
      })
    }
  }

  confirmRadius() {
    Alert.alert('Confirmed! Now wait for your friend to choose a place!')
    this.setState({
      canAdjustFood: false
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
    await this.setState({
      marker: coordinates
    })
    this.getFoodData()
  }

  render() {
    return (
      <View style={{flex: 1}}>
      {!this.state.isLoading && this.state.canAdjustFood &&
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            if (this.state.canAdjustFood) {
              this.confirmRadius()
            }
          }}
          underlayColor='pink'>
          <Text style={styles.buttonText}>Click to confirm food radius!</Text>
        </TouchableOpacity>
      }

        { <MapView
        ref={ref => { this.map = ref; }}
        style={styles.map}
        region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        showsUserLocation={true}
        onPress={(e) => {
          if (this.state.canAdjustFood) {
            this.addMarker(e.nativeEvent.coordinate)
          }
        }}
        >

      {this.state.marker !== '' &&
        <MapView.Marker
            coordinate={{latitude: this.state.marker.latitude,
            longitude: this.state.marker.longitude}}
         >
         <Icon name="silverware-fork-knife" size={40} color={"#c71585"} />
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
        const nameOfMarker = `${val.name} (${val.rating}/5)`;
        const addressOfMarker = `${val.location.address1}, ${val.location.city}`;
          return (
            <View key={val.name}>
            <MapView.Marker
                  coordinate={{latitude: val.coordinates.latitude, longitude: val.coordinates.longitude}}
                  title={nameOfMarker}
                  description={addressOfMarker}
                  pinColor={'#00ced1'}
              >
            </MapView.Marker>
            </View>
          )
        })
      }

          </MapView>}

        {!this.state.isLoading &&
          <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.food.map((marker, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.textContent}>
              <TouchableOpacity
                style={{
                  zIndex: 1,
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  backgroundColor: 'transparent',
                }}
                onPress={() => alert('hi')}
              />


                <Text style={styles.cardtitle}>{marker.name}</Text>
                <Text style={styles.cardDescription}>{marker.location.address1},</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>{marker.location.city}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>{marker.rating} / 5</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>{marker.price}</Text>
              </View>
            </View>
          ))}
          </Animated.ScrollView>
        }

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
  },
  confirmButton:{
    marginRight:10,
    marginLeft:10,
    // marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#20b2aa80',
    borderRadius:12,
    borderWidth: 2,
    borderColor: '#fff'
  },
  buttonText:{
      color:'#fff',
      textAlign:'center',
      fontSize: 20,
      fontWeight: "bold"
      // paddingLeft : 10,
      // paddingRight : 10
  },
  scrollView: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    paddingVertical: 5,
  },
  endPadding: {
    // paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 5,
    elevation: 2,
    backgroundColor: '#db709385',
    marginHorizontal: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
    flexWrap: 'wrap'
  },
  cardtitle: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
    color: "white"
  },
  cardDescription: {
    fontSize: 14,
    color: "white",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});
