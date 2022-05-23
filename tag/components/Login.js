import React,{useState} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import logo from '../assets/logo2.png';

// linking your firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';

import * as Font from 'expo-font';

Font.loadAsync({
    // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
    // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
    'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
    'semiBold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
  });

export default function Login({navigation}) {

    const [email, onEmailChange]=useState("");
    const [password, onPasswordChange]=useState("");

    // when pressing the login button
    const handleLoginPress = () =>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) =>{
            //when successful
            const user = userCredentials.user;
            Alert.alert(user.uid);

            navigation.replace("Permissions");
        })
        .catch((error)=>{
            //when failed
            Alert.alert(error.message);
        })
    }
  return (
    <View style={styles.container}>
        <View> 
            <View style={styles.bigCircle}></View>
            <View style={styles.smolCircle}></View>
        </View>

        <View style={styles.content}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.header}>Welcome back to tag!</Text>

            <TextInput
             style={styles.input}
             value={email}
             onChangeText={onEmailChange}
             placeholder='Email'
             placeholderTextColor='#000'
            />
             <TextInput
             style={styles.input}
             value={password}
             onChangeText={onPasswordChange}
             placeholder='Password'
             placeholderTextColor='#000'
             secureTextEntry={true}
            />
{/* //TODo - make this clickable and navigate - add authentication */}
        <TouchableOpacity onPress={handleLoginPress}>
                <View style={styles.loginButton}><Text style={styles.loginTxt}>Login</Text></View>
        </TouchableOpacity>
    

        <TouchableOpacity onPress={()=> navigation.replace("SignUp")}>
             <View style={styles.signup}><Text style={styles.signupTxt}>I'm New</Text></View>
        </TouchableOpacity>
        </View>
     
     
    </View>
  );
}

const styles = StyleSheet.create({
 
    container: {
        flex: 1,
        backgroundColor: '#FECE34',
        width:'100%',
        padding:40
      },content:{
        width:'100%',
        marginTop:-1000,
      },
      logo: {
        width: 90,
        height: 41,
        marginTop: 20,
      },bigCircle:{
          backgroundColor:"#FFFBEB",
          width:1000,
          height:1000,
          borderRadius:500,
          marginTop:-300,
          marginLeft:-100
      },smolCircle:{
        backgroundColor:"#FB5E1B",
        width:400,
        height:400,
        borderRadius:500,
        marginTop:-110,
        marginLeft:-260
    },
    header:{
        color:'#000000',
        fontFamily:'semiBold',
        fontSize:30,
        marginTop:100,
        width:'80%'
    },
    input:{
        borderBottomWidth:1,
        borderBottomColor:'#000',
        marginTop:30,
        width:'100%',
        padding:10,
        backgroundColor:'#FFFBEB',
        fontSize:15,
    },loginButton:{
        width:'100%',
        padding:20,
        backgroundColor:'#FB5E1B',
        borderRadius:50,   
        marginTop:40     
    },loginTxt:{
        color:'#fff',
        fontFamily:'semiBold',
        textAlign:'center',
        fontSize:18
    },signup:{
        width:150,
        height:150,
        backgroundColor: '#F583B4',
        borderRadius:150,
        marginLeft:150,
        marginTop:120,
        padding:15
    },signupTxt:{
        color:'#fff',
        fontSize:18,
        fontFamily:'semiBold',
        textAlign:'center',
        marginTop:50,
    }
});