
import React,{useState} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import {color} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import nom from '../assets/nom.png'
import logo from '../assets/logo.png';
import { AppLoading } from "expo-app-loading";
import {
    useFonts,
    MontserratAlternates_400Regular,
  } from "@expo-google-fonts/dev";


export default function Welcome() {

    let [fontsLoaded] = useFonts({
        MontserratAlternates_400Regular
    
      });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
        <View style={styles.container}>

        <Image source={logo} style={styles.logo} />
    
             <Text style={styles.header}>let's play</Text>
             <Text style={styles.header2}>some tag</Text>
         </View>
    );
  }
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
          fontFamily:'MontserratAlternates',
          fontSize:50,
      }
    
});