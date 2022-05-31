//we will be adding our db queries and functions 
import {db} from "../Firebase"; //firestore instance
// import { auth } from '../Firebase';

//firestore functions
import { doc, setDoc, Timestamp, collection, getDocs, addDoc, query, onSnapshot, where } from "firebase/firestore"; 

//creates a document for the user in our users collection
export const createUserOnRegister=(user, username)=>{
    //document reference: doc(firestore init, collection name, optional - id of the document (name/id))
    const userRef = doc(db, "users", user.uid);

    //create data document
    const userData={
        email:user.email,
        username:username,
        location:{ geohash: 1, lat: 1, lng: 1},
        tag:false,
        avatar:"",
        points:0,
        powerup:""
    }
    //set a document setDoc(dumument reference, data we want to set, any additional options like merge)
    return setDoc(userRef, userData); //pass the correect one 
}

//get the current active competition
export const getAllCompetitions= async ()=>{

    //snapshot for our users collection
    const querySnapshot = await getDocs(collection(db, 'competitions'), where("status", "==", "active"));

    var allData={};
    // const date = dateCreated.toDate().toDateString()

    querySnapshot.forEach((doc)=>{
    const compData={
        startDate:(doc.data().startDate).toDate().toDateString(),
        startTime:(doc.data().startDate).toDate().toLocaleTimeString('en-US'),
        endDate:doc.data().endDate,
        prize:doc.data().prize,
    }

    allData=compData;
})

return allData;
}

//setting the geolocation dynamically
// export const updateLocation =(uid, data)=>{
//     const userRef = doc(db, "users", uid);
//     return setDoc(userRef, data, {merge:true}); // overwrite the location value if already set
// }

// //get all the user's locations
// export const getAllLocations= async ()=>{
//     //return a list of users
//     const users=[];
//     //snapshot for our users collection
//     const querySnapshot = await getDocs(collection(db, 'users'));

//     //need to loop through snapshot and get each document's data
// querySnapshot.forEach((doc)=>{
//     let user ={...doc.data(), uid:doc.id}
//     users.push(user.location);
// })
// return users;
// }