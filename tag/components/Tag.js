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
import { doc, setDoc, collection, query, orderBy, startAt, endAt, getDocs, where } from "firebase/firestore";


import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications


const geofire = require('geofire-common');


import leaderboard1 from '../assets/leaderboard1.png';
import leaderboard2 from '../assets/leaderboard2.png';
import leaderboard3 from '../assets/leaderboard3.png';
import { updateLocation } from '../services/Database';

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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
              //only updates the value if you move 2 metres
      let location2 = await Location.getCurrentPositionAsync({});
      setLocation(location2);

    })();
  }, []);

  let text = 'Waiting';

  //lisening for location changes
  useEffect(() => {

    if (errorMsg) {
      text = errorMsg;
      // console.log(errorMsg);
      
    } else if (location) {
      text = JSON.stringify(location);
      // console.log(location.coords.longitude);
      // setTempLocation(location);

      console.log(location);
      // console.log(tempLocation);
  
      // if(location != tempLocation){
        // setDetails();

        // console.log(location);

        setMyLocation( {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        setDetails();
        getAllUserLocations();
      setLoading(false);

    }

  },[location])

  //   //lisening for changes
  //   useEffect(() => {

  //     getAllUserLocations();

  // },[])

  const [myLocation, setMyLocation] = useState({});

  const setDetails= async ()=>{

    if (errorMsg) {
      text = errorMsg;
      // console.log(errorMsg);
      
    } else if (location) {
        
      const lat = location.coords.latitude;
      const lng = location.coords.longitude;
      const hash = geofire.geohashForLocation([lat, lng]);

      // console.log(lat);
      // console.log(lng);

      // Add a new document in collection "cities"

      //change this to accept realtime data
      await setDoc(doc(db, "users", auth.currentUser.uid,), {
        location: { 
            geohash: hash,
            lat: lat,
            lng: lng},
      }, {merge:true});
        
      }
    }

      const [allUsers, setAllUsers]=useState([]);

      const getAllUserLocations= async ()=>{

        if (errorMsg) {
          text = errorMsg;
          // console.log(errorMsg);
          
        } else if (location) {
       
        // Find cities within 50km of London
const center = [location.coords.latitude, location.coords.longitude];
const radiusInM = 50 * 1000;

// Each item in 'bounds' represents a startAt/endAt pair. We have to issue
const bounds = geofire.geohashQueryBounds(center, radiusInM);
const promises = [];
for (const b of bounds) {

    //TODO: realtime listener afterwards - get all locations except the current uer id
    const q= query (collection(db, 'users'), orderBy('location.geohash'), startAt(b[0]), endAt(b[1]));
    const querySnapshot = await getDocs(q);

  promises.push(querySnapshot);
}

// Collect all the query results together into a single list
Promise.all(promises).then((snapshots) => {
  const matchingDocs = [];

  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      const lat = doc.get('location.lat');
      const lng = doc.get('location.lng');

      // We have to filter out a few false positives due to GeoHash
      // accuracy, but most will match
      const distanceInKm = geofire.distanceBetween([lat, lng], center);
      const distanceInM = distanceInKm * 1000;
      if (distanceInM <= radiusInM) {
        matchingDocs.push(doc.data());
      }
    }
  }
  

  return matchingDocs;
}).then((matchingDocs) => {
// console.log(matchingDocs);
//set the state of list of locations
setAllUsers(matchingDocs);
// console.log(allUsers);
});
      }
    }


  return (
    <View style={styles.container2}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.header}>Tag you’re it!</Text>
          <Text style={styles.sub}>Find someone closeby to pass the tag to</Text>

          {/* <Text style={styles.paragraph}>{text}</Text> */}

          { loading ?  
    (
     <ActivityIndicator color='#FFFBEB'/> //will render while loading
    ) : (
    
          <MapView
         style={styles.mapContainer}
         provider={PROVIDER_GOOGLE}
         showsUserLocation={true}  
         followUserLocation={true}
        //  zoomEnabled={true}  
        //  zoomControlEnabled={true}  
         region={myLocation}
         customMapStyle={mapStyle}

      >
{/* 
        //i would have a map to loop through all the current active locations */}

        {allUsers.map((item, index)=>(

        <Marker key={index} title={item.username} pinColor={'#FB5E1B'} coordinate={{latitude:item.location.lat, longitude:item.location.lng}} onPress={()=> navigation.navigate("Tagged" , item)} 
        />
          
              //  <Marker key={index} coordinate={{
                
              //    latitude:item.location.lng,
              //    longitude:item.location.lat,
                  
              //  }}  image={leaderboard1} style={styles.marker}/>
          ))}

          {/* <Marker coordinate={myLocation} 
           image={avatar}
          /> */}
  
             
      </MapView>

) }


          {/* <TouchableOpacity onPress={()=> navigation.navigate("Home")}style={styles.btn}><Text style={styles.btnTxt}>Tag selected person</Text></TouchableOpacity> */}
    </View>
  );
}

export default Tag;

const styles = StyleSheet.create({
 
  container2: {
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
      marginHorizontal:50,marginBottom:20
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