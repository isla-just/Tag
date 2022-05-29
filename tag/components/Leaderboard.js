import React,{useState} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity, TextInput, Alert,KeyboardAvoidingView, Keyboard } from 'react-native';
import back from '../assets/back.png';

import * as Font from 'expo-font';

Font.loadAsync({
    // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
    // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
    'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
    'semiBold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
  });

export default function Leaderboard() {
  return (


        <View style={styles.content}>
            <View style={styles.orange}></View>
            <Image source={back} style={styles.back} />
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
      back: {
        width: 20,
        height: 17,
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
    orange:{
        width:550,
        height:550,
        position:'absolute',
        marginTop:-200,
        backgroundColor: '#FB5E1B',
        borderRadius:550,
        marginLeft:-90
    }
});