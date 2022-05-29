import React,{useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import * as Font from 'expo-font';

Font.loadAsync({
  // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
  // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
  'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
  'semibold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
});

export default function PowerupDetail({navigation}) {

  return (
    <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.sub}>You've won a</Text>
          <Text style={styles.header}>Tag blocker</Text>
          <Text style={styles.sub2}>Nobody can tag you for a certain amount of time</Text>

          <Text style={styles.countdown}>09:59:58</Text>
          <Text style={styles.expire}>Until expired</Text>

          <TouchableOpacity style={styles.btn} onPress={()=> navigation.replace("Home")}>
            <Text style={styles.btntxt}>Back home</Text> 
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
      color:'#FFFBEB',
      fontFamily:'medium',
      fontSize:18,
      marginTop:120,
      marginLeft:20
  },  sub2:{
    color:'#FFFBEB',
    fontFamily:'medium',
    fontSize:18,
    marginTop:10,
    marginLeft:20
},
  header:{
      color:'#FFFBEB',
      fontFamily:'semibold',
      fontSize:30,
      marginTop:10,
      marginHorizontal:20
 },countdown:{
  color:'#FFFBEB',
  fontFamily:'semibold',
  fontSize:60,
  marginTop:50,
  width:'100%',
textAlign:'center'
 },  expire:{
  color:'#FFFBEB',
  fontFamily:'medium',
  fontSize:15,
marginHorizontal:20,
textAlign:'right'
},
 
 btn:{
    width:'80%',
    padding:20,
    backgroundColor:'#FFFBEB',
    borderRadius:60,
    marginTop:190,
    marginHorizontal:'10%',
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
},btntxt:{
  color:'#FB5E1B',
  fontFamily:'semiBold',
  textAlign:'left',
  fontSize:18,
},
});