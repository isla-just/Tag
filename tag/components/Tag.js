import React,{useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity,  PermissionsAndroid } from 'react-native';
import logo from '../assets/logo.png';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion } from "react-native-maps";
import { Marker } from 'react-native-maps';  


import * as Font from 'expo-font';

Font.loadAsync({
  // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
  // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
  'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
  'semibold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
});
  
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 18.7934829;
const LONGITUDE = 98.9867401;

class Tag extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     latitude: LATITUDE,
     longitude: LONGITUDE,
     error: null
    };
   }

   getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
   });

//this is where I got stuck
//tutorials - https://instamobile.io/react-native-tutorials/uber-react-native-geolocation/
//https://github.com/krissnawat/react-native-geolocation/blob/master/App.js
//https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md
//https://www.javatpoint.com/react-native-google-maps

  //  componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(
  //    position => {
  //      console.log(position);
  //      this.setState({
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //      error: null
  //     });
  //   },
  //   error => this.setState({ error: error.message }),
  //    { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
  //    );
  //  }

  render() {
    return(
//     <View style={styles.container}>
//    <MapView
//       provider={PROVIDER_GOOGLE}
//       style={{ ...StyleSheet.absoluteFillObject }}
//       showsUserLocation={true}  
//       zoomEnabled={true}  
//       zoomControlEnabled={true}  
//       initialRegion={this.getMapRegion()}
//       followUserLocation={true}
//       showsMyLocationButton={true}
//       paddingAdjustmentBehavior={"automatic"}
//       loadingEnabled={true}
//       // loadingIndicatorColor="#ffffff"
//       // loadingBackgroundColor="#FB5E1B"
//       tintColor={"#FFA6BA"}

//       //fix initial region functionality
//     />
// </View>

    <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.header}>Tag you’re it!</Text>
          <Text style={styles.sub}>Find someone closeby to pass the tag to</Text>

          <View style={styles.mapCorners}>
          <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.mapContainer}
      showsUserLocation={true}  
      zoomEnabled={true}  
      zoomControlEnabled={true}  
      initialRegion={this.getMapRegion()}
      followUserLocation={true}
      showsMyLocationButton={true}
      paddingAdjustmentBehavior={"automatic"}
      loadingEnabled={true}
      // loadingIndicatorColor="#ffffff"
      // loadingBackgroundColor="#FB5E1B"
      tintColor={"#FFA6BA"}

      //fix initial region functionality
    />
          </View>

          <TouchableOpacity style={styles.btn}><Text style={styles.btnTxt}>Tag selected person</Text></TouchableOpacity>
    </View>
    )
    };

  
}
export default Tag;

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: '#FB5E1B',
    width:'100%',
  },
  logo: {
    width: 90,
    height: 41,
    marginTop: 60,
    marginLeft:40
  },
  sub:{
      color:'#fff',
      fontFamily:'medium',
      fontSize:15,
      marginTop:20,
      textAlign:'center',
      marginHorizontal:50
  },
  header:{
      color:'#fff',
      fontFamily:'semibold',
      fontSize:40,
      marginTop:70,
      marginHorizontal:0,
      textAlign:'center'
 },mapCorners:{
  borderTopRightRadius:50,
  borderTopLeftRadius:50,
  overflow:'hidden'
 },mapContainer:{
     width:'100%',
     height:520,
     backgroundColor: '#FFFBEB',
marginTop:50,
borderRadius:50,
borderWidth:4,
borderColor:'#FB5E1B',
 },btn:{
    width:'90%',
    padding:20,
    backgroundColor:'#FFA6BA',
    borderRadius:100,
    position:'absolute',
    bottom:40,
    left:'5%'
},btnTxt:{
    color:'#FFFBEB',
    fontFamily:'semibold',
    textAlign:'center',
    fontSize:18
}
});
