var socket = io();
var name;
var playerOneColor;
var playerTwoColor;



$("#join-btn").on("click", function () {
  $(".bg-modal").css("display", "flex");
});

$(".close").on("click", function () {
  $(".bg-modal").css("display", "none");
});

$("#start-btn").on("click", function () {
  // var gameScript = document.createElement('script');
  // gameScript.setAttribute('src', 'js/game.js');
  // document.body.appendChild(gameScript);
  $("#create-game").attr("class", "hidden");
  //Tell server to start the game
  socket.emit("startGame");
})



$(".color-btn").on("click", function () {
  console.log($(this).attr("id"));

  switch ($(this).attr("id")) {
    case "p1-red":
      $("#player-one-img").attr("src", "/images/redBlob.jpg")
      playerOneColor = "red";
      break;
    case "p2-red":
      $("#player-two-img").attr("src", "/images/redBlob.jpg")
      playerTwoColor = "red";
      break;
    case "p1-blue":
      $("#player-one-img").attr("src", "/images/blueBlob.jpg")
      playerOneColor = "blue";
      break;
    case "p2-blue":
      $("#player-two-img").attr("src", "/images/blueBlob.jpg")
      playerTwoColor = "blue";
      break;
    case "p1-green":
      $("#player-one-img").attr("src", "/images/greenBlob.jpg")
      playerOneColor = "green";
      break;
    case "p2-green":
      $("#player-two-img").attr("src", "/images/greenBlob.jpg")
      playerTwoColor = "green";
      break;
    case "p1-yellow":
      $("#player-one-img").attr("src", "/images/yellowBlob.jpg")
      playerOneColor = "yellow";
      break;
    case "p2-yellow":
      $("#player-two-img").attr("src", "/images/yellowBlob.jpg")
      playerTwoColor = "yellow";
      break;
  }
})






// on click to trigger socket.io(add_player)
$("#send").on("click", function () {

  var allNames = [];
  name = $("#name").val();
  $.get("/api/players", function (data) {
    for (var i = 0; i < data.length; i++) {
      allNames.push(data[i].name);
    }
    if (allNames.includes(name)) {
      $(".bg-modal").css("display", "none");
      name = $("#name").val();
      socket.emit("add_player", {
        name: $("#name").val(),
        color: "#000000"
      })
    }
    else {
      $(".bg-modal").css("display", "none");
      name = $("#name").val();
      socket.emit("add_player", {
        name: $("#name").val(),
        color: "#000000"
      })


      var player = {
        name: name,
        wins: 0,
        losses: 0
      }

      $.ajax("/api/players", {
        type: "POST",
        data: player
      }).then(
        function () {
          console.log("new player added");
        }
      )
    }
  })
});

// socket.on("receive_player", addMessages);

// function addMessages(data) {
//   console.log("Add Messages Data", data);

//   // console.log("Socket.id: ", socket.id);
// }

// Captures keypress to send to server and all players
$(document).on("keyup", function (data) {
  // console.log(data.key);
  socket.emit("keyPress", {
    keyPressed: data.key,
    name: name,
    playerOneColor: playerOneColor,
    playerTwoColor: playerTwoColor
  })
})

// ***********************
// BAD VOICE CONTROL
// ***********************
// if (annyang) {
//   // Let's define our first command. First the text we expect, and then the function it should call
//   var commands = {
//     'Left': function () {
//       console.log("Left!");
//       socket.emit("keyPress", {
//         keyPressed: "ArrowLeft",
//         name: name
//       })
//     },
//     'Right': () => {
//       console.log("Right!")
//       socket.emit("keyPress", {
//         keyPressed: "ArrowRight",
//         name: name
//       })
//     },
//     'Up': () => {
//       console.log("Up!")
//       socket.emit("keyPress", {
//         keyPressed: "ArrowUp",
//         name: name
//       })
//     },
//     'Down': () => {
//       console.log("Down!")
//       socket.emit("keyPress", {
//         keyPressed: "ArrowDown",
//         name: name
//       })
//     },
//   };

//   // Add our commands to annyang
//   annyang.addCommands(commands);

//   // Start listening. You can call this here, or attach this call to an event, button, etc.
//   annyang.start();
// }

// ******************
// GOOD VOICE CONTROL
// ******************

// status fields and start button in UI
// var phraseDiv;
// var startRecognizeOnceAsyncButton;

// subscription key and region for speech services.
var subscriptionKey = "6333ca6a1f24427cbdc818c58bded4a7"
var serviceRegion = "westus";
var authorizationToken;
var SpeechSDK;
var recognizer;
var oldLength = 0;
var newWords;

document.addEventListener("DOMContentLoaded", function () {

  $("#start-btn").on("click", function () {
    var keyWords = ["up", "down", "left", "right"];
    var keyPress = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    // if we got an authorization token, use the token. Otherwise use the provided subscription key
    var speechConfig;
    if (authorizationToken) {
      speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authorizationToken, serviceRegion.value);
    } else {
      if (subscriptionKey === "" || subscriptionKey === "subscription") {
        alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
        return;
      }
      speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    }

    speechConfig.speechRecognitionLanguage = "en-US";
    var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);


    // Listener for final results
    recognizer.recognized = (r, event) => {
      // phrase is done, reset oldLength
      oldLength = 0;     
      console.log("Clearing old length");
    }

    // Listener for partial results
    recognizer.recognizing = (r, event) => {
      // convert result string to array of words
      var result = event.privResult.privText.split(" ");
      console.log("partial result:", result)
      var extracted = [];
     
      // push keywords to extracted array
      for (var i = 0; i < result.length; i++) {
        if (result[i] === "write"){
          result[i] = "right";
        }
        if (keyWords.indexOf(result[i]) !== -1) {
          extracted.push(result[i])
        }
      }
      console.log("extracted:", extracted);

      // console.log("oldLength:", oldLength)
      // console.log("extracted length:", extracted.length);
      // console.log("newWords:", newWords);

      // loop over extracted words, emit on new ones
      for (var i = 0; i < extracted.length; i++) {
        var index = keyWords.indexOf(extracted[i]);
        console.log("Keyword found:", extracted[i]);
        // do emit
        socket.emit("keyPress", {
          keyPressed: keyPress[index],
          name: name
        })
      }

      // store the length of current result 
      // oldLength = extracted.length;
    };
    // Starts speech recognition
    recognizer.startContinuousRecognitionAsync();
  });

  if (!!window.SpeechSDK) {
    SpeechSDK = window.SpeechSDK;
    // startRecognizeOnceAsyncButton.disabled = false;

    // document.getElementById('content').style.display = 'block';
    // document.getElementById('warning').style.display = 'none';

    // in case we have a function for getting an authorization token, call it.
    if (typeof RequestAuthorizationToken === "function") {
      RequestAuthorizationToken();
    }
  }
});
