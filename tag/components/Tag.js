import React,{useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import logo from '../assets/logo.png';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import avatar from '../assets/avatar.png';
import { GeoPoint} from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from "../Firebase";
import { doc, setDoc } from "firebase/firestore";

const geofire = require('geofire-common');


import leaderboard1 from '../assets/leaderboard1.png';
import leaderboard2 from '../assets/leaderboard2.png';
import leaderboard3 from '../assets/leaderboard3.png';
import { getAllLocations } from '../services/Database';

import * as Font from 'expo-font';
import { auth } from '../Firebase';

Font.loadAsync({
  // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
  // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
  'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
  'semibold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
});

const mapStyle = [ {
  "featureType": "administrative",
  "elementType": "labels.text.fill",
  "stylers": [
      {
          "color": "#6C97FB"
      }
  ]
},
{
  "featureType": "landscape",
  "elementType": "all",
  "stylers": [
      {
          "color": "#FFFBEB"
      }
  ]
},
{
  "featureType": "landscape",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "color": "#ffffff"
      }
  ]
},
{
  "featureType": "poi",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "poi.park",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "color": "#e6f3d6"
      },
      {
          "visibility": "on"
      }
  ]
},
{
  "featureType": "road",
  "elementType": "all",
  "stylers": [
      {
          "saturation": -100
      },
      {
          "lightness": 45
      },
      {
          "visibility": "simplified"
      }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "simplified"
      }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "color": "#FC915F"
      },
      {
          "visibility": "simplified"
      }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "labels.text",
  "stylers": [
      {
          "color": "#4e4e4e"
      }
  ]
},
{
  "featureType": "road.arterial",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "color": "#f4f4f4"
      }
  ]
},
{
  "featureType": "road.arterial",
  "elementType": "labels.text.fill",
  "stylers": [
      {
          "color": "#787878"
      }
  ]
},
{
  "featureType": "road.arterial",
  "elementType": "labels.icon",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "transit",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "water",
  "elementType": "all",
  "stylers": [
      {
          "color": "#6C97FB"
      },
      {
          "visibility": "on"
      }
  ]
},
{
  "featureType": "water",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "color": "#ADC1EF"
      }
  ]
}]; //map styles go here!

const Tag = ({navigation})=> {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [loading, setLoading]=useState(true);

  const [everyone, setEveryone]=useState({});

  const tokyoRegion = {
    latitude: -26.028729549982025,
    longitude: 28.099804136853543,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };


  useEffect(() => {

    //     getAllLocations();

    // const fetchAllLocations = async()=>{
    //   const data = await getAllLocations();
    //   console.log(data);
    //   setEveryone(data);
    // }

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      //only updates the value if you move 2 metres
      let location = await Location.getCurrentPositionAsync({distanceInterval:2});
      setLocation(location);

      setDetails();
    })();

  }, []);

  const [myLocation, setMyLocation] = useState({});
  const [text, setText] = useState('Waiting..');
  const [text2, setText2] = useState('Waiting..');
  // const [x, setX] = useState('');
  // const [y, setY] = useState('');



  const setDetails= async ()=>{
    if (errorMsg) {
      setText(errorMsg);
      setText2(errorMsg);
    } else if (location) {

       setMyLocation( {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }) 
  
      setLoading(false);
  
      setText(location.coords.latitude);
      setText2(location.coords.longitude);

      const lat = location.coords.latitude;
      const lng = location.coords.longitude;
      const hash = geofire.geohashForLocation([lat, lng]);

      // Add a new document in collection "cities"
      await setDoc(doc(db, "users", auth.currentUser.uid,), {
        location: { 
            geohash: hash,
            lat: lat,
            lng: lng},
      }, {merge:true});

        }
      }

  return (
    <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.header}>Tag you’re it!</Text>
          <Text style={styles.sub}>Find someone closeby to pass the tag to</Text>

          {/* <Text style={styles.paragraph}>{text}</Text>
          <Text style={styles.paragraph}>{auth.currentUser.uid}</Text> */}

          { loading ?  
    (
     <ActivityIndicator color='#FFFBEB'/> //will render while loading
    ) : (
    
          <MapView
         style={styles.mapContainer}
         provider={PROVIDER_GOOGLE}
         showsUserLocation={false}  
         followUserLocation={true}
        //  zoomEnabled={true}  
        //  zoomControlEnabled={true}  
         region={myLocation}
         customMapStyle={mapStyle}

      >
{/* 
        //i would have a map to loop through all the current active locations */}
          <Marker coordinate={myLocation} 
           image={avatar}
          />
  
              <Marker coordinate={tokyoRegion}  image={leaderboard1} style={styles.marker}/>
      </MapView>

) }


          <TouchableOpacity onPress={()=> navigation.navigate("Home")}style={styles.btn}><Text style={styles.btnTxt}>Tag selected person</Text></TouchableOpacity>
    </View>
  );
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
      marginHorizontal:50,
      marginBottom:20
  },
  header:{
      color:'#fff',
      fontFamily:'semibold',
      fontSize:40,
      marginTop:70,
      marginHorizontal:0,
      textAlign:'center'
 },mapContainer:{
     width:'100%',
     height:520,
     backgroundColor: '#FFFBEB',
marginTop:50,
borderRadius:50,
overflow:'hidden',
// borderWidth:4,
// borderColor:'#FB5E1B'
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
}, marker:{
  borderWidth:2,
  borderColor:"#FB5E1B",
}
});