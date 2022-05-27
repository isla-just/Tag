import React,{useState} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity, TextInput, Alert,KeyboardAvoidingView, Keyboard } from 'react-native';
import logo from '../assets/logo2.png';

import * as Font from 'expo-font';

Font.loadAsync({
    // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
    // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
    'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
    'semiBold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
  });

export default function Powerup() {
  return (


        <View style={styles.content}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.header}>Win a powerup</Text>
            <Text style={styles.sub}>Pop a bubble to win a powerup</Text>
        </View>
     
  );
}

const styles = StyleSheet.create({
 
content:{
        width:'100%',
        padding:40,
        flex:1,
        backgroundColor: '#FFFBEB'
      },
      logo: {
        width: 90,
        height: 41,
        marginTop: 20,
      },
    header:{
        color:'#000000',
        fontFamily:'semiBold',
        fontSize:30,
        marginTop:70,
        width:'80%',
        marginLeft:40
    },
    sub:{
        color:'#000',
        fontFamily:'medium',
        fontSize:15,
        marginTop:20,
        marginHorizontal:40
    },
});