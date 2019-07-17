
$(document).ready(function(){
var firebaseConfig = {
    apiKey: "AIzaSyDe-qrl4pYtzKzgEQn37dV6Hgz3snSqies",
    authDomain: "trainschedule-8c231.firebaseapp.com",
    databaseURL: "https://trainschedule-8c231.firebaseio.com",
    projectId: "trainschedule-8c231",
    storageBucket: "trainschedule-8c231.appspot.com",
    messagingSenderId: "900548776239",
    appId: "1:900548776239:web:39e21aabbff45c03"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

var timeRN = new Date(); 
$("#currentTime").text("Current Time: " + timeRN);

  var trainName = "";
  var trainDest = "";
  var trainTime = "";
  var trainFreq = 0;

  //button for adding employees
$("#submit").click(function(event){
    event.preventDefault();
  //Grabs user input
   trainName = $("#train-input").val();
   trainDest = $("#destination-input").val();
   trainTime = $("#first-input").val();
   trainFreq = $("#frequency-input").val();

//uploads employee data to database

database.ref().push({
    trainName: trainName,
    trainDest: trainDest,
    trainTime: trainTime,
    trainFreq: trainFreq,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
});
});

//clear the info
$("#clearInfo").on("click", function(event){
  event.preventDefault();
  $("td").empty();
  database.ref().set("/", null)
}),


//creatre firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot){

 //console log employees info
 console.log(childSnapshot.val().trainName);
 console.log(childSnapshot.val().trainDest);
 console.log(childSnapshot.val().trainTime);
 console.log(childSnapshot.val().trainFreq);   

 var userTime = moment(childSnapshot.val().trainTime, "hh:mm");
 //the time that the user feeds into input
 var difference = moment().diff(moment(userTime), "minutes"); 
 // calculating the time now (moment()) b/n the user's time in minutes
 var timeRemaining = difference % childSnapshot.val().trainFreq;
 //calculates how much time is left based on the time & how frequently it comes (in minutes)
 var minsAway = childSnapshot.val().trainFreq - timeRemaining;
 var nextTrain = moment().add(minsAway, "minutes")

 console.log(userTime);
 console.log(difference);
 console.log(timeRemaining);
 console.log(minsAway);
 console.log(nextTrain);



//create new row
var newRow = $("<tr></tr>")
//adding each individual cell(td) to each row(tr)
newRow.append("<td>" + childSnapshot.val().trainName + "</td>")
.append("<td>" + childSnapshot.val().trainDest + "</td>")
.append("<td>" + childSnapshot.val().trainTime + "</td>")
.append("<td>" + childSnapshot.val().trainFreq + "</td>")
.append("<td>" + moment(nextTrain).format("hh:mm") + "</td>")
.append("<td>" + minsAway + "</td>");
$(".table").prepend(newRow);
});
});