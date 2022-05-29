//we will be adding our db queries and functions 
import {db} from "../Firebase"; //firestore instance

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
        dateCreated: Timestamp.fromDate(new Date()),
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