import React,{useState} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import logo from '../assets/logo2.png';

//firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { createUserOnRegister } from '../services/Database';

import * as Font from 'expo-font';

Font.loadAsync({
    // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
    // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
    'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
    'semiBold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
  });

export default function SignUp({navigation}) {

    const [username, onUsernameChange]=useState("");
    const [email, onEmailChange]=useState("");
    const [password, onPasswordChange]=useState("");

    //button handleLoginPress
    const handleLoginPress = () =>{

        var names=["Mary Baker", "Amelia Earhart", "Mary Brent","Lucy Stone", "Mary Edwards", "Margaret Chase", "Mahalia Jackson", "Maya Angelou", "Margaret Bourke", "Eunice Kennedy", "Carrie Chapman", "Elizabeth Peratrovich", "Alicia Dickerson", "Daisy Gatson", "Emma Willard", "Amelia Boynton", "Maria Mitchell", "Sojourner Truth", "Willa Cather", "Coretta Scott", "Harriet Tubman", "Fabiola Cabeza", "Sacagawea", "Esther Martinez", "Elizabeth Cady", "Bessie Coleman", "Ma Rainey", "Julia Ward", "Irene Morgan", "Babe Didrikson", "Lyda Conley", "Annie Dodge", "Maud Nathan", "Betty Ford", "Rosa Parks", "Susan La", "Gertrude Stein", "Wilma Mankiller", "Grace Hopper", "Jane Addams", "Katharine Graham", "Florence Chadwick", "Zora Neale", "Wilma Rudolph", "Annie Jump", "Mother Frances", "Jovita Idár", "Maggie L", "Henrietta Swan", "Jane Cunningham", "Victoria Woodhull", "Helen Keller", "Patsy Takemoto", "Chien-Shiung", "Dorothea Dix", "Margaret Sanger", "Alice Paul", "Frances Willard", "Sally Ride", "Juliette Gordon", "Queen Lili", "Katharine Lee", "Harriet Beecher", "Felisa Rincon", "Hetty Green", "Belva Lockwood", "Biddy Mason", "Ida B", "Eleanor Roosevelt", "Maria Goeppert", "Phillis Wheatley", "Mary Harris", "Fannie Lou", "Rosalyn Yalow", "Susan B","Clara Barton", "Lady Deborah", "Jane Johnston", "Alice Childress", "Georgia O","Rebecca Crumpler", "Anne Bradstreet", "Elizabeth Blackwell", "Christa McAuliffe", "Edmonia Lewis","Nellie Bly", "Mary Cassatt", "Pauli Murray", "Ellen Swallow", "Hedy Lamarr","Pearl Kendrick", "Abigail Adams", "Margaret Fuller", "Emma Lazarus", "Marian Anderson","Virginia Apgar", "Mary Walton"];
    
        var randomname= Math.floor(Math.random() * (names.length - 1 + 1)) + 1;
    
    // API
    var apipfp = names[randomname];
    

        // setLoading(true);
        // Alert.alert(email+"with password" + password+"logged in" + username)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) =>{
                //when successful
                const user = userCredentials.user;
                createUserOnRegister(user, username, apipfp)

                //to do: add user to DB
                
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
            <Text style={styles.header}>Become a player</Text>

            <TextInput
             style={styles.input}
             value={username}
             onChangeText={onUsernameChange}
             placeholder='Username'
             placeholderTextColor='#000'
            />

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
               <View style={styles.loginButton}><Text style={styles.loginTxt}>Let's play!</Text></View>
        </TouchableOpacity>
     

        <TouchableOpacity onPress={()=> navigation.replace("Login")}>
             <View style={styles.signup}><Text style={styles.signupTxt}>Login</Text></View>
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
        marginTop: 0,
      },bigCircle:{
          backgroundColor:"#FFFBEB",
          width:1000,
          height:1000,
          borderRadius:500,
          marginTop:-280,
          marginLeft:-600
      },smolCircle:{
        backgroundColor:"#FB5E1B",
        width:400,
        height:400,
        borderRadius:500,
        marginTop:-110,
        marginLeft:150
    },
    header:{
        color:'#000000',
        fontFamily:'semiBold',
        fontSize:30,
        marginTop:80,
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
        marginTop:30     
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
        marginLeft:0,
        marginTop:90,
        padding:15
    },signupTxt:{
        color:'#fff',
        fontSize:18,
        fontFamily:'semiBold',
        textAlign:'center',
        marginTop:50,
    }
});