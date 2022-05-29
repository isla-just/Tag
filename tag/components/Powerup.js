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

export default function Powerup({navigation}) {
  return (


        <View style={styles.content}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.header}>Win a powerup</Text>
            <Text style={styles.sub}>Pop a bubble to win a powerup</Text>

{/* bubble1 */}
            <TouchableOpacity style={styles.bubble1}></TouchableOpacity>

            {/* bubble2 */}
            <TouchableOpacity style={styles.bubble2}></TouchableOpacity>

            {/* bubble3 */}
            <TouchableOpacity style={styles.bubble3} onPress={()=> navigation.replace("PowerupDetail")}></TouchableOpacity>

            {/* bubble4 */}
            <TouchableOpacity style={styles.bubble4}></TouchableOpacity>

            {/* bubble5 */}
            <TouchableOpacity style={styles.bubble5}></TouchableOpacity>

            {/* bubble6 */}
            <TouchableOpacity style={styles.bubble6}></TouchableOpacity>
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
        marginTop:50,
        width:'80%',
        marginLeft:30
    },
    sub:{
        color:'#000',
        fontFamily:'medium',
        fontSize:15,
        marginTop:20,
        marginHorizontal:30
    },

    bubble1:{
      backgroundColor: '#FFA6BA',
      width:95,
      height:95,
      borderRadius:95,
      marginLeft:220,
      marginTop:-10
    },    bubble2:{
      backgroundColor: '#FECE34',
      width:129,
      height:129,
      borderRadius:129,
      marginLeft:50,
      marginTop:-40
    },    bubble3:{
      backgroundColor: '#FB5E1B',
      width:182,
      height:182,
      borderRadius:182,
      marginLeft:180,
      marginTop:-70
    },    bubble4:{
      backgroundColor: '#FFA6BA',
      width:200,
      height:200,
      borderRadius:200,
      marginLeft:-20,
      marginTop:-90
    },    bubble5:{
      backgroundColor: '#FECE34',
      width:400,
      height:400,
      borderRadius:400,
      marginLeft:125,
      marginTop:-90
    },    bubble6:{
      backgroundColor: '#FB5E1B',
      width:213,
      height:213,
      borderRadius:213,
      marginLeft:-115,
      marginTop:-305
    }
});