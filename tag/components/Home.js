import React,{useState} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import express from '../assets/expression.png';

import * as Font from 'expo-font';

Font.loadAsync({
  // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
  // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
  'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
  'semibold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
});

export default function Permissions() {

  return (
    <View style={styles.container}>
        <View style={styles.circleBg}></View>

        <Image source={logo} style={styles.logo} />
        <Text style={styles.header}>Hey hey!</Text>
        <Text style={styles.body}>20 days and 4hrs left in the game</Text>

{/* pink circle */}
        <View style={styles.where}>
            <Text style={styles.where1}>tag is in</Text>
            <Text style={styles.where2}>England</Text>
        </View>

{/* yellow circle */}
        <View style={styles.join}>
            <Text style={styles.join1}>join</Text>
            <Text style={styles.join2}>next game</Text>
        </View>

{/* orange shape */}
        <View style={styles.block}>
            <Text style={styles.block1}>tag blocker</Text>
            <Text style={styles.block2}>12:10:45</Text>
        </View>

        <Image source={express} style={styles.express} />


    </View>
  );
}

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: '#FFFBEB',
    width:'100%',
    padding:40
  },circleBg:{
      backgroundColor:"#FB5E1B",
      width:683,
      height:683,
      borderRadius:683,
      marginTop:-290,
      marginLeft:-280,
      position:'absolute'
  },
  logo: {
    width: 90,
    height: 41,
    marginTop: 20,
  },      header:{
    color:'#FFFBEB',
    fontFamily:'semibold',
    fontSize:35,
    marginTop:50,
    marginHorizontal:20
},body:{
    fontSize:20,
    color:'#FFFBEB',
    fontFamily:'medium',
    marginTop:10,
    marginHorizontal:20
},where:{
    backgroundColor:"#FFA6BA",
    width:170,
    height:170,
    borderRadius:170,
    marginLeft:140,
    marginTop:10,
    alignItems: 'center',
    justifyContent:'center'
},where1:{
    fontSize:17,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'medium',
    marginHorizontal:10,
textAlign:'center'
},where2:{
    fontSize:20,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'semibold',
    marginHorizontal:10,
    textAlign:'center',
    marginTop:7
},join:{
    backgroundColor:"#FECE34",
    width:145,
    height:145,
    borderRadius:145,
    marginLeft:10,
    marginTop:-30,
    alignItems: 'center',
    justifyContent:'center',
    padding:20
},join1:{
    fontSize:17,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'medium',
    marginHorizontal:10,
textAlign:'center'
},join2:{
    fontSize:20,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'semibold',
    marginHorizontal:10,
    textAlign:'center',
    marginTop:3
},block:{
    backgroundColor:"#FB5E1B",
    width:250,
    height:120,
    borderRadius:70,
    marginLeft:170,
    marginTop:-95,
    alignItems: 'center',
    justifyContent:'center',
    padding:40
},block1:{
    fontSize:17,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'medium',
    marginHorizontal:10,
textAlign:'left'
},block2:{
    fontSize:20,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'semibold',
    marginHorizontal:10,
    textAlign:'left',
    marginTop:3
},  express: {
    width: 33,
    height: 30,
    marginTop: 540,
    marginLeft:180,
    position:'absolute'
  },
});