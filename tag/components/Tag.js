import React,{useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import * as Font from 'expo-font';

Font.loadAsync({
  // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
  // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
  'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
  'semibold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
});

export default function Tag() {

  return (
    <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.header}>Tag you’re it!</Text>
          <Text style={styles.sub}>Find someone closeby to pass the tag to</Text>


          <MapView
         style={styles.mapContainer}
         provider={PROVIDER_GOOGLE}
         showsUserLocation={true}  
         followUserLocation={true}
         initialRegion={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421}}

         //need to set initial region to your current region

      />


          <TouchableOpacity style={styles.btn}><Text style={styles.btnTxt}>Tag selected person</Text></TouchableOpacity>
    </View>
  );
}

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