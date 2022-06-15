
import React,{useState} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import {color} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import nom from '../assets/nom.png'
import logo from '../assets/logo.png';
// import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import * as Font from 'expo-font';

Font.loadAsync({
  // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
  // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
  'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
  // 'bold':require('../assets/fonts/MontserratAlternates-Bold.ttf'),
});

export default function Welcome({navigation}) {

    return (
        <View style={styles.container}>

        <Image source={logo} style={styles.logo} />
    
             <Text style={styles.header}>let's play</Text>
             <Text style={styles.header2}>some tag!</Text>

<TouchableOpacity onPress={()=> navigation.replace("Login")}>
   <Image source={nom} style={styles.nom}></Image>
</TouchableOpacity>


             <Text style={styles.swipe}>tap to get started</Text>
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
      header:{
          color:'#fff',
          fontSize:50,
          marginTop:150
      },
      header2:{
          color:'#fff',
          fontSize:50,
          marginTop:10,
          marginLeft:40
      },nom:{
        width: 500,
        height:700,
        marginLeft:-80,
      },swipe:{
        color:'#fff',
        fontFamily:'medium',
        fontSize:20,
        marginTop:-340,
        width:'100%',
        textAlign:'center'
      }
    
});