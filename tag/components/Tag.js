import React,{useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import logo from '../assets/logo.png';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import avatar from '../assets/avatar.png';

import leaderboard1 from '../assets/leaderboard1.png';
import leaderboard2 from '../assets/leaderboard2.png';
import leaderboard3 from '../assets/leaderboard3.png';

import * as Font from 'expo-font';

Font.loadAsync({
  // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
  // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
  'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
  'semibold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
});

const Tag = ({navigation})=> {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [loading, setLoading]=useState(true);

  const tokyoRegion = {
    latitude: -26.028729549982025,
    longitude: 28.099804136853543,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setDetails();
    })();
  }, []);



  //checnge this to useeffet for dynamic location
  const [myLocation, setMyLocation] = useState({});
  const [text, setText] = useState('Waiting..');
  const [text2, setText2] = useState('Waiting..');

  const setDetails=()=>{
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
      // text = JSON.stringify(location);
      // console.log(text);
      // console.log(text2);
    }
  }


  return (
    <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.header}>Tag you’re it!</Text>
          <Text style={styles.sub}>Find someone closeby to pass the tag to</Text>

          <Text style={styles.paragraph}>{text}</Text>
          <Text style={styles.paragraph}>{text2}</Text>

          { loading ?  
    (
     <ActivityIndicator /> //will render while loading
    ) : (
    
          <MapView
         style={styles.mapContainer}
         provider={PROVIDER_GOOGLE}
         showsUserLocation={true}  
         followUserLocation={true}
        //  zoomEnabled={true}  
        //  zoomControlEnabled={true}  
         region={myLocation}
         //need to set initial region to your current region

      >
{/* 
        //i would have a map to loop through all the current active locations */}
          <Marker coordinate={myLocation} 
           image={avatar}
          />
  
              <Marker coordinate={tokyoRegion}  image={leaderboard1}/>
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
      marginHorizontal:50
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
}
});