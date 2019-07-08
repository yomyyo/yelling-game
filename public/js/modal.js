var socket = io();
var name;
var playerOneColor;
var playerTwoColor;

//On click to join the game lobby
$("#join-btn").on("click", function () {
  $(".bg-modal").css("display", "flex");
});

//On click to close modal
$(".close").on("click", function () {
  $(".bg-modal").css("display", "none");
});

//On click to start game
$("#start-btn").on("click", function () {
  // var gameScript = document.createElement('script');
  // gameScript.setAttribute('src', 'js/game.js');
  // document.body.appendChild(gameScript);
  $("#create-game").attr("class", "hidden");
  //Tell server to start the game
  socket.emit("startGame");
})

//On click to change blob color
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

//Listener for auido directions
if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'Left': function () {
      console.log("Left!");
      socket.emit("keyPress", {
        keyPressed: "ArrowLeft",
        name: name
      })
    },
    'Right': () => {
      console.log("Right!")
      socket.emit("keyPress", {
        keyPressed: "ArrowRight",
        name: name
      })
    },
    'Up': () => {
      console.log("Up!")
      socket.emit("keyPress", {
        keyPressed: "ArrowUp",
        name: name
      })
    },
    'Down': () => {
      console.log("Down!")
      socket.emit("keyPress", {
        keyPressed: "ArrowDown",
        name: name
      })
    },
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}