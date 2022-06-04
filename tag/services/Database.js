//we will be adding our db queries and functions 
import {db} from "../Firebase"; //firestore instance
// import { auth } from '../Firebase';

//firestore functions
import { doc, setDoc, Timestamp, collection, getDocs, addDoc, query, onSnapshot, where } from "firebase/firestore"; 

//creates a document for the user in our users collection
export const createUserOnRegister=(user, username, apipfp)=>{
    //document reference: doc(firestore init, collection name, optional - id of the document (name/id))
    const userRef = doc(db, "users", user.uid);

    //create data document
    const userData={
        email:user.email,
        username:username,
        location:{ geohash: 1, lat: 1, lng: 1},
        tag:false,
        avatar:apipfp,
        points:0,
        powerup:"",
        uid:user.uid,
        // uid:user.uid
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

// set our profile data - updaye
export const updateTag =(uid, data)=>{
    const userRef = doc(db, "users", uid);
    return setDoc(userRef, data, {merge:true}); // add the option to merge document andnot overwrite 
}

export const settag= (uid, data) =>{
    const userRef = doc(db, 'users', uid);
    return setDoc(userRef, data, {merge:true});//option to merge and not overrite
  
}