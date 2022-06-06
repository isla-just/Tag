import React,{useState} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity, TextInput, Alert,KeyboardAvoidingView, Keyboard } from 'react-native';
import logo from '../assets/logo2.png';
import { addParticipant } from '../services/Database';
import { auth } from '../Firebase';

import * as Font from 'expo-font';

Font.loadAsync({
    // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
    // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
    'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
    'semiBold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
  });

export default function Join({route, navigation}) {

    const userData=route.params;
    const avatar=userData.avatar;
    const points=userData.points;
    const username=userData.username;
    const id=userData.uid;

    console.log(userData);
    
    const AddParticipant = async ()=>{
        addParticipant({avatar, points, username},id)
    
        navigation.navigate("Waiting");
    }

  return (


        <View style={styles.content}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.header}>Join the next huge tag game!</Text>
            {/* <Text>{userData.uid}</Text> */}

            {/* // orange circle */}
        <View style={styles.orange}>
            <Text style={styles.orange1}>255</Text>
            <Text style={styles.orange2}>people playing</Text>
        </View>

                    {/* // pink circle */}
        <View style={styles.pink}>
            <Text style={styles.pink1}>from:</Text>
            <Text style={styles.pink2}>12 June 2022</Text>

            <Text style={styles.pink3}>to:</Text>
            <Text style={styles.pink4}>12 July 2022</Text>
        </View>


            {/* // yellow circle */}
        <TouchableOpacity style={styles.yellow} onPress={AddParticipant}>
            <Text style={styles.yellow1}>Join game</Text>
        </TouchableOpacity>

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
    orange:{
        backgroundColor:"#FB5E1B",
        width:170,
        height:170,
        borderRadius:170,
        marginLeft:140,
        marginTop:10,
        alignItems: 'center',
        justifyContent:'center'
    }, orange1:{
        fontSize:35,
        width:'100%',
        color:'#FFFBEB',
        fontFamily:'semibold',
 
        textAlign:'center',

    }, orange2:{
        fontSize:17,
        width:'60%',
        color:'#FFFBEB',
        fontFamily:'medium',
        textAlign:'center'
    },    pink:{
        backgroundColor:"#FFA6BA",
        width:200,
        height:200,
        borderRadius:220,
        marginLeft:-50,
        marginTop:-70,
        alignItems: 'center',
        justifyContent:'center'
    }, pink2:{
        fontSize:17,
        width:'100%',
        color:'#FFFBEB',
        fontFamily:'semibold',
 
        textAlign:'center',

    }, pink1:{
        fontSize:15,
        width:'60%',
        color:'#FFFBEB',
        fontFamily:'medium',
        textAlign:'center'
    }, pink4:{
        fontSize:17,
        width:'100%',
        color:'#FFFBEB',
        fontFamily:'semibold',
 
        textAlign:'center',

    }, pink3:{
        fontSize:15,
        width:'60%',
        color:'#FFFBEB',
        fontFamily:'medium',
        textAlign:'center',
        marginTop:10
    }, 
    yellow:{
        backgroundColor:"#FECE34",
        width:400,
        height:400,
        borderRadius:400,
        marginLeft:70,
        marginTop:-60,
        alignItems: 'center',
        justifyContent:'center'
    }, yellow1:{
        fontSize:20,
        width: 200,
        color:'#FFFBEB',
        fontFamily:'semibold',
        marginLeft:0,
        marginTop:-30,
        textDecorationLine:"underline"

    },
});