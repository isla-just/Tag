
import React,{useState} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import {color} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import nom from '../../assets/nom.png'
import logo from '../../assets/logo.png'
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../Firebase';

export default function Login({navigation}) {

    const [email, onEmailChange]=useState("");
    const [password, onPasswordChange]=useState("");

    const handleLoginPress = () =>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) =>{
            //when successful
            const user = userCredentials.user;
            Alert.alert(user.uid);

            navigation.replace("Users");
        })
        .catch((error)=>{
            //when failed
            Alert.alert(error.message);
        })
    }
  return (
    <View style={styles.container}>

<Image
    style={{width:40, height:40}}
    source={loginIcon}
/>

      <Text style={styles.heading}>Login</Text>

    <TextInput
    style={styles.input}
    placeholder="Your email"
    value={email}
    onChangeText={onEmailChange}
    />

    <TextInput
    style={styles.input}
    placeholder="Your password"
    value={password}
    onChangeText={onPasswordChange}
    secureTextEntry={true}//set as password
    />

<TouchableOpacity onPress={handleLoginPress}>
    <View style={styles.loginButton}><Text>Login</Text></View></TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        padding:20
      },
      
    heading:{
        fontSize:24,
        color:"#52307c",
        marginTop:20
    },
    input:{
        borderWidth:1,
        marginTop:10,
        borderRadius:30,
        paddingLeft:20,
        borderColor:"#52307c"
    }, 
    loginButton:{
        marginTop:30,
        borderRadius:30,
        backgroundColor:"#52307c",
        padding:20,
        textAlign:"center",
        color:"#fff"
    }
});