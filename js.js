$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDX5YjFGYbc72YFXwfoPXeYapS2DMUl2C4",
    authDomain: "noob-train.firebaseapp.com",
    databaseURL: "https://noob-train.firebaseio.com",
    storageBucket: "noob-train.appspot.com",
    messagingSenderId: "590421118807"
  };
  firebase.initializeApp(config);


var database=firebase.database();

// intial variables
// var trainName = "",
//     destination = "",
//     frequency= 0,
//     nextArrival = 0,
//     minutesAway = 0;

//when click submit button it will add train to the dom.
$("#submitButton").on("click", function(event){
    //stops default actions on a form from happening. Such as prevent a submit button from submitting form.
event.preventDefault();

//grabs the input from intial what's being submitted
    var trainName = $("#trainNameInputTextBox").val().trim(),
        destination = $("#destinationInputTextBox").val().trim(),
        firstTrain = $("#firstTrainTimeInputTextBox").val().trim(),
        frequency= $("#frequencyInputTextBox").val().trim();
        // nextArrival = $("#nextArrivalInputTextBox").val().trim(),
        // minutesAway = $("#minutesAwayInputTextBox").val().trim();

        //creating a temp object to hold train data
        newTrain ={
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            // nextArrival: nextArrival,
            // minutesAway: minutesAway
        };

        //pushing the data that's store in the temp to the firebase database
        database.ref().push(newTrain);

                //clear all texts in the form
    $("#trainNameInputTextBox").val("");
    $("#destinationInputTextBox").val("");
    $("#frequencyInputTextBox").val("");
    $("#firstTrainTimeInputTextBox").val("");
});

   database.ref().on("child_added", function(childSnapshot) {
       console.log(childSnapshot);

       var trainName = childSnapshot.val().name,
            destination = childSnapshot.val().destination,
            frequency = childSnapshot.val().frequency;


var a = $("tr");

var trainFrequency = childSnapshot.val().frequency; 
console.log(trainFrequency);
a.append(trainFrequency);


var firstTrainTime = childSnapshot.val().firstTrain;
console.log(firstTrainTime);

var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTrainTimeConverted);

var currentTime = moment();
console.log("Current Time: "+moment(currentTime).format("HH:mm"));

var timeDiff = moment().diff(moment(firstTrainTimeConverted), "minutes");
console.log("Difference in Time: "+timeDiff);


var timeRemainder = timeDiff % trainFrequency;
console.log(timeRemainder);

var minutesTillTrain = trainFrequency - timeRemainder;
console.log("Minutes till train: "+ minutesTillTrain);

var nextTrain = moment().add(minutesTillTrain, "minutes");
console.log("Arrival time: "+moment(nextTrain).format("HH:mm"));
// var nextArrivalCal = moment.unix(firstTrain).format("HH:mm");



              //adding train info to the dom
    //   $("#currentTrain > tbody").append("<tr><td>"+trainName+"<tr><td>"+destination+"<tr><td>"+frequency+"<tr><td>"+minutesTillTrain+"<tr><td>"+timeRemainder+"<tr><td>");





});







































});