import React,{useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import arrow from '../assets/arrow.png';

import * as Location from 'expo-location';

import * as Font from 'expo-font';

Font.loadAsync({
  // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
  // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
  'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
  'semibold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
});

export default function Permissions({navigation}) {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location2 = await Location.getCurrentPositionAsync();
      setLocation(location2);
    })();
  }, []);

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  return (
    <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.sub}>So here's the deal...</Text>
          <Text style={styles.header}>We need to use your location so you can play tag with people all over the world</Text>

          <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("Tag")}>
            <Text style={styles.btntxt}>I understand</Text> 
            <Image source={arrow} style={styles.arrow} />
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: '#FB5E1B',
    width:'100%',
    padding:40
  },
  logo: {
    width: 90,
    height: 41,
    marginTop: 20,
  },
  sub:{
      color:'#fff',
      fontFamily:'medium',
      fontSize:20,
      marginTop:120,
      marginLeft:20
  },
  header:{
      color:'#fff',
      fontFamily:'semibold',
      fontSize:30,
      marginTop:30,
      marginHorizontal:20
 },btn:{
    width:'75%',
    padding:20,
    backgroundColor:'#FFFBEB',
    borderTopLeftRadius: 10,
borderTopRightRadius: 60,
borderBottomRightRadius: 60,
borderBottomLeftRadius: 10,
    marginTop:40,
    marginHorizontal:20,
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
},btntxt:{
  color:'#FB5E1B',
  fontFamily:'semiBold',
  textAlign:'left',
  fontSize:18,
},  arrow: {
  width: 17,
  height: 15,
},
});