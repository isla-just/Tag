const functions = require("firebase-functions");
const firebase = require("firebase-admin");
firebase.initializeApp()
var firestore = firebase.firestore()
    
//what needs to happen on the first of the month:
//1. previous comptition needs to be marked as inactive - done by finding where active and updating it
//2. then you need to mark the next competition as active - done by checking if its start date matches the current date
//3. then you need to create the following competition by adding a month to the startdate
//4. lastly, send out a push notification 

//this works
exports.timer = functions.pubsub
.schedule("0 0 1 * *")
.onRun(async (context) => {

    //first step - works
    const comp = firestore.collection("competitions")
    const status = await comp.where("status", "==", "active").get()
    status.forEach(snapshot => {
        snapshot.ref.update({ "status": "inactive" })
    })

    //second step 
    var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date("2022-06-13T22:00:00.000Z"));
    // var current = new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString();
    const setActive = await comp.where("startDate", "==", myTimestamp).get()
    setActive.forEach(snapshot => {
        snapshot.ref.update({ "status": "active" })
        console.log("updated");
    })

    //third step
    //getting the first day of the next month
    const thisDate = new Date();
    var startTimestamp = firebase.firestore.Timestamp.fromDate(new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, 1));
    var endTimestamp = firebase.firestore.Timestamp.fromDate(new Date(thisDate.getFullYear(), thisDate.getMonth() + 2, 1));

console.log(startTimestamp);
console.log(endTimestamp);

    return console.log(myTimestamp);
})
